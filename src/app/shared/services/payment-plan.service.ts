import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { PaymentPlanModel, PaymentPlanFormModel } from '../models/payment-model';
import { DataResponseModel, ResponseModel } from '../models/response-model';
import { Observable } from 'rxjs';
import { PagedList } from '../models/pagination';
import { QueryParams } from '../models/query-params';

@Injectable({
  providedIn: 'root'
})
export class PaymentPlanService {
  private endpoint = 'PaymentPlans';

  constructor(public resource: ResourceService) {
  }

  public getAll = (onlyActive = false): Observable<PaymentPlanModel[]> => {
    this.setActionUrl(`/?onlyActive=${onlyActive}`);
    return this.resource.getAll<PaymentPlanModel[]>();
  }

  public getPaged(query: QueryParams): Observable<PagedList<PaymentPlanModel>> {
    this.setActionUrl();
    return this.resource.getPagedList<PaymentPlanModel>(query);
  }

  public getById = (id: number): Observable<PaymentPlanModel> => {
    this.setActionUrl();
    return this.resource.get<PaymentPlanModel>(id);
  }

  public post = (model: PaymentPlanFormModel): Observable<DataResponseModel<PaymentPlanModel>> => {
    this.setActionUrl();
    return this.resource.post<any>(model);
  }

  public update = (id: number, model: PaymentPlanFormModel): Observable<ResponseModel> => {
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
