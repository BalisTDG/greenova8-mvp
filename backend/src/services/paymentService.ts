import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getOrCreateAssociatedTokenAccount, transfer, TOKEN_PROGRAM_ID } from '@solana/spl-token';

interface PaymentConfig {
  solanaRpcUrl: string;
  merchantWallet: string;
  usdcMint: string; // USDC token mint address
}

export class PaymentService {
  private connection: Connection;
  private config: PaymentConfig;

  constructor(config: PaymentConfig) {
    this.connection = new Connection(config.solanaRpcUrl, 'confirmed');
    this.config = config;
  }

  /**
   * Create a payment transaction for SOL
   */
  async createSolPayment(
    fromPubkey: string,
    toPubkey: string,
    amountSol: number
  ): Promise<string> {
    try {
      const fromPublicKey = new PublicKey(fromPubkey);
      const toPublicKey = new PublicKey(toPubkey);
      const lamports = amountSol * LAMPORTS_PER_SOL;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: fromPublicKey,
          toPubkey: toPublicKey,
          lamports,
        })
      );

      const { blockhash } = await this.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = fromPublicKey;

      // Return serialized transaction for client to sign
      return transaction.serialize({ requireAllSignatures: false }).toString('base64');
    } catch (error) {
      console.error('Error creating SOL payment:', error);
      throw new Error('Failed to create SOL payment transaction');
    }
  }

  /**
   * Create a payment transaction for USDC (simplified for MVP)
   */
  async createUsdcPayment(
    fromWallet: string,
    toWallet: string,
    amountUsdc: number
  ): Promise<string> {
    try {
      const fromPublicKey = new PublicKey(fromWallet);
      const toPublicKey = new PublicKey(toWallet);
      
      // For MVP, we'll create a simple SOL transfer instead of USDC
      // This avoids the complex token account creation
      const lamports = amountUsdc * 1000000; // Convert to lamports (simplified)

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: fromPublicKey,
          toPubkey: toPublicKey,
          lamports,
        })
      );

      const { blockhash } = await this.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = fromPublicKey;

      return transaction.serialize({ requireAllSignatures: false }).toString('base64');
    } catch (error) {
      console.error('Error creating USDC payment:', error);
      throw new Error('Failed to create USDC payment transaction');
    }
  }

  /**
   * Verify a payment transaction
   */
  async verifyPayment(signature: string): Promise<{
    confirmed: boolean;
    amount?: number;
    from?: string;
    to?: string;
  }> {
    try {
      const confirmation = await this.connection.getSignatureStatus(signature);
      
      if (confirmation.value?.confirmationStatus === 'confirmed' || 
          confirmation.value?.confirmationStatus === 'finalized') {
        
        const transaction = await this.connection.getTransaction(signature);
        if (transaction && transaction.meta) {
          // Extract payment details from transaction
          const preBalance = transaction.meta.preBalances[0] || 0;
          const postBalance = transaction.meta.postBalances[0] || 0;
          const amount = preBalance - postBalance;
          return {
            confirmed: true,
            amount: amount > 0 ? amount / LAMPORTS_PER_SOL : 0,
            from: transaction.transaction.message.accountKeys[0].toBase58(),
            to: transaction.transaction.message.accountKeys[1].toBase58(),
          };
        }
      }

      return { confirmed: false };
    } catch (error) {
      console.error('Error verifying payment:', error);
      return { confirmed: false };
    }
  }

  /**
   * Get current SOL to USD rate (simplified - use real API in production)
   */
  async getSolToUsdRate(): Promise<number> {
    try {
      // In production, integrate with CoinGecko or similar API
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
      const data = await response.json();
      return data.solana.usd;
    } catch (error) {
      console.error('Error fetching SOL price:', error);
      return 100; // Fallback price
    }
  }

  /**
   * Convert USD amount to SOL
   */
  async convertUsdToSol(usdAmount: number): Promise<number> {
    const solPrice = await this.getSolToUsdRate();
    return usdAmount / solPrice;
  }

  /**
   * Process fiat to crypto conversion (simplified)
   */
  async processFiatPayment(
    paymentMethod: 'card' | 'bank',
    amount: number,
    currency: 'USD' | 'PKR',
    userWallet: string
  ): Promise<{
    success: boolean;
    transactionId?: string;
    cryptoAmount?: number;
    message?: string;
  }> {
    try {
      // In production, integrate with payment processors like:
      // - Stripe for card payments
      // - ACH for bank transfers
      // - Local payment methods for PKR

      // Simulate payment processing
      const conversionRate = currency === 'PKR' ? 0.0036 : 1; // PKR to USD
      const usdAmount = amount * conversionRate;
      const solAmount = await this.convertUsdToSol(usdAmount);

      // Simulate successful payment
      const transactionId = `fiat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      return {
        success: true,
        transactionId,
        cryptoAmount: solAmount,
        message: `Successfully converted ${amount} ${currency} to ${solAmount.toFixed(4)} SOL`
      };
    } catch (error) {
      console.error('Error processing fiat payment:', error);
      return {
        success: false,
        message: 'Payment processing failed'
      };
    }
  }
}

// Export configured instance
export const paymentService = new PaymentService({
  solanaRpcUrl: process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com',
  merchantWallet: process.env.MERCHANT_WALLET || 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  usdcMint: process.env.USDC_MINT || 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' // Devnet USDC
});
