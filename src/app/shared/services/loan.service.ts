import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModuleKind } from 'typescript';
import { ResourceService } from './resource.service';
import { LoanModel } from '../models/loan-model';
import { DataResponseModel, ResponseModel } from '../models/response-model';
import { Observable } from 'rxjs';
import { PagedList } from '../models/pagination';
import { QueryParams, RequestQueryParams } from '../models/query-params';


@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private endpoint = 'Loans';

  constructor(public resource: ResourceService) {
  }

  public getAll = (onlyActive = false): Observable<LoanModel[]> => {
    this.setActionUrl(`/?onlyActive=${onlyActive}`);
    return this.resource.getAll<LoanModel[]>();
  }

  // public getPaged(query: QueryParams): Observable<PagedList<LoanModel>> {
  //   this.setActionUrl();
  //   return this.resource.getPagedList<LoanModel>(query);
  // }

  public getById = (id: number): Observable<LoanModel> => {
    this.setActionUrl();
    return this.resource.get<LoanModel>(id);
  }
  
  public getByUser = (userId: number, query: RequestQueryParams): Observable<PagedList<LoanModel>> => {
    this.setActionUrl(`/GetByUser/${userId}`);
    return this.resource.getPagedList<LoanModel>(query);
  }

  public post = (model: LoanModel): Observable<DataResponseModel<LoanModel>> => {
    this.setActionUrl();
    return this.resource.post<any>(model);
  }

  public update = (id: number, model: LoanModel): Observable<ResponseModel> => {
    this.resource.endpoint = `${this.endpoint}`;
    return this.resource.put<any>(id, model);
  }

  public delete = (id: number): Observable<any> => {
    this.setActionUrl();
    return this.resource.delete(id);
  }

  private setActionUrl(path = ''): void {
    this.resource.setBaseUrl();
    this.resource.endpoint = this.endpoint + path;
  }
}