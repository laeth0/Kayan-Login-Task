import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IAuthDatabase } from '../frameworks/database/authDatabase.js';
import { IAuthUseCase } from '../interfaces.js';

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    token?: string;
    employee?: any;
    message?: string;
}


export default class AuthUseCase implements IAuthUseCase {

    private authRepo: IAuthDatabase;
    private jwtSecret: string;

    constructor(authRepo: IAuthDatabase, jwtSecret: string) {
        this.authRepo = authRepo;
        this.jwtSecret = jwtSecret;
    }



    async loginEmployee(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            // Find employee by username
            const employee = await this.authRepo.getEmployeeByUsername(credentials.username);

            if (!employee) {
                return {
                    success: false,
                    message: 'Invalid username or password'
                };
            }

            // Check if employee is active
            if (!employee.active) {
                return {
                    success: false,
                    message: 'Account is inactive'
                };
            }

            // Compare password
            const isPasswordValid = await bcrypt.compare(credentials.password, employee.password);

            if (!isPasswordValid) {
                return {
                    success: false,
                    message: 'Invalid username or password'
                };
            }

            // Generate JWT token
            const token = jwt.sign(
                {
                    id: employee.id,
                    username: employee.username,
                    companyId: employee.companyId
                },
                this.jwtSecret,
                { expiresIn: '24h' }
            );

            // Remove password from response
            const { password, ...employeeData } = employee;

            return {
                success: true,
                token,
                employee: employeeData,
                message: 'Login successful'
            };

        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: 'An error occurred during login'
            };
        }
    };

    async registerEmployee(employeeData: any): Promise<any> {
        try {
            // Check if username already exists
            const existingEmployee = await this.authRepo.getEmployeeByUsername(employeeData.username);

            if (existingEmployee) {
                return {
                    success: false,
                    message: 'Username already exists'
                };
            }

            // Check if company exists
            const company = await this.authRepo.getCompanyById(employeeData.companyId);
            if (!company) {
                return {
                    success: false,
                    message: 'Company not found'
                };
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(employeeData.password, 10);

            // Create employee
            const newEmployee = await this.authRepo.createEmployee({
                ...employeeData,
                password: hashedPassword
            });

            // Remove password from response
            const { password, ...employeeResponse } = newEmployee;

            return {
                success: true,
                employee: employeeResponse,
                message: 'Employee registered successfully'
            };
        } catch (error) {
            console.error('Registration error:', error);
            return {
                success: false,
                message: 'An error occurred during registration'
            };
        }
    };

}

// AuthUseCase now stands alone (SRP). Company and Employee logic moved to their own use case classes.