import { Pool } from 'pg';
import { Employee } from './models/icd_models';

export interface IEmployeeDatabase {
    getAllEmployees(): Promise<Employee[]>;
    getEmployeeById(id: number): Promise<Employee | null>;
    getEmployeeByUsername(username: string): Promise<Employee | null>;
    getEmployeesByCompany(companyId: number): Promise<Employee[]>;
    createEmployee(employee: Employee): Promise<Employee>;
    updateEmployee(id: number, employee: Partial<Employee>): Promise<Employee | null>;
    deleteEmployee(id: number): Promise<boolean>;
}

export class EmployeeDatabase implements IEmployeeDatabase {
    constructor(private readonly pool: Pool) { }

    async getAllEmployees(): Promise<Employee[]> {
        const result = await this.pool.query('SELECT * FROM employee ORDER BY id');
        return result.rows;
    }

    async getEmployeeById(id: number): Promise<Employee | null> {
        const result = await this.pool.query('SELECT * FROM employee WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    async getEmployeeByUsername(username: string): Promise<Employee | null> {
        const result = await this.pool.query('SELECT * FROM employee WHERE username = $1', [username]);
        return result.rows[0] || null;
    }

    async getEmployeesByCompany(companyId: number): Promise<Employee[]> {
        const result = await this.pool.query('SELECT * FROM employee WHERE companyId = $1 ORDER BY id', [companyId]);
        return result.rows;
    }

    async createEmployee(employee: Employee): Promise<Employee> {
        const result = await this.pool.query(
            'INSERT INTO employee (name, companyId, username, password, active) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [employee.name, employee.companyId, employee.username, employee.password, employee.active]
        );
        return result.rows[0];
    }

    async updateEmployee(id: number, employee: Partial<Employee>): Promise<Employee | null> {
        const { clause, values } = buildDynamicUpdate(employee, ['name', 'companyId', 'username', 'password', 'active']);
        if (!clause) return null;
        values.push(id);
        const result = await this.pool.query(`UPDATE employee SET ${clause} WHERE id = $${values.length} RETURNING *`, values);
        return result.rows[0] || null;
    }

    async deleteEmployee(id: number): Promise<boolean> {
        const result = await this.pool.query('DELETE FROM employee WHERE id = $1 RETURNING id', [id]);
        return !!(result.rowCount && result.rowCount > 0);
    }
}

function buildDynamicUpdate(obj: Record<string, any>, allowed: string[]) {
    const updates: string[] = [];
    const values: any[] = [];
    let i = 1;
    for (const k of allowed) {
        if (obj[k] !== undefined) { updates.push(`${k} = $${i++}`); values.push(obj[k]); }
    }
    return { clause: updates.join(', '), values };
}

export default EmployeeDatabase;