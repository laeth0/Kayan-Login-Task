import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

export default function buildUseCases(database: any, jwtSecret: string) {
    // Authentication use case
    const loginEmployee = async (credentials: LoginCredentials): Promise<AuthResponse> => {
        try {
            // Find employee by username
            const employee = await database.getEmployeeByUsername(credentials.username);

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
                jwtSecret,
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

    // Register new employee
    const registerEmployee = async (employeeData: any): Promise<any> => {
        try {
            // Check if username already exists
            const existingEmployee = await database.getEmployeeByUsername(employeeData.username);

            if (existingEmployee) {
                return {
                    success: false,
                    message: 'Username already exists'
                };
            }

            // Check if company exists
            const company = await database.getCompanyById(employeeData.companyId);
            if (!company) {
                return {
                    success: false,
                    message: 'Company not found'
                };
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(employeeData.password, 10);

            // Create employee
            const newEmployee = await database.createEmployee({
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

    // Company use cases
    const getAllCompanies = async () => {
        return await database.getAllCompanies();
    };

    const getCompanyById = async (id: number) => {
        return await database.getCompanyById(id);
    };

    const createCompany = async (companyData: any) => {
        return await database.createCompany(companyData);
    };

    const updateCompany = async (id: number, companyData: any) => {
        return await database.updateCompany(id, companyData);
    };

    const deleteCompany = async (id: number) => {
        return await database.deleteCompany(id);
    };

    // Employee use cases
    const getAllEmployees = async () => {
        const employees = await database.getAllEmployees();
        // Remove passwords from response
        return employees.map((emp: any) => {
            const { password, ...employeeData } = emp;
            return employeeData;
        });
    };

    const getEmployeeById = async (id: number) => {
        const employee = await database.getEmployeeById(id);
        if (employee) {
            const { password, ...employeeData } = employee;
            return employeeData;
        }
        return null;
    };

    const getEmployeesByCompany = async (companyId: number) => {
        const employees = await database.getEmployeesByCompany(companyId);
        return employees.map((emp: any) => {
            const { password, ...employeeData } = emp;
            return employeeData;
        });
    };

    const updateEmployee = async (id: number, employeeData: any) => {
        // If password is being updated, hash it
        if (employeeData.password) {
            employeeData.password = await bcrypt.hash(employeeData.password, 10);
        }
        return await database.updateEmployee(id, employeeData);
    };

    const deleteEmployee = async (id: number) => {
        return await database.deleteEmployee(id);
    };

    return {
        // Auth
        loginEmployee,
        registerEmployee,
        // Companies
        getAllCompanies,
        getCompanyById,
        createCompany,
        updateCompany,
        deleteCompany,
        // Employees
        getAllEmployees,
        getEmployeeById,
        getEmployeesByCompany,
        updateEmployee,
        deleteEmployee,
    };
}