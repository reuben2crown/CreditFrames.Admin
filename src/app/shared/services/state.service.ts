import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { DataResponseModel, ResponseModel } from '../models/response-model';
import { Observable } from 'rxjs';
import { PagedList } from '../models/pagination';
import { QueryParams } from '../models/query-params';
import { StateModel, StateFormModel } from '../models/state-model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private endpoint = 'States';

  constructor(public resource: ResourceService) {
  }

  public getAll = (onlyActive = false): Observable<StateModel[]> => {
    this.setActionUrl(`/?onlyActive=${onlyActive}`);
    return this.resource.getAll<StateModel[]>();
  }

  public getPaged(query: QueryParams): Observable<PagedList<StateModel>> {
    this.setActionUrl();
    return this.resource.getPagedList<StateModel>(query);
  }

  public getById = (id: number): Observable<StateModel> => {
    this.setActionUrl();
    return this.resource.get<StateModel>(id);
  }

  public post = (model: StateFormModel): Observable<DataResponseModel<StateModel>> => {
    this.setActionUrl();
    return this.resource.post<any>(model);
  }

  public update = (id: number, model: StateFormModel): Observable<ResponseModel> => {
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
