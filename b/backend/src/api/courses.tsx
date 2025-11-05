import express from 'express';
// FIX: Changed imports to use .tsx extensions to resolve module loading errors.
import { courses } from '../data/db.tsx';
import { protect, admin } from '../middleware/authMiddleware.tsx';

const router = express.Router();

// GET /api/courses
router.get('/', (req, res) => {
    res.json(courses);
});

// POST /api/courses
router.post('/', protect, admin, (req, res) => {
    const courseData = req.body;
    if (!courseData.title || !courseData.mentor || !courseData.description) {
        return res.status(400).json({ message: 'Missing required course data' });
    }
    const newCourse = {
        ...courseData,
        id: Date.now(),
        image: `https://picsum.photos/seed/${Date.now()}/600/300`,
    };
    courses.unshift(newCourse);
    res.status(201).json(newCourse);
});

export default router;