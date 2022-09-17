import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { SearchHistoryModel } from '../models/search-history-model';
import { DataResponseModel, ResponseModel } from '../models/response-model';
import { Observable } from 'rxjs';
import { PagedList, RequestQueryParams } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SearchHistoryService {
  private endpoint = 'SearchHistories';

  constructor(public resource: ResourceService) {
  }

  public getAll = (onlyActive = false): Observable<SearchHistoryModel[]> => {
    this.setActionUrl(`/?onlyActive=${onlyActive}`);
    return this.resource.getAll<SearchHistoryModel[]>();
  }

  // public getPaged(query: QueryParams): Observable<PagedList<SearchHistoryModel>> {
  //   this.setActionUrl();
  //   return this.resource.getPagedList<SearchHistoryModel>(query);
  // }

  public getById = (id: number): Observable<SearchHistoryModel> => {
    this.setActionUrl();
    return this.resource.get<SearchHistoryModel>(id);
  }
  
  public getByUser = (userId: number, query: RequestQueryParams): Observable<PagedList<SearchHistoryModel>> => {
    this.setActionUrl(`/GetByUser/${userId}`);
    return this.resource.getPagedList<SearchHistoryModel>(query);
  }

  public post = (model: SearchHistoryModel): Observable<DataResponseModel<SearchHistoryModel>> => {
    this.setActionUrl();
    return this.resource.post<any>(model);
  }

  public update = (id: number, model: SearchHistoryModel): Observable<ResponseModel> => {
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
