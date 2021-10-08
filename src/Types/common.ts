export interface ListResponve<T> {
    pagination: PaginationParams;
    data: T[];
};

export interface PaginationParams {
    page: number;
    limit: number;
    total: number;
}

export interface ListParams {
    _page: number;
    _limit?: number;
    _sort?: string;
    _lang?: string;

    [key: string]: any;
}