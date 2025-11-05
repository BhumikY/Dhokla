import express from 'express';
// FIX: Changed imports to use .tsx extensions to resolve module loading errors.
import { jobs } from '../data/db.tsx';
import { protect, clientOrAdmin } from '../middleware/authMiddleware.tsx';

const router = express.Router();

// GET /api/jobs
router.get('/', protect, (req, res) => {
    res.json(jobs);
});

// POST /api/jobs
router.post('/', protect, clientOrAdmin, (req, res) => {
    const jobData = req.body;
    if (!jobData.title || !jobData.client || !jobData.description) {
        return res.status(400).json({ message: 'Missing required job data' });
    }
    const newJob = {
        ...jobData,
        id: Date.now(),
    };
    jobs.unshift(newJob);
    res.status(201).json(newJob);
});

export default router;