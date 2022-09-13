import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { Observable } from 'rxjs';
import { PagedList } from '../models/pagination';
import { QueryParams } from '../models/query-params';
import { LoanModel } from '../models/loan-model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private endpoint = 'Loans';

  constructor(public resource: ResourceService) {
  }

  public getAll = (): Observable<LoanModel[]> => {
    this.setActionUrl();
    return this.resource.getAll<LoanModel[]>();
  }

  public getPaged(query: QueryParams): Observable<PagedList<LoanModel>> {
    this.setActionUrl();
    return this.resource.getPagedList<LoanModel>(query);
  }

  public getById = (id: number): Observable<LoanModel> => {
    this.setActionUrl();
    return this.resource.get<LoanModel>(id);
  }

  private setActionUrl(path = ''): void {
    // this.resource.microservice = 'Onboarding';
    this.resource.setBaseUrl();
    this.resource.endpoint = this.endpoint + path;
  }
}
