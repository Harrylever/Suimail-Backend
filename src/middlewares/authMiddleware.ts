import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config();

// Extend the Request interface to include the 'user' property
declare global {
    namespace Express {
        interface Request {
            user?: { address: string };
        }
    }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '') as string;

    if (!token) {
        res.status(401).json({ error: 'No token provided, authorization denied' });
        return;
    }

    try {
        console.log(token)
        const decoded = jwt.verify(token, 'jwtsecret');
        req.user = decoded as unknown as { address: string };
        next();
    } catch (error) {
        console.error('JWT verification error:', error); 
        res.status(401).json({ error: 'Token is not valid' });
    }
};

export default authMiddleware;

