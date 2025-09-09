import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Greenova8 } from "../target/types/greenova8";
import { expect } from "chai";
import {
  createMint,
  createAssociatedTokenAccount,
  mintTo,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

describe("greenova8", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Greenova8 as Program<Greenova8>;
  const wallet = provider.wallet as anchor.Wallet;

  let mint: anchor.web3.PublicKey;
  let projectId = new anchor.BN(1);
  let targetAmount = new anchor.BN(1000000000); // 1 SOL
  let projectName = "Test Solar Project";

  let projectPda: anchor.web3.PublicKey;
  let vaultPda: anchor.web3.PublicKey;
  let investmentPda: anchor.web3.PublicKey;
  let userTokenAccount: anchor.web3.PublicKey;

  before(async () => {
    // Create a test token mint
    mint = await createMint(
      provider.connection,
      wallet.payer,
      wallet.publicKey,
      null,
      9
    );

    // Create user token account
    userTokenAccount = await createAssociatedTokenAccount(
      provider.connection,
      wallet.payer,
      mint,
      wallet.publicKey
    );

    // Mint some tokens to user
    await mintTo(
      provider.connection,
      wallet.payer,
      mint,
      userTokenAccount,
      wallet.payer,
      1000000000000 // 1000 tokens
    );

    // Derive PDAs
    [projectPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("project"), projectId.toArrayLike(Buffer, "le", 8)],
      program.programId
    );

    [vaultPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("vault"), projectId.toArrayLike(Buffer, "le", 8)],
      program.programId
    );

    [investmentPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("investment"),
        projectId.toArrayLike(Buffer, "le", 8),
        wallet.publicKey.toBuffer(),
      ],
      program.programId
    );
  });

  it("Initializes a project", async () => {
    const tx = await program.methods
      .initializeProject(projectId, targetAmount, projectName)
      .accounts({
        project: projectPda,
        projectVault: vaultPda,
        mint: mint,
        authority: wallet.publicKey,
        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
        systemProgram: anchor.web3.SystemProgram.programId,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      })
      .rpc();

    console.log("Initialize project transaction signature:", tx);

    // Verify project was created correctly
    const projectAccount = await program.account.project.fetch(projectPda);
    expect(projectAccount.projectId.toString()).to.equal(projectId.toString());
    expect(projectAccount.targetAmount.toString()).to.equal(targetAmount.toString());
    expect(projectAccount.raisedAmount.toString()).to.equal("0");
    expect(projectAccount.projectName).to.equal(projectName);
    expect(projectAccount.isActive).to.be.true;
    expect(projectAccount.authority.toString()).to.equal(wallet.publicKey.toString());
  });

  it("Makes an investment", async () => {
    const investmentAmount = new anchor.BN(100000000); // 0.1 SOL

    const tx = await program.methods
      .invest(investmentAmount)
      .accounts({
        project: projectPda,
        investment: investmentPda,
        projectVault: vaultPda,
        investorTokenAccount: userTokenAccount,
        investor: wallet.publicKey,
        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
        systemProgram: anchor.web3.SystemProgram.programId,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      })
      .rpc();

    console.log("Investment transaction signature:", tx);

    // Verify investment was recorded
    const investmentAccount = await program.account.investment.fetch(investmentPda);
    expect(investmentAccount.projectId.toString()).to.equal(projectId.toString());
    expect(investmentAccount.investor.toString()).to.equal(wallet.publicKey.toString());
    expect(investmentAccount.amount.toString()).to.equal(investmentAmount.toString());

    // Verify project state was updated
    const projectAccount = await program.account.project.fetch(projectPda);
    expect(projectAccount.raisedAmount.toString()).to.equal(investmentAmount.toString());
    expect(projectAccount.investorCount).to.equal(1);
  });

  it("Fails to invest below minimum amount", async () => {
    const tooSmallAmount = new anchor.BN(50000000); // 0.05 SOL (below minimum)

    try {
      await program.methods
        .invest(tooSmallAmount)
        .accounts({
          project: projectPda,
          investment: investmentPda,
          projectVault: vaultPda,
          investorTokenAccount: userTokenAccount,
          investor: wallet.publicKey,
          tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
          systemProgram: anchor.web3.SystemProgram.programId,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        })
        .rpc();
      
      expect.fail("Should have failed with minimum investment error");
    } catch (err) {
      expect(err.message).to.include("MinimumInvestmentNotMet");
    }
  });

  it("Allows authority to withdraw funds", async () => {
    const withdrawAmount = new anchor.BN(50000000); // 0.05 SOL

    // Create authority token account if it doesn't exist
    const authorityTokenAccount = await getAssociatedTokenAddress(
      mint,
      wallet.publicKey
    );

    const tx = await program.methods
      .withdrawFunds(withdrawAmount)
      .accounts({
        project: projectPda,
        projectVault: vaultPda,
        authorityTokenAccount: authorityTokenAccount,
        authority: wallet.publicKey,
        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
      })
      .rpc();

    console.log("Withdraw funds transaction signature:", tx);
  });
});
