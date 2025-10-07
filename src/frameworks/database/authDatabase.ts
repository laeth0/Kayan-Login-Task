import { Pool } from 'pg';
import { Employee, Company } from './icdDatabase.js';

export interface IAuthDatabase {
    getEmployeeByUsername(username: string): Promise<Employee | null>;
    getCompanyById(id: number): Promise<Company | null>;
    createEmployee(employee: Employee): Promise<Employee>;
}

export class AuthDatabase implements IAuthDatabase {
    constructor(private readonly pool: Pool) { }

    async getEmployeeByUsername(username: string): Promise<Employee | null> {
        const result = await this.pool.query('SELECT * FROM employee WHERE username = $1', [username]);
        return result.rows[0] || null;
    }

    async getCompanyById(id: number): Promise<Company | null> {
        const result = await this.pool.query('SELECT * FROM company WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    async createEmployee(employee: Employee): Promise<Employee> {
        const result = await this.pool.query(
            'INSERT INTO employee (name, companyId, username, password, active) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [employee.name, employee.companyId, employee.username, employee.password, employee.active]
        );
        return result.rows[0];
    }
}

export default AuthDatabase;