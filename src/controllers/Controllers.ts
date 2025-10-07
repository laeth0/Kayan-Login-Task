import { Request, Response } from 'express';

export default function buildControllers(useCases: any) {
    const login = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Username and password are required'
                });
            }

            const result = await useCases.loginEmployee({ username, password });

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

    const register = async (req: Request, res: Response) => {
        try {
            const { name, companyId, username, password, active } = req.body;

            if (!name || !companyId || !username || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'All fields are required'
                });
            }

            const result = await useCases.registerEmployee({
                name,
                companyId,
                username,
                password,
                active: active !== undefined ? active : true
            });

            if (result.success) {
                return res.status(201).json(result);
            } else {
                return res.status(400).json(result);
            }
        } catch (error) {
            console.error('Register controller error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };

    const getAllCompanies = async (req: Request, res: Response) => {
        try {
            const companies = await useCases.getAllCompanies();
            return res.status(200).json({
                success: true,
                data: companies
            });
        } catch (error) {
            console.error('Get all companies error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };

    const getCompanyById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const company = await useCases.getCompanyById(parseInt(id));

            if (company) {
                return res.status(200).json({
                    success: true,
                    data: company
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'Company not found'
                });
            }
        } catch (error) {
            console.error('Get company error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };

    const createCompany = async (req: Request, res: Response) => {
        try {
            const { name, country, city, active } = req.body;

            if (!name || !country || !city) {
                return res.status(400).json({
                    success: false,
                    message: 'Name, country, and city are required'
                });
            }

            const company = await useCases.createCompany({
                name,
                country,
                city,
                active: active !== undefined ? active : true
            });

            return res.status(201).json({
                success: true,
                data: company,
                message: 'Company created successfully'
            });
        } catch (error) {
            console.error('Create company error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };

    const updateCompany = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const company = await useCases.updateCompany(parseInt(id), updateData);

            if (company) {
                return res.status(200).json({
                    success: true,
                    data: company,
                    message: 'Company updated successfully'
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'Company not found'
                });
            }
        } catch (error) {
            console.error('Update company error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };

    const deleteCompany = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const deleted = await useCases.deleteCompany(parseInt(id));

            if (deleted) {
                return res.status(200).json({
                    success: true,
                    message: 'Company deleted successfully'
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'Company not found'
                });
            }
        } catch (error) {
            console.error('Delete company error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };

    const getAllEmployees = async (req: Request, res: Response) => {
        try {
            const employees = await useCases.getAllEmployees();
            return res.status(200).json({
                success: true,
                data: employees
            });
        } catch (error) {
            console.error('Get all employees error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };

    const getEmployeeById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const employee = await useCases.getEmployeeById(parseInt(id));

            if (employee) {
                return res.status(200).json({
                    success: true,
                    data: employee
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'Employee not found'
                });
            }
        } catch (error) {
            console.error('Get employee error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };

    const getEmployeesByCompany = async (req: Request, res: Response) => {
        try {
            const { companyId } = req.params;
            const employees = await useCases.getEmployeesByCompany(parseInt(companyId));
            return res.status(200).json({
                success: true,
                data: employees
            });
        } catch (error) {
            console.error('Get employees by company error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };

    const updateEmployee = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const employee = await useCases.updateEmployee(parseInt(id), updateData);

            if (employee) {
                const { password, ...employeeData } = employee;
                return res.status(200).json({
                    success: true,
                    data: employeeData,
                    message: 'Employee updated successfully'
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'Employee not found'
                });
            }
        } catch (error) {
            console.error('Update employee error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };

    const deleteEmployee = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const deleted = await useCases.deleteEmployee(parseInt(id));

            if (deleted) {
                return res.status(200).json({
                    success: true,
                    message: 'Employee deleted successfully'
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'Employee not found'
                });
            }
        } catch (error) {
            console.error('Delete employee error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };

    return {
        // Auth
        login,
        register,
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