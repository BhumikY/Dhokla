import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// FIX: Changed imports to use .tsx extensions to resolve module loading errors
// where the compiler was incorrectly picking up empty .ts files.
import authRouter from './api/auth.tsx';
import coursesRouter from './api/courses.tsx';
import jobsRouter from './api/jobs.tsx';
import aiRouter from './api/ai.tsx';
import { seedInitialData } from './data/db.tsx';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// FIX: Explicitly configure CORS to allow requests from any origin.
// This is necessary because the frontend dev server and backend run on different ports.
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.json());

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/ai', aiRouter);

// Health check endpoint
// FIX: Explicitly type request and response to avoid type ambiguity.
app.get('/', (req: express.Request, res: express.Response) => {
    res.send('SkillSetu Backend is running!');
});

const startServer = async () => {
    await seedInitialData();
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer();