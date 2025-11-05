import express from 'express';
import jwt from 'jsonwebtoken';
// FIX: Changed import to use .tsx extension to resolve module loading error.
import { Role } from '../types/index.tsx';

export const protect = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        try {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number, email: string, role: Role };
            
            // Attach user to the request object
            req.user = decoded;
            
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export const admin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.user && req.user.role === Role.Admin) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};

export const clientOrAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
     if (req.user && (req.user.role === Role.Admin || req.user.role === Role.Client)) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as a client or admin' });
    }
};