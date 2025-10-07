import { Request, Response } from 'express';
import { IEmployeeUseCase } from '../interfaces';

export default class EmployeeController {
    constructor(private readonly employeeUseCase: IEmployeeUseCase) { }

    async getAll(_req: Request, res: Response) {
        try {
            const data = await this.employeeUseCase.getAll();
            return res.status(200).json({ success: true, data });
        } catch (e) { return this.err(res, e); }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const employee = await this.employeeUseCase.getById(id);
            if (!employee) return res.status(404).json({ success: false, message: 'Employee not found' });
            return res.status(200).json({ success: true, data: employee });
        } catch (e) { return this.err(res, e); }
    }

    async getByCompany(req: Request, res: Response) {
        try {
            const companyId = Number(req.params.companyId);
            const data = await this.employeeUseCase.getByCompany(companyId);
            return res.status(200).json({ success: true, data });
        } catch (e) { return this.err(res, e); }
    }

    async create(req: Request, res: Response) {
        try {
            const created = await this.employeeUseCase.create(req.body);
            return res.status(201).json({ success: true, data: created, message: 'Employee created successfully' });
        } catch (e) { return this.err(res, e); }
    }

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const updated = await this.employeeUseCase.update(id, req.body);
            if (!updated) return res.status(404).json({ success: false, message: 'Employee not found' });
            return res.status(200).json({ success: true, data: updated, message: 'Employee updated successfully' });
        } catch (e) { return this.err(res, e); }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const deleted = await this.employeeUseCase.delete(id);
            if (!deleted) return res.status(404).json({ success: false, message: 'Employee not found' });
            return res.status(200).json({ success: true, message: 'Employee deleted successfully' });
        } catch (e) { return this.err(res, e); }
    }

    private err(res: Response, error: unknown) {
        console.error('Employee controller error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
