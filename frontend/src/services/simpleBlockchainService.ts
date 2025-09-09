// Simplified blockchain service for demo purposes
export interface PaymentResult {
  success: boolean;
  signature?: string;
  error?: string;
  amount?: number;
}

export interface ProjectPayment {
  projectId: number;
  amount: number; // Amount in USD
  solAmount: number; // Converted to SOL
  recipientAddress: string;
}

class SimpleBlockchainService {
  private readonly DEMO_SOL_PRICE = 100; // Fixed demo price

  /**
   * Get current SOL price (simplified for demo)
   */
  async getSolPrice(): Promise<number> {
    // In a real app, this would call CoinGecko API
    return this.DEMO_SOL_PRICE;
  }

  /**
   * Convert USD amount to SOL
   */
  async convertUsdToSol(usdAmount: number): Promise<number> {
    const solPrice = await this.getSolPrice();
    return usdAmount / solPrice;
  }

  /**
   * Simulate wallet balance
   */
  async getWalletBalance(): Promise<number> {
    // Simulate having some SOL for demo
    return 5.0;
  }

  /**
   * Simulate payment processing
   */
  async sendPayment(
    wallet: any,
    payment: ProjectPayment
  ): Promise<PaymentResult> {
    // Simulate a blockchain transaction
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a fake transaction signature
      const signature = `demo_tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      return {
        success: true,
        signature,
        amount: payment.solAmount,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Demo transaction failed',
      };
    }
  }

  /**
   * Simulate transaction verification
   */
  async verifyTransaction(signature: string): Promise<{
    confirmed: boolean;
    amount?: number;
    from?: string;
    to?: string;
  }> {
    // Always confirm demo transactions
    return {
      confirmed: true,
      amount: 1.0,
      from: 'demo_sender_address',
      to: 'demo_recipient_address',
    };
  }

  /**
   * Simulate airdrop for testing
   */
  async requestAirdrop(): Promise<string> {
    // Simulate airdrop
    return `demo_airdrop_${Date.now()}`;
  }
}

export const simpleBlockchainService = new SimpleBlockchainService();
export default simpleBlockchainService;
