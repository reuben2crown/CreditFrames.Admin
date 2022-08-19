import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { SettingModel, SettingFormModel } from '../models/setting-model';
import { DataResponseModel, ResponseModel } from '../models/response-model';
import { Observable } from 'rxjs';
import { PagedList } from '../models/pagination';
import { QueryParams } from '../models/query-params';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private endpoint = 'Settings';

  constructor(public resource: ResourceService) {
  }

  public getAll = (): Observable<SettingModel[]> => {
    this.setActionUrl();
    return this.resource.getAll<SettingModel[]>();
  }

  public getPaged(query: QueryParams): Observable<PagedList<SettingModel>> {
    this.setActionUrl();
    return this.resource.getPagedList<SettingModel>(query);
  }

  public getById = (id: number): Observable<SettingModel> => {
    this.setActionUrl();
    return this.resource.get<SettingModel>(id);
  }

  public post = (model: SettingFormModel): Observable<DataResponseModel<SettingModel>> => {
    this.setActionUrl();
    return this.resource.post<any>(model);
  }

  public update = (id: number, model: SettingFormModel): Observable<ResponseModel> => {
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
