export class PagedList<T> {
    public currentPage: number;
    public pageSize: number;
    public totalCount: number;
    public totalPages: number;
    public indexFrom: number;
    public items: T[];
    public hasPrevious: boolean;
    public hasNext: boolean;
}
