import express, { Request, Response } from 'express';
import { healthCheck } from '../handlers/healthcheck';
import prisma from '../client';

const router = express.Router();

/* GET home page. */
router.get('/', healthCheck);

// Routes

// Create a resource
router.post('/resources', async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const resource = await prisma.resource.create({ data: { name, description }});
        res.status(201).json(resource);
    } catch (error) {
        res.status(500).json({ message: 'Error creating resource', error });
    }
});

// // List resources with optional filters
router.get('/resources', async (req: Request, res: Response) => {
    try {
        const { name } = req.query;
        const whereClause: any = {};

        if (name) {
            whereClause.name = name;
        }

        const resources = await prisma.resource.findMany({ where: whereClause });
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching resources', error });
    }
});

// // Get details of a resource
router.get('/resources/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const resource = await prisma.resource.findUnique({ where: { id } });

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching resource', error });
    }
});

// // Update resource details
router.put('/resources/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const resource = await prisma.resource.update({
            where: { id },
            data: { name, description },
          });

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({ message: 'Error updating resource', error });
    }
});

// // Delete a resource
router.delete('/resources/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const resource = await prisma.resource.findUnique({ where: { id } });

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        await prisma.resource.delete({ where: { id } });
        res.status(200).json({ success: true});
    } catch (error) {
        res.status(500).json({ message: 'Error deleting resource', error });
    }
});

export default router;
