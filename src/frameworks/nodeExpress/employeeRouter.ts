import projectDependinces from "../../config/projectDependinces";
import { EmployeeDatabase, IEmployeeDatabase } from "../database/employeeDatabase";
import EmployeeUseCase from "../../usecase/EmployeeUseCase";
import EmployeeController from "../../controllers/EmployeeController";
import { IEmployeeUseCase } from "../../interfaces";
import { authenticateToken } from "../../middleware/authMiddleware.js";


const pool = projectDependinces().DatabaseConnectionTools.IcdDBpoolObj;
const employeeDb: IEmployeeDatabase = new EmployeeDatabase(pool);
const employeeUseCase: IEmployeeUseCase = new EmployeeUseCase(employeeDb);
const employeeController = new EmployeeController(employeeUseCase);
const router = projectDependinces().framework.Router();

router.get('/', (req, res) => employeeController.getAll(req, res));
router.get('/:id', (req, res) => employeeController.getById(req, res));
router.get('/company/:companyId', (req, res) => employeeController.getByCompany(req, res));

// Protected routes (authentication required)
router.post('/', authenticateToken, (req, res) => employeeController.create(req, res));
router.put('/:id', authenticateToken, (req, res) => employeeController.update(req, res));
router.delete('/:id', authenticateToken, (req, res) => employeeController.delete(req, res));

export default router;