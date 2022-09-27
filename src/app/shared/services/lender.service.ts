import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { Observable } from 'rxjs';
import { LenderLoanType, LenderModel } from '../models/lender-model';
import { QueryParams } from '../models/query-params';
import { PagedList } from '../models/pagination';
import { DataResponseModel, ResponseModel } from '../models/response-model';
import { AccountTypeEnum } from '../models';
import { IpAddressService } from './ipaddress.service';

@Injectable({
  providedIn: 'root'
})
export class LenderService {
  private endpoint = 'Lenders';

  constructor(public resource: ResourceService, private ipservice: IpAddressService) {
    this.resource.endpoint = this.endpoint;
  }

  public getPaged(query: QueryParams): Observable<PagedList<LenderModel>> {
    this.setActionUrl(`/?accountType=${AccountTypeEnum.admin}`);
    return this.resource.getPagedList<LenderModel>(query);
  }

  public export = (query: QueryParams, exportType: string = 'csv', reportType: 'all' | 'summary' = 'all'): Observable<any> => {
    var isSummary = (reportType == 'summary');
    this.setActionUrl(`/Export/?exportType=${exportType}&isSummary=${isSummary}`);
    return this.resource.downloadFile(query);
  };

  public getById = (id: number): Observable<LenderModel> => {
    this.setActionUrl();
    return this.resource.get<LenderModel>(id);
  }
  
  public getLenderLoanType = (id: number): Observable<LenderLoanType> => {
    this.setActionUrl(`/getLenderLoanType`);
    return this.resource.get<LenderLoanType>(id);
  }
  
  public create = (formData: FormData): Observable<any> => {
    this.setActionUrl(`/`);
    return this.resource.upload<any>(formData);
  }

  public update = (id: number, formData: FormData): Observable<any> => {
    this.setActionUrl(`/${id}`);
    return this.resource.upload<any>(formData, 'PUT');
  }

  public delete = (id: number): Observable<any> => {
    this.setActionUrl(`/`);
    return this.resource.delete(id);
  }

  public removeLoanType = (id: number): Observable<any> => {
    this.setActionUrl(`/RemoveLoanType`);
    return this.resource.delete(id);
  }

  private setActionUrl(path = ''): void {
    // this.resource.microservice = 'Onboarding';
    this.resource.setBaseUrl();
    this.resource.endpoint = this.endpoint + path;
  }
}
