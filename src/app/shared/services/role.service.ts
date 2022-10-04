import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/response-model';
import { RoleModel, RolePermissionModel } from '../models/role-model';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private endpoint = 'Roles';
  constructor(public resource: ResourceService) {
  }

  public getAll = (): Observable<RoleModel[]> => {
    this.setActionUrl();
    return this.resource.getAll<RoleModel[]>();
  }

  public getRolePermissions = (roleId): Observable<RolePermissionModel[]> => {
    this.setActionUrl(`/GetRolePermissions/${roleId}`);
    return this.resource.getAll<RolePermissionModel[]>();
  }
  
  public getById = (id: any): Observable<RoleModel> => {
    this.setActionUrl();
    return this.resource.get<RoleModel>(id);
  }

  public post = (model: any): Observable<DataResponseModel<RoleModel>> => {
    this.setActionUrl();
    return this.resource.post<any>(model);
  }

  public update = (id: any, model: any): Observable<DataResponseModel<RoleModel>> => {
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
