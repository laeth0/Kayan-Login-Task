// Routes - Define API endpoints with grouped routes
import { Router } from 'express';
import projectDependinces from '../../config/projectDependinces';

export default function buildRoutes(controllers: any) {
    const router: Router = projectDependinces().framework.Router();

    router.get('/health', (req, res) => {
        res.status(200).json({
            success: true,
            message: 'API is running',
            timestamp: new Date().toISOString()
        });
    });

    const authRoutes = Router();
    authRoutes.post('/login', controllers.login);
    authRoutes.post('/register', controllers.register);
    router.use('/auth', authRoutes);

    const companyRoutes = Router();
    companyRoutes.get('/', controllers.getAllCompanies);
    companyRoutes.get('/:id', controllers.getCompanyById);
    companyRoutes.post('/', controllers.createCompany);
    companyRoutes.put('/:id', controllers.updateCompany);
    companyRoutes.delete('/:id', controllers.deleteCompany);
    router.use('/companies', companyRoutes);

    const employeeRoutes = Router();
    employeeRoutes.get('/', controllers.getAllEmployees);
    employeeRoutes.get('/:id', controllers.getEmployeeById);
    employeeRoutes.get('/company/:companyId', controllers.getEmployeesByCompany);
    employeeRoutes.put('/:id', controllers.updateEmployee);
    employeeRoutes.delete('/:id', controllers.deleteEmployee);
    router.use('/employees', employeeRoutes);

    return router;
}