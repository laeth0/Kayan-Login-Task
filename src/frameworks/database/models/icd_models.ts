
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