import { Router, Request, Response } from 'express';
import authRouter from './authRouter';
import companyRouter from './companyRouter';
import employeeRouter from './employeeRouter';

const router = Router();
router.get('/health', (_req, res) => {
    res.status(200).json({ success: true, message: 'API is running', timestamp: new Date().toISOString() });
});
router.use('/auth', authRouter);
router.use('/companies', companyRouter);
router.use('/employees', employeeRouter);

export default router;
