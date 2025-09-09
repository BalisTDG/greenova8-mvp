import { Router } from 'express';
import prisma from '../utils/prisma';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// Get user portfolio summary
router.get('/portfolio', requireAuth, async (req: AuthRequest, res) => {
  const investments = await prisma.investment.findMany({
    where: { userId: req.user!.id },
    include: { project: true },
  });
  const totalInvested = investments.reduce((sum: number, inv: { amount: any }) => sum + Number(inv.amount), 0);
  res.json({ totalInvested, investments });
});

// Get user transactions (Solana)
router.get('/transactions', requireAuth, async (req: AuthRequest, res) => {
  const txs = await prisma.solanaTransaction.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
  res.json(txs);
});

export default router; 