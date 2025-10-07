import projectDependinces from "../../config/projectDependinces";
import { AuthDatabase, IAuthDatabase } from "../database/authDatabase";
import AuthUseCase from "../../usecase/AuthUseCase";
import AuthController from "../../controllers/AuthController";
import { IAuthUseCase } from "../../interfaces";

const pool = projectDependinces().DatabaseConnectionTools.IcdDBpoolObj;
const authDb: IAuthDatabase = new AuthDatabase(pool);
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key';
const authUseCase: IAuthUseCase = new AuthUseCase(authDb, JWT_SECRET);
const authController = new AuthController(authUseCase);
const router = projectDependinces().framework.Router();

router.post('/login', (req, res) => authController.login(req, res));
router.post('/register', (req, res) => authController.register(req, res));

export default router;