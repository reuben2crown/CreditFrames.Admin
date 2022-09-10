import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { LoanTypeModel } from '../models/loan-type-model';
import { DataResponseModel, ResponseModel } from '../models/response-model';
import { Observable } from 'rxjs';
import { PagedList } from '../models/pagination';
import { QueryParams } from '../models/query-params';

@Injectable({
  providedIn: 'root'
})
export class LoanTypeService {
  private endpoint = 'LoanTypes';

  constructor(public resource: ResourceService) {
  }

  public getAll = (onlyActive = false): Observable<LoanTypeModel[]> => {
    this.setActionUrl(`/?onlyActive=${onlyActive}`);
    return this.resource.getAll<LoanTypeModel[]>();
  }

  public getPaged(query: QueryParams): Observable<PagedList<LoanTypeModel>> {
    this.setActionUrl();
    return this.resource.getPagedList<LoanTypeModel>(query);
  }

  public getById = (id: number): Observable<LoanTypeModel> => {
    this.setActionUrl();
    return this.resource.get<LoanTypeModel>(id);
  }

  public post = (model: LoanTypeModel): Observable<DataResponseModel<LoanTypeModel>> => {
    this.setActionUrl();
    return this.resource.post<any>(model);
  }

  public update = (id: number, model: LoanTypeModel): Observable<ResponseModel> => {
    this.resource.endpoint = `${this.endpoint}`;
    return this.resource.put<any>(id, model);
  }

  public delete = (id: number): Observable<any> => {
    this.setActionUrl();
    return this.resource.delete(id);
  }

  private setActionUrl(path = ''): void {
    // this.resource.microservice = 'Onboarding';
    this.resource.setBaseUrl();
    this.resource.endpoint = this.endpoint + path;
  }
}
