import bcrypt from 'bcrypt';
import { IEmployeeDatabase } from '../frameworks/database/employeeDatabase.js';

export interface EmployeeData {
    name: string;
    companyId: number;
    username: string;
    password: string;
    active?: boolean;
}

export default class EmployeeUseCase {
    constructor(private readonly employeeRepo: IEmployeeDatabase) { }

    async getAll() {
        const employees = await this.employeeRepo.getAllEmployees();
        return employees.map((e: any) => { const { password, ...rest } = e; return rest; });
    }

    async getById(id: number) {
        const employee = await this.employeeRepo.getEmployeeById(id);
        if (!employee) return null;
        const { password, ...rest } = employee;
        return rest;
    }

    async getByCompany(companyId: number) {
        const employees = await this.employeeRepo.getEmployeesByCompany(companyId);
        return employees.map((e: any) => { const { password, ...rest } = e; return rest; });
    }

    async create(data: EmployeeData) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const created = await this.employeeRepo.createEmployee({
            ...data,
            active: data.active !== undefined ? data.active : true,
            password: hashedPassword,
        });
        const { password, ...rest } = created;
        return rest;
    }

    async update(id: number, data: Partial<EmployeeData>) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        const updated = await this.employeeRepo.updateEmployee(id, data);
        if (!updated) return null;
        const { password, ...rest } = updated;
        return rest;
    }

    async delete(id: number) {
        return this.employeeRepo.deleteEmployee(id);
    }
}
