import { Pool } from 'pg';

export interface Company {
    id?: number;
    name: string;
    country: string;
    city: string;
    active: boolean;
    createdAt?: Date;
    endedAt?: Date;
}

export interface Employee {
    id?: number;
    name: string;
    companyId: number;
    username: string;
    password: string;
    active: boolean;
    createdAt?: Date;
}

export default function buildIcdDatabase(icdDBpoolObj: Pool) {

    // Company operations
    const getAllCompanies = async (): Promise<Company[]> => {
        const result = await icdDBpoolObj.query(
            'SELECT * FROM company ORDER BY id'
        );
        return result.rows;
    };

    const getCompanyById = async (id: number): Promise<Company | null> => {
        const result = await icdDBpoolObj.query(
            'SELECT * FROM company WHERE id = $1',
            [id]
        );
        return result.rows[0] || null;
    };

    const createCompany = async (company: Company): Promise<Company> => {
        const result = await icdDBpoolObj.query(
            'INSERT INTO company (name, country, city, active) VALUES ($1, $2, $3, $4) RETURNING *',
            [company.name, company.country, company.city, company.active]
        );
        return result.rows[0];
    };

    const updateCompany = async (id: number, company: Partial<Company>): Promise<Company | null> => {
        const updates: string[] = [];
        const values: any[] = [];
        let paramCount = 1;

        if (company.name !== undefined) {
            updates.push(`name = $${paramCount++}`);
            values.push(company.name);
        }
        if (company.country !== undefined) {
            updates.push(`country = $${paramCount++}`);
            values.push(company.country);
        }
        if (company.city !== undefined) {
            updates.push(`city = $${paramCount++}`);
            values.push(company.city);
        }
        if (company.active !== undefined) {
            updates.push(`active = $${paramCount++}`);
            values.push(company.active);
        }

        if (updates.length === 0) return null;

        values.push(id);
        const result = await icdDBpoolObj.query(
            `UPDATE company SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
            values
        );
        return result.rows[0] || null;
    };

    const deleteCompany = async (id: number): Promise<boolean> => {
        const result = await icdDBpoolObj.query(
            'DELETE FROM company WHERE id = $1 RETURNING id',
            [id]
        );
        return result.rowCount !== null && result.rowCount > 0;
    };


    // Employee operations
    const getAllEmployees = async (): Promise<Employee[]> => {
        const result = await icdDBpoolObj.query(
            'SELECT * FROM employee ORDER BY id'
        );
        return result.rows;
    };

    const getEmployeeById = async (id: number): Promise<Employee | null> => {
        const result = await icdDBpoolObj.query(
            'SELECT * FROM employee WHERE id = $1',
            [id]
        );
        return result.rows[0] || null;
    };

    const getEmployeeByUsername = async (username: string): Promise<Employee | null> => {
        const result = await icdDBpoolObj.query(
            'SELECT * FROM employee WHERE username = $1',
            [username]
        );
        return result.rows[0] || null;
    };

    const getEmployeesByCompany = async (companyId: number): Promise<Employee[]> => {
        const result = await icdDBpoolObj.query(
            'SELECT * FROM employee WHERE companyId = $1 ORDER BY id',
            [companyId]
        );
        return result.rows;
    };

    const createEmployee = async (employee: Employee): Promise<Employee> => {
        const result = await icdDBpoolObj.query(
            'INSERT INTO employee (name, companyId, username, password, active) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [employee.name, employee.companyId, employee.username, employee.password, employee.active]
        );
        return result.rows[0];
    };

    const updateEmployee = async (id: number, employee: Partial<Employee>): Promise<Employee | null> => {
        const updates: string[] = [];
        const values: any[] = [];
        let paramCount = 1;

        if (employee.name !== undefined) {
            updates.push(`name = $${paramCount++}`);
            values.push(employee.name);
        }
        if (employee.companyId !== undefined) {
            updates.push(`companyId = $${paramCount++}`);
            values.push(employee.companyId);
        }
        if (employee.username !== undefined) {
            updates.push(`username = $${paramCount++}`);
            values.push(employee.username);
        }
        if (employee.password !== undefined) {
            updates.push(`password = $${paramCount++}`);
            values.push(employee.password);
        }
        if (employee.active !== undefined) {
            updates.push(`active = $${paramCount++}`);
            values.push(employee.active);
        }

        if (updates.length === 0) return null;

        values.push(id);
        const result = await icdDBpoolObj.query(
            `UPDATE employee SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
            values
        );
        return result.rows[0] || null;
    };

    const deleteEmployee = async (id: number): Promise<boolean> => {
        const result = await icdDBpoolObj.query(
            'DELETE FROM employee WHERE id = $1 RETURNING id',
            [id]
        );
        return result.rowCount !== null && result.rowCount > 0;
    };

    return {
        // Company methods
        getAllCompanies,
        getCompanyById,
        createCompany,
        updateCompany,
        deleteCompany,
        // Employee methods
        getAllEmployees,
        getEmployeeById,
        getEmployeeByUsername,
        getEmployeesByCompany,
        createEmployee,
        updateEmployee,
        deleteEmployee,
    };
}