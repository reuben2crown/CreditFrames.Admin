import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel, ResponseModel } from '../models/response-model';
import { PermissionModel } from '../models/permission-model';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private endpoint = 'Permissions';
  constructor(public resource: ResourceService) {
  }

  public getAll = (): Observable<PermissionModel[]> => {
    this.setActionUrl();
    return this.resource.getAll<PermissionModel[]>();
  }
  
  public getById = (id: any): Observable<any> => {
    this.setActionUrl();
    return this.resource.get<any>(id);
  }

  public post = (model: any): Observable<DataResponseModel<PermissionModel>> => {
    this.setActionUrl();
    return this.resource.post<any>(model);
  }

  public update = (id: any, model: any): Observable<DataResponseModel<PermissionModel>> => {
    this.setActionUrl();
    return this.resource.put<any>(id, model);
  }

  public delete = (id: any): Observable<any> => {
    this.setActionUrl();
    return this.resource.delete(id);
  }

  private setActionUrl(path = ''): void {
    this.resource.setBaseUrl();
    this.resource.endpoint = this.endpoint + path;
  }
}
