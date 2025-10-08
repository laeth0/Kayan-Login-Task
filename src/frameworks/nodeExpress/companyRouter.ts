import projectDependinces from "../../config/projectDependinces";
import { CompanyDatabase, ICompanyDatabase } from "../database/companyDatabase";
import CompanyUseCase from "../../usecase/CompanyUseCase";
import CompanyController from "../../controllers/CompanyController";
import { ICompanyUseCase } from "../../interfaces";
import { authenticateToken } from "../../middleware/authMiddleware.js";


const pool = projectDependinces().DatabaseConnectionTools.IcdDBpoolObj;
const companyDb: ICompanyDatabase = new CompanyDatabase(pool);
const companyUseCase: ICompanyUseCase = new CompanyUseCase(companyDb);
const companyController = new CompanyController(companyUseCase);
const router = projectDependinces().framework.Router();

router.get('/', (req, res) => companyController.getAll(req, res));
router.get('/:id', (req, res) => companyController.getById(req, res));

// Protected routes (authentication required)
router.post('/', authenticateToken, (req, res) => companyController.create(req, res));
router.put('/:id', authenticateToken, (req, res) => companyController.update(req, res));
router.delete('/:id', authenticateToken, (req, res) => companyController.delete(req, res));

export default router;