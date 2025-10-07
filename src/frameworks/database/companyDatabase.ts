import { Pool } from 'pg';
import { Company } from './icdDatabase.js';

export interface ICompanyDatabase {
    getAllCompanies(): Promise<Company[]>;
    getCompanyById(id: number): Promise<Company | null>;
    createCompany(company: Company): Promise<Company>;
    updateCompany(id: number, company: Partial<Company>): Promise<Company | null>;
    deleteCompany(id: number): Promise<boolean>;
}

export class CompanyDatabase implements ICompanyDatabase {
    constructor(private readonly pool: Pool) { }

    async getAllCompanies(): Promise<Company[]> {
        const result = await this.pool.query('SELECT * FROM company ORDER BY id');
        return result.rows;
    }

    async getCompanyById(id: number): Promise<Company | null> {
        const result = await this.pool.query('SELECT * FROM company WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    async createCompany(company: Company): Promise<Company> {
        const result = await this.pool.query(
            'INSERT INTO company (name, country, city, active) VALUES ($1, $2, $3, $4) RETURNING *',
            [company.name, company.country, company.city, company.active]
        );
        return result.rows[0];
    }

    async updateCompany(id: number, company: Partial<Company>): Promise<Company | null> {
        const { clause, values } = buildDynamicUpdate(company, ['name', 'country', 'city', 'active']);
        if (!clause) return null;
        values.push(id);
        const result = await this.pool.query(`UPDATE company SET ${clause} WHERE id = $${values.length} RETURNING *`, values);
        return result.rows[0] || null;
    }

    async deleteCompany(id: number): Promise<boolean> {
        const result = await this.pool.query('DELETE FROM company WHERE id = $1 RETURNING id', [id]);
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

export default CompanyDatabase;