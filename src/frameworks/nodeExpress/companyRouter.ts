import projectDependinces from "../../config/projectDependinces";
import { CompanyDatabase, ICompanyDatabase } from "../database/companyDatabase";
import CompanyUseCase from "../../usecase/CompanyUseCase";
import CompanyController from "../../controllers/CompanyController";
import { ICompanyUseCase } from "../../interfaces";

const pool = projectDependinces().DatabaseConnectionTools.IcdDBpoolObj;
const companyDb: ICompanyDatabase = new CompanyDatabase(pool);
const companyUseCase: ICompanyUseCase = new CompanyUseCase(companyDb);
const companyController = new CompanyController(companyUseCase);
const router = projectDependinces().framework.Router();

router.get('/', (req, res) => companyController.getAll(req, res));
router.get('/:id', (req, res) => companyController.getById(req, res));
router.post('/', (req, res) => companyController.create(req, res));
router.put('/:id', (req, res) => companyController.update(req, res));
router.delete('/:id', (req, res) => companyController.delete(req, res));

export default router;