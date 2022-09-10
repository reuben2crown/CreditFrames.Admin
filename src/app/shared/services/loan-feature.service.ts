import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { LoanFeatureModel } from '../models/loan-feature-model';
import { DataResponseModel, ResponseModel } from '../models/response-model';
import { Observable } from 'rxjs';
import { PagedList } from '../models/pagination';
import { QueryParams } from '../models/query-params';

@Injectable({
  providedIn: 'root'
})
export class LoanFeatureService {
  private endpoint = 'LoanFeatures';

  constructor(public resource: ResourceService) {
  }

  public getAll = (onlyActive = false): Observable<LoanFeatureModel[]> => {
    this.setActionUrl(`/?onlyActive=${onlyActive}`);
    return this.resource.getAll<LoanFeatureModel[]>();
  }

  public getPaged(query: QueryParams): Observable<PagedList<LoanFeatureModel>> {
    this.setActionUrl();
    return this.resource.getPagedList<LoanFeatureModel>(query);
  }

  public getById = (id: number): Observable<LoanFeatureModel> => {
    this.setActionUrl();
    return this.resource.get<LoanFeatureModel>(id);
  }

  public post = (model: LoanFeatureModel): Observable<DataResponseModel<LoanFeatureModel>> => {
    this.setActionUrl();
    return this.resource.post<any>(model);
  }

  public update = (id: number, model: LoanFeatureModel): Observable<ResponseModel> => {
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
