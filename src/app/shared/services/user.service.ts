import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { Observable } from 'rxjs';
import { UserModel, UserFormModel } from '../models/user-model';
import { QueryParams } from '../models/query-params';
import { PagedList } from '../models/pagination';
import { DataResponseModel, ResponseModel } from '../models/response-model';
import { AccountTypeEnum } from '../models';
import { IpAddressService } from './ipaddress.service';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private endpoint = 'Users';

  constructor(public resource: ResourceService, private ipservice: IpAddressService) {
    this.resource.endpoint = this.endpoint;
  }

  public getAdmins(query: QueryParams): Observable<PagedList<UserModel>> {
    this.setActionUrl(`/?accountType=${AccountTypeEnum.admin}`);
    return this.resource.getPagedList<UserModel>(query);
  }

  public getCustomers(query: QueryParams): Observable<PagedList<UserModel>> {
    this.setActionUrl(`/?accountType=${AccountTypeEnum.customer}`);
    return this.resource.getPagedList<UserModel>(query);
  }
  
  public export = (query: QueryParams, exportType: string = 'csv', reportType: 'all' | 'summary' = 'all'): Observable<any> => {
    var isSummary = (reportType == 'summary');
    this.setActionUrl(`/Export/?exportType=${exportType}&isSummary=${isSummary}`);
    return this.resource.downloadFile(query);
  };

  public getById = (id: number): Observable<UserModel> => {
    this.setActionUrl();
    return this.resource.get<UserModel>(id);
  }

  public getByEmail = (email: string): Observable<any> => {
    this.setActionUrl(`/GetByEmail?email=${email}`);
    return this.resource.get<any>();
  }

  public getByPhone = (phoneNumber: string): Observable<any> => {
    this.setActionUrl(`/GetByPhoneNumber?phoneNumber=${phoneNumber}`);
    return this.resource.get<any>();
  }

  public createAdmin = (model: UserFormModel): Observable<DataResponseModel<UserModel>> => {
    return this.ipservice.getIpAddress().pipe(
      mergeMap((result: any) => {
        if (result) {
          model.ipAddress = result.ip;
        }
        this.setActionUrl(`/`);
        return this.resource.post<any>(model);
      })
    );
  }

  public update = (id: number, model: UserFormModel): Observable<ResponseModel> => {
    this.setActionUrl(`/`);
    return this.resource.put<any>(id, model);
  }

  public delete = (id: number): Observable<any> => {
    this.setActionUrl(`/`);
    return this.resource.delete(id);
  }

  uploadProfilePhoto(formData: FormData): Observable<any> {
    this.setActionUrl(`/ChangeProfilePicture`);
    return this.resource.upload<any>(formData);
  }

  getProfilePhoto(userId: number): Observable<string> {
    this.setActionUrl(`/GetProfilePicture/${userId}`);
    return this.resource.get<string>();
  }

  private setActionUrl(path = ''): void {
    // this.resource.microservice = 'Onboarding';
    this.resource.setBaseUrl();
    this.resource.endpoint = this.endpoint + path;
  }
}
