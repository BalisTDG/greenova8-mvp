import express from 'express';
import prisma from '../utils/prisma';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        investments: {
          select: {
            amount: true,
          },
        },
        _count: {
          select: {
            investments: true,
          },
        },
      },
    });

    const projectsWithStats = projects.map(project => ({
      ...project,
      totalInvestors: project._count.investments,
      totalRaised: project.investments.reduce((sum, inv) => sum + Number(inv.amount), 0),
    }));

    res.json({ projects: projectsWithStats });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const projectId = parseInt(id);

    if (isNaN(projectId)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        investments: {
          select: {
            amount: true,
            createdAt: true,
            user: {
              select: {
                email: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: {
            investments: true,
          },
        },
      },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const projectWithStats = {
      ...project,
      totalInvestors: project._count.investments,
      totalRaised: project.investments.reduce((sum, inv) => sum + Number(inv.amount), 0),
    };

    res.json({ project: projectWithStats });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new project (admin only - simplified for MVP)
router.post('/', requireAuth, async (req: AuthRequest, res) => {
  try {
    const { name, description, targetAmount } = req.body;

    if (!name || !targetAmount) {
      return res.status(400).json({ error: 'Name and target amount are required' });
    }

    const project = await prisma.project.create({
      data: {
        name,
        description: description || '',
        targetAmount: parseFloat(targetAmount),
      },
    });

    res.status(201).json({
      message: 'Project created successfully',
      project,
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update project status
router.patch('/:id/status', requireAuth, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const projectId = parseInt(id);

    if (isNaN(projectId)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    if (!['active', 'completed', 'paused'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const project = await prisma.project.update({
      where: { id: projectId },
      data: { status },
    });

    res.json({
      message: 'Project status updated',
      project,
    });
  } catch (error) {
    console.error('Update project status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
