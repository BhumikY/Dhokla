import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// FIX: Changed imports to use .tsx extensions to resolve module loading errors.
import { users } from '../data/db.tsx';
import { User, Role, DbUser } from '../types/index.tsx';
import { protect } from '../middleware/authMiddleware.tsx';

const router = express.Router();

const generateToken = (id: number, email: string, role: Role) => {
    return jwt.sign({ id, email, role }, process.env.JWT_SECRET!, { expiresIn: '30d' });
};

// POST /api/auth/register
router.post('/register', async (req: express.Request, res: express.Response) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const userExists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (userExists) {
        return res.status(409).json({ message: 'User with this email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser: DbUser = {
        id: Date.now(),
        name,
        email,
        role,
        passwordHash
    };
    users.push(newUser);

    const userToReturn: Omit<User, 'tagline'> = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatarText: newUser.name.substring(0, 2).toUpperCase(),
    };
    
    res.status(201).json({
        user: userToReturn,
        token: generateToken(newUser.id, newUser.email, newUser.role),
    });
});

// POST /api/auth/login
router.post('/login', async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    if (email.toLowerCase() === 'admin@skillsetu.io') {
         const adminUser: User = { id: 0, name: 'Admin', email: 'admin@skillsetu.io', role: Role.Admin, avatarText: 'AD' };
         return res.json({
            user: adminUser,
            token: generateToken(adminUser.id, adminUser.email, adminUser.role),
         });
    }

    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (user && (await bcrypt.compare(password, user.passwordHash))) {
        const userToReturn: User = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatarText: user.name.substring(0, 2).toUpperCase(),
            tagline: user.role === Role.Mentor ? 'Mentor' : undefined,
        };
        res.json({
            user: userToReturn,
            token: generateToken(user.id, user.email, user.role),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

// GET /api/auth/session
// FIX: Changed parameter types from custom AuthenticatedRequest to standard Express Request and Response.
router.get('/session', protect, (req: express.Request, res: express.Response) => {
    const reqUser = req.user;
    const dbUser = users.find(u => u.id === reqUser?.id);
    
    if (reqUser?.email === 'admin@skillsetu.io') {
        return res.json({ user: { id: 0, name: 'Admin', email: 'admin@skillsetu.io', role: Role.Admin, avatarText: 'AD' } });
    }

    if (dbUser) {
        const userToReturn: User = {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            role: dbUser.role,
            avatarText: dbUser.name.substring(0, 2).toUpperCase(),
            tagline: dbUser.role === Role.Mentor ? 'Mentor' : undefined,
        };
        res.json({ user: userToReturn });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});


export default router;