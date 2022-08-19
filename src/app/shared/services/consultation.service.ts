import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { AddBonusConsultationModel, ConsultationModel, ConsultationTopupModel } from '../models/consultation-model';
import { DataResponseModel, ResponseModel } from '../models/response-model';
import { Observable } from 'rxjs';
import { PagedList } from '../models/pagination';
import { QueryParams } from '../models/query-params';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  private endpoint = 'Consultations';

  constructor(public resource: ResourceService) {
  }

  public topup = (model: ConsultationTopupModel): Observable<ResponseModel> => {
    this.setActionUrl('/Topup');
    return this.resource.post<any>(model);
  }

  public addBonus = (model: AddBonusConsultationModel): Observable<ResponseModel> => {
    this.setActionUrl('/AddBonus');
    return this.resource.post<any>(model);
  }
  
  public getPaged(query: QueryParams): Observable<PagedList<ConsultationModel>> {
    this.setActionUrl();
    return this.resource.getPagedList<ConsultationModel>(query);
  }

  public getByUser = (phoneNumber: string, query: QueryParams, exportType?: string): Observable<PagedList<ConsultationModel>> => {
    var url = `/GetByUser/${phoneNumber}`;
    if (exportType) {
      url = `${url}/?download=true&exportType=${exportType}`
    }
    this.setActionUrl(url);
    return this.resource.getPagedList<ConsultationModel>(query);
  }

  public export = (query: QueryParams, exportType: string = 'csv', reportType: 'all' | 'balance' | 'summary' = 'all'): Observable<any> => {
    this.setActionUrl(`/?download=true&exportType=${exportType}&reportType=${reportType}`);
    return this.resource.downloadFile(query);
  };

  public getById = (id: number): Observable<ConsultationModel> => {
    this.setActionUrl();
    return this.resource.get<ConsultationModel>(id);
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
