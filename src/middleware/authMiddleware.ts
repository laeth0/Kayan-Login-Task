import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request interface to include user data
export interface AuthRequest extends Request {
    user?: {
        id: number;
        username: string;
        companyId: number;
    };
}

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key';

/**
 * Authentication Middleware
 * Verifies JWT token from Authorization header
 * Adds decoded user data to request object
 */
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // Get the authorization header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        // Verify token
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: 'Invalid or expired token.'
                });
            }

            // Add user data to request
            req.user = decoded as { id: number; username: string; companyId: number };
            console.log('Authenticated user:', req.user);
            next();
        });

    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error during authentication.'
        });
    }
};

/**
 * Optional Authentication Middleware
 * Adds user data if token is present, but doesn't require it
 */
export const optionalAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token) {
            jwt.verify(token, JWT_SECRET, (err, decoded) => {
                if (!err) {
                    req.user = decoded as { id: number; username: string; companyId: number };
                }
            });
        }
        next();
    } catch (error) {
        next();
    }
};
