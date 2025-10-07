export interface IAuthUseCase {
    loginEmployee(data: { username: string; password: string }): Promise<any>;
    registerEmployee(data: any): Promise<any>;
}

export interface ICompanyUseCase {
    getAll(): Promise<any[]>;
    getById(id: number): Promise<any>;
    create(data: any): Promise<any>;
    update(id: number, data: any): Promise<any>;
    delete(id: number): Promise<boolean>;
}

export interface IEmployeeUseCase {
    getAll(): Promise<any[]>;
    getById(id: number): Promise<any>;
    getByCompany(companyId: number): Promise<any[]>;
    create(data: any): Promise<any>;
    update(id: number, data: any): Promise<any>;
    delete(id: number): Promise<boolean>;
}

export interface IAuthUseCase{ 
    loginEmployee(data: { username: string; password: string }): Promise<any>;
    registerEmployee(data: any): Promise<any>;
}