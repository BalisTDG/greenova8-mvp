import express from 'express';
import prisma from '../utils/prisma';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Create new investment
router.post('/', requireAuth, async (req: AuthRequest, res) => {
  try {
    const { projectId, amount } = req.body;
    const userId = req.user!.id;

    if (!projectId || !amount) {
      return res.status(400).json({ error: 'Project ID and amount are required' });
    }

    const investmentAmount = parseFloat(amount);
    if (investmentAmount < 100) {
      return res.status(400).json({ error: 'Minimum investment is $100' });
    }

    // Check if project exists and is active
    const project = await prisma.project.findUnique({
      where: { id: parseInt(projectId) },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (project.status !== 'active') {
      return res.status(400).json({ error: 'Project is not accepting investments' });
    }

    // Check if investment would exceed target
    const currentRaised = Number(project.raisedAmount);
    const targetAmount = Number(project.targetAmount);
    
    if (currentRaised + investmentAmount > targetAmount) {
      return res.status(400).json({ 
        error: `Investment would exceed target. Available: $${targetAmount - currentRaised}` 
      });
    }

    // Create investment record
    const investment = await prisma.investment.create({
      data: {
        userId,
        projectId: parseInt(projectId),
        amount: investmentAmount,
        solanaTxSignature: req.body.solanaTransaction || null,
      },
      include: {
        project: {
          select: {
            name: true,
            targetAmount: true,
          },
        },
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    // Update project raised amount
    await prisma.project.update({
      where: { id: parseInt(projectId) },
      data: {
        raisedAmount: currentRaised + investmentAmount,
      },
    });

    res.status(201).json({
      message: 'Investment created successfully',
      investment,
    });
  } catch (error) {
    console.error('Create investment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's investments
router.get('/user/:userId', requireAuth, async (req: AuthRequest, res) => {
  try {
    const { userId } = req.params;
    const requestingUserId = req.user!.id;

    // Users can only view their own investments (simplified for MVP)
    if (parseInt(userId) !== requestingUserId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const investments = await prisma.investment.findMany({
      where: { userId: parseInt(userId) },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            description: true,
            targetAmount: true,
            raisedAmount: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const totalInvested = investments.reduce((sum, inv) => sum + Number(inv.amount), 0);

    res.json({
      investments,
      summary: {
        totalInvested,
        totalProjects: investments.length,
      },
    });
  } catch (error) {
    console.error('Get user investments error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user's investments (convenience endpoint)
router.get('/my-investments', requireAuth, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;

    const investments = await prisma.investment.findMany({
      where: { userId },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            description: true,
            targetAmount: true,
            raisedAmount: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const totalInvested = investments.reduce((sum, inv) => sum + Number(inv.amount), 0);
    const uniqueProjects = new Set(investments.map(inv => inv.projectId));

    res.json({
      investments,
      summary: {
        totalInvested,
        totalProjects: uniqueProjects.size,
      },
    });
  } catch (error) {
    console.error('Get my investments error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get investments for a specific project
router.get('/project/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;

    const investments = await prisma.investment.findMany({
      where: { projectId: parseInt(projectId) },
      select: {
        id: true,
        amount: true,
        createdAt: true,
        user: {
          select: {
            email: true, // In production, you might want to anonymize this
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const totalRaised = investments.reduce((sum, inv) => sum + Number(inv.amount), 0);

    res.json({
      investments,
      summary: {
        totalRaised,
        totalInvestors: investments.length,
      },
    });
  } catch (error) {
    console.error('Get project investments error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
