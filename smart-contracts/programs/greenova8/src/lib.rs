use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer, Mint};

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod greenova8 {
    use super::*;

    pub fn initialize_project(
        ctx: Context<InitializeProject>,
        project_id: u64,
        target_amount: u64,
        project_name: String,
    ) -> Result<()> {
        let project = &mut ctx.accounts.project;
        project.project_id = project_id;
        project.target_amount = target_amount;
        project.raised_amount = 0;
        project.project_name = project_name;
        project.is_active = true;
        project.authority = ctx.accounts.authority.key();
        
        emit!(ProjectCreated {
            project_id,
            target_amount,
            authority: ctx.accounts.authority.key(),
        });
        
        Ok(())
    }

    pub fn invest(ctx: Context<Invest>, amount: u64) -> Result<()> {
        let project = &mut ctx.accounts.project;
        let investment = &mut ctx.accounts.investment;
        
        require!(project.is_active, ErrorCode::ProjectNotActive);
        require!(
            project.raised_amount + amount <= project.target_amount,
            ErrorCode::ExceedsTargetAmount
        );
        require!(amount >= 100_000_000, ErrorCode::MinimumInvestmentNotMet); // 0.1 SOL minimum

        // Transfer tokens to project vault
        let cpi_accounts = Transfer {
            from: ctx.accounts.investor_token_account.to_account_info(),
            to: ctx.accounts.project_vault.to_account_info(),
            authority: ctx.accounts.investor.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, amount)?;

        // Update project state
        project.raised_amount += amount;
        project.investor_count += 1;

        // Record investment
        investment.project_id = project.project_id;
        investment.investor = ctx.accounts.investor.key();
        investment.amount = amount;
        investment.timestamp = Clock::get()?.unix_timestamp;

        emit!(InvestmentMade {
            project_id: project.project_id,
            investor: ctx.accounts.investor.key(),
            amount,
            timestamp: investment.timestamp,
        });

        Ok(())
    }

    pub fn withdraw_funds(ctx: Context<WithdrawFunds>, amount: u64) -> Result<()> {
        let project = &ctx.accounts.project;
        
        require!(
            ctx.accounts.authority.key() == project.authority,
            ErrorCode::Unauthorized
        );
        require!(amount <= project.raised_amount, ErrorCode::InsufficientFunds);

        // Transfer funds from project vault to authority
        let seeds = &[
            b"project".as_ref(),
            &project.project_id.to_le_bytes(),
            &[*ctx.bumps.get("project_vault").unwrap()],
        ];
        let signer = &[&seeds[..]];

        let cpi_accounts = Transfer {
            from: ctx.accounts.project_vault.to_account_info(),
            to: ctx.accounts.authority_token_account.to_account_info(),
            authority: ctx.accounts.project_vault.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);
        token::transfer(cpi_ctx, amount)?;

        emit!(FundsWithdrawn {
            project_id: project.project_id,
            authority: ctx.accounts.authority.key(),
            amount,
        });

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(project_id: u64)]
pub struct InitializeProject<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + Project::INIT_SPACE,
        seeds = [b"project", project_id.to_le_bytes().as_ref()],
        bump
    )]
    pub project: Account<'info, Project>,
    
    #[account(
        init,
        payer = authority,
        token::mint = mint,
        token::authority = project_vault,
        seeds = [b"vault", project_id.to_le_bytes().as_ref()],
        bump
    )]
    pub project_vault: Account<'info, TokenAccount>,
    
    pub mint: Account<'info, Mint>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct Invest<'info> {
    #[account(
        mut,
        seeds = [b"project", project.project_id.to_le_bytes().as_ref()],
        bump
    )]
    pub project: Account<'info, Project>,
    
    #[account(
        init,
        payer = investor,
        space = 8 + Investment::INIT_SPACE,
        seeds = [
            b"investment",
            project.project_id.to_le_bytes().as_ref(),
            investor.key().as_ref()
        ],
        bump
    )]
    pub investment: Account<'info, Investment>,
    
    #[account(
        mut,
        seeds = [b"vault", project.project_id.to_le_bytes().as_ref()],
        bump
    )]
    pub project_vault: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub investor_token_account: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub investor: Signer<'info>,
    
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct WithdrawFunds<'info> {
    #[account(
        seeds = [b"project", project.project_id.to_le_bytes().as_ref()],
        bump
    )]
    pub project: Account<'info, Project>,
    
    #[account(
        mut,
        seeds = [b"vault", project.project_id.to_le_bytes().as_ref()],
        bump
    )]
    pub project_vault: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub authority_token_account: Account<'info, TokenAccount>,
    
    pub authority: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

#[account]
#[derive(InitSpace)]
pub struct Project {
    pub project_id: u64,
    pub target_amount: u64,
    pub raised_amount: u64,
    pub investor_count: u32,
    #[max_len(50)]
    pub project_name: String,
    pub is_active: bool,
    pub authority: Pubkey,
}

#[account]
#[derive(InitSpace)]
pub struct Investment {
    pub project_id: u64,
    pub investor: Pubkey,
    pub amount: u64,
    pub timestamp: i64,
}

#[event]
pub struct ProjectCreated {
    pub project_id: u64,
    pub target_amount: u64,
    pub authority: Pubkey,
}

#[event]
pub struct InvestmentMade {
    pub project_id: u64,
    pub investor: Pubkey,
    pub amount: u64,
    pub timestamp: i64,
}

#[event]
pub struct FundsWithdrawn {
    pub project_id: u64,
    pub authority: Pubkey,
    pub amount: u64,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Project is not active")]
    ProjectNotActive,
    #[msg("Investment exceeds target amount")]
    ExceedsTargetAmount,
    #[msg("Minimum investment not met")]
    MinimumInvestmentNotMet,
    #[msg("Unauthorized")]
    Unauthorized,
    #[msg("Insufficient funds")]
    InsufficientFunds,
}
