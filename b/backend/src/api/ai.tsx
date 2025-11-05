import express from 'express';
// FIX: Changed imports to use .tsx extensions to resolve module loading errors.
import { generateCourse, generateJob } from '../services/geminiService.tsx';
import { protect, admin } from '../middleware/authMiddleware.tsx';

const router = express.Router();

// POST /api/ai/generate/course
router.post('/generate/course', protect, admin, async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ message: 'Prompt is required' });
    }
    try {
        const courseContent = await generateCourse(prompt);
        res.json(courseContent);
    } catch (error) {
        console.error('AI course generation failed:', error);
        res.status(500).json({ message: 'Failed to generate course from AI.' });
    }
});

// POST /api/ai/generate/job
router.post('/generate/job', protect, admin, async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ message: 'Prompt is required' });
    }
    try {
        const jobContent = await generateJob(prompt);
        res.json(jobContent);
    } catch (error) {
        console.error('AI job generation failed:', error);
        res.status(500).json({ message: 'Failed to generate job from AI.' });
    }
});


export default router;