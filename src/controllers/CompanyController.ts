import { Request, Response } from 'express';
import { ICompanyUseCase } from '../interfaces';

export default class CompanyController {
    constructor(private readonly companyUseCase: ICompanyUseCase) { }

    async getAll(_req: Request, res: Response) {
        try {
            const data = await this.companyUseCase.getAll();
            return res.status(200).json({ success: true, data });
        } catch (e) { return this.err(res, e); }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const company = await this.companyUseCase.getById(id);
            if (!company) return res.status(404).json({ success: false, message: 'Company not found' });
            return res.status(200).json({ success: true, data: company });
        } catch (e) { return this.err(res, e); }
    };

    async create(req: Request, res: Response) {
        try {
            const { name, country, city, active } = req.body;
            if (!name || !country || !city) {
                return res.status(400).json({ success: false, message: 'Name, country, and city are required' });
            }
            const created = await this.companyUseCase.create({ name, country, city, active });
            return res.status(201).json({ success: true, data: created, message: 'Company created successfully' });
        } catch (e) { return this.err(res, e); }
    }

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const updated = await this.companyUseCase.update(id, req.body);
            if (!updated) return res.status(404).json({ success: false, message: 'Company not found' });
            return res.status(200).json({ success: true, data: updated, message: 'Company updated successfully' });
        } catch (e) { return this.err(res, e); }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const deleted = await this.companyUseCase.delete(id);
            if (!deleted) return res.status(404).json({ success: false, message: 'Company not found' });
            return res.status(200).json({ success: true, message: 'Company deleted successfully' });
        } catch (e) { return this.err(res, e); }
    }

    private err(res: Response, error: unknown) {
        console.error('Company controller error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
