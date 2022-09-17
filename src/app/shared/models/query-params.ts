export class QueryParams {
  public searchKeyword?: string;
  public pageNumber: number = 1;
  public pageSize: number = 20;
}

export class RequestQueryParams extends QueryParams {
  public status: any = '';
  public startDate: Date | any;
  public endDate: Date | any;
  public isActive?: boolean | '' = '';
}
