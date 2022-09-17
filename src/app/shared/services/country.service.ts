import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { CountryModel } from '../models/country-model';
import { DataResponseModel, ResponseModel } from '../models/response-model';
import { Observable } from 'rxjs';
// import { PagedList } from '../models/pagination';
// import { QueryParams } from '../models/query-params';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private endpoint = 'Countries';

  constructor(public resource: ResourceService) {
  }

  public getAll = (fetchAll = false): Observable<CountryModel[]> => {
    this.setActionUrl(`/?fetchAll=${fetchAll}`);
    return this.resource.getAll<CountryModel[]>();
  }

  // public getPaged(query: QueryParams): Observable<PagedList<CountryModel>> {
  //   this.setActionUrl();
  //   return this.resource.getPagedList<CountryModel>(query);
  // }

  public getById = (id: number): Observable<CountryModel> => {
    this.setActionUrl();
    return this.resource.get<CountryModel>(id);
  }

  public post = (model: CountryModel): Observable<DataResponseModel<CountryModel>> => {
    this.setActionUrl();
    return this.resource.post<any>(model);
  }

  public update = (id: number, model: CountryModel): Observable<ResponseModel> => {
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
