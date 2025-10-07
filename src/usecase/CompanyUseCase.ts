export interface CompanyData {
    name: string;
    country: string;
    city: string;
    active?: boolean;
}

import { ICompanyDatabase } from '../frameworks/database/companyDatabase.js';

export default class CompanyUseCase {
    constructor(private readonly companyRepo: ICompanyDatabase) { }

    async getAll() {
        return this.companyRepo.getAllCompanies();
    }

    async getById(id: number) {
        return this.companyRepo.getCompanyById(id);
    }

    async create(data: CompanyData) {
        return this.companyRepo.createCompany({ ...data, active: data.active !== undefined ? data.active : true } as any);
    }

    async update(id: number, data: Partial<CompanyData>) {
        return this.companyRepo.updateCompany(id, data);
    }

    async delete(id: number) {
        return this.companyRepo.deleteCompany(id);
    }
}
