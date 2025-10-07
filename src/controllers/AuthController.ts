import { Request, Response } from 'express';
import { IAuthUseCase } from '../interfaces';


export default class AuthController {

    private _authUseCase: IAuthUseCase;

    constructor(authUseCase: IAuthUseCase) {
        this._authUseCase = authUseCase;
    }

    async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Username and password are required'
                });
            }

            const result = await this._authUseCase.loginEmployee({ username, password });

            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(401).json(result);
            }
        } catch (error) {
            console.error('Login controller error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };


    async register(req: Request, res: Response) {
        try {
            const { name, companyId, username, password, active } = req.body;
            if (!name || !companyId || !username || !password) {
                return res.status(400).json({ success: false, message: 'All fields are required' });
            }
            const result = await this._authUseCase.registerEmployee({
                name,
                companyId,
                username,
                password,
                active: active !== undefined ? active : true
            });
            return res.status(result.success ? 201 : 400).json(result);
        } catch (error) {
            console.error('Register controller error:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    };
}