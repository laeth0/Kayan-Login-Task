// Express server configuration
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';

export default function buildExpressServer(router: any, port: string | number) {
    const app: Application = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use((req: Request, res: Response, next: NextFunction) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
        next();
    });

    // API routes
    app.use('/api', router);

    // Root endpoint
    app.get('/', (req: Request, res: Response) => {
        res.status(200).json({
            success: true,
            message: 'Welcome to Clean Architecture API',
            version: '1.0.0',
            endpoints: {
                health: '/api/health',
                auth: {
                    login: 'POST /api/auth/login',
                    register: 'POST /api/auth/register'
                },
                companies: {
                    getAll: 'GET /api/companies',
                    getById: 'GET /api/companies/:id',
                    create: 'POST /api/companies',
                    update: 'PUT /api/companies/:id',
                    delete: 'DELETE /api/companies/:id'
                },
                employees: {
                    getAll: 'GET /api/employees',
                    getById: 'GET /api/employees/:id',
                    getByCompany: 'GET /api/employees/company/:companyId',
                    update: 'PUT /api/employees/:id',
                    delete: 'DELETE /api/employees/:id'
                }
            }
        });
    });

    // 404 handler
    app.use((req: Request, res: Response) => {
        res.status(404).json({
            success: false,
            message: 'Route not found'
        });
    });

    // Error handling middleware
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error('Error:', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    });

    // Start server
    const server = app.listen(port, () => {
        console.log('\n========================================');
        console.log('🚀 Server is running!');
        console.log(`📡 Port: ${port}`);
        console.log(`🌍 URL: http://localhost:${port}`);
        console.log(`📚 API Docs: http://localhost:${port}/api/health`);
        console.log('========================================\n');
    });

    return { app, server };
}