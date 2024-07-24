export interface IPaginationOptions {
    userRole: string;
    page?: number;
    limit?: number;
}

export interface IQueryResult<T> {
    results: T[];
    total: number;
    page: number;
    limit: number;
}