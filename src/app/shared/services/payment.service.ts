import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { InitiatePayment, PaymentModel, PaymentResponseModel } from '../models/payment-model';
import { DataResponseModel, ResponseModel } from '../models/response-model';
import { Observable } from 'rxjs';
import { PagedList } from '../models/pagination';
import { QueryParams } from '../models/query-params';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private endpoint = 'Payments';

  constructor(public resource: ResourceService) {
  }

  public getPaged(query: QueryParams): Observable<PagedList<PaymentModel>> {
    this.setActionUrl();
    return this.resource.getPagedList<PaymentModel>(query);
  }

  public getByUser = (phoneNumber: string, query: QueryParams): Observable<PagedList<PaymentModel>> => {
    this.setActionUrl(`/GetByUser/${phoneNumber}`);
    return this.resource.getPagedList<PaymentModel>(query);
  }

  public export = (query: QueryParams, exportType: string = 'csv', reportType: 'all' | 'report' | 'summary' = 'all'): Observable<any> => {
    this.setActionUrl(`/Export/?exportType=${exportType}&reportType=${reportType}`);
    return this.resource.downloadFile(query);
  };

  public getById = (id: number): Observable<PaymentModel> => {
    this.setActionUrl();
    return this.resource.get<PaymentModel>(id);
  }

  public initiate = (model: InitiatePayment): Observable<DataResponseModel<PaymentResponseModel>> => {
    this.setActionUrl('/InitiatePayment');
    return this.resource.post<any>(model);
  }

  public validate = (model: any): Observable<ResponseModel> => {
    this.resource.endpoint = `${this.endpoint}`;
    this.setActionUrl('/VerifyPayment');
    return this.resource.post<any>(model);
  }

  public clearAbandonedPayments = (): Observable<ResponseModel> => {
    this.resource.endpoint = `${this.endpoint}`;
    this.setActionUrl('/ClearAbandonedPayments');
    return this.resource.post<any>({});
  }

  public delete = (id: number): Observable<any> => {
    this.setActionUrl();
    return this.resource.delete(id);
  }

  private setActionUrl(path = ''): void {
    // this.resource.microservice = 'Trips';
    this.resource.setBaseUrl();
    this.resource.endpoint = this.endpoint + path;
  }
}
