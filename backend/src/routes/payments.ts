import express from 'express';
import { paymentService } from '../services/paymentService';
import { requireAuth, AuthRequest } from '../middleware/auth';
import prisma from '../utils/prisma';

const router = express.Router();

// Get SOL price
router.get('/sol-price', async (req, res) => {
  try {
    const price = await paymentService.getSolToUsdRate();
    res.json({ price });
  } catch (error) {
    console.error('Error fetching SOL price:', error);
    res.status(500).json({ error: 'Failed to fetch SOL price' });
  }
});

// Create SOL payment transaction
router.post('/create-sol-payment', requireAuth, async (req: AuthRequest, res) => {
  try {
    const { fromWallet, toWallet, amountSol } = req.body;

    if (!fromWallet || !toWallet || !amountSol) {
      return res.status(400).json({ 
        error: 'Missing required fields: fromWallet, toWallet, amountSol' 
      });
    }

    const transactionString = await paymentService.createSolPayment(
      fromWallet,
      toWallet,
      amountSol
    );

    res.json({ 
      success: true, 
      transaction: transactionString 
    });
  } catch (error) {
    console.error('Error creating SOL payment:', error);
    res.status(500).json({ error: 'Failed to create payment transaction' });
  }
});

// Verify payment transaction
router.post('/verify-payment', requireAuth, async (req: AuthRequest, res) => {
  try {
    const { signature } = req.body;

    if (!signature) {
      return res.status(400).json({ error: 'Transaction signature is required' });
    }

    const verification = await paymentService.verifyPayment(signature);
    
    if (verification.confirmed) {
      // Store transaction in database
      await prisma.solanaTransaction.create({
        data: {
          signature,
          status: 'confirmed',
        },
      });
    }

    res.json(verification);
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

// Convert USD to SOL
router.post('/convert-usd-to-sol', async (req, res) => {
  try {
    const { usdAmount } = req.body;

    if (!usdAmount) {
      return res.status(400).json({ error: 'USD amount is required' });
    }

    const solAmount = await paymentService.convertUsdToSol(usdAmount);
    const solPrice = await paymentService.getSolToUsdRate();

    res.json({ 
      usdAmount: parseFloat(usdAmount),
      solAmount,
      solPrice 
    });
  } catch (error) {
    console.error('Error converting USD to SOL:', error);
    res.status(500).json({ error: 'Failed to convert currency' });
  }
});

// Process fiat payment (for future expansion)
router.post('/process-fiat', requireAuth, async (req: AuthRequest, res) => {
  try {
    const { paymentMethod, amount, currency, userWallet } = req.body;

    if (!paymentMethod || !amount || !currency || !userWallet) {
      return res.status(400).json({ 
        error: 'Missing required fields: paymentMethod, amount, currency, userWallet' 
      });
    }

    const result = await paymentService.processFiatPayment(
      paymentMethod,
      amount,
      currency,
      userWallet
    );

    res.json(result);
  } catch (error) {
    console.error('Error processing fiat payment:', error);
    res.status(500).json({ error: 'Failed to process fiat payment' });
  }
});

// Get payment history for user
router.get('/history', requireAuth, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;

    const transactions = await prisma.investment.findMany({
      where: { 
        userId,
        solanaTxSignature: { not: null }
      },
      include: {
        project: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ transactions });
  } catch (error) {
    console.error('Error fetching payment history:', error);
    res.status(500).json({ error: 'Failed to fetch payment history' });
  }
});

export default router;
