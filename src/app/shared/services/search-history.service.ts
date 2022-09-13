import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { Observable } from 'rxjs';
import { PagedList } from '../models/pagination';
import { QueryParams } from '../models/query-params';
import { SearchHistoryModel } from '../models/search-history-model';

@Injectable({
  providedIn: 'root'
})
export class SearchHistoryService {
  private endpoint = 'SearchHistories';

  constructor(public resource: ResourceService) {
  }

  public getPaged(query: QueryParams): Observable<PagedList<SearchHistoryModel>> {
    this.setActionUrl();
    return this.resource.getPagedList<SearchHistoryModel>(query);
  }

  public export = (query: QueryParams, exportType: string = 'csv', reportType: 'all' | 'summary' = 'all'): Observable<any> => {
    var isSummary = (reportType == 'summary');
    this.setActionUrl(`/Export?exportType=${exportType}&isSummary=${isSummary}`);
    return this.resource.downloadFile(query);
  };

  private setActionUrl(path = ''): void {
    // this.resource.microservice = 'Onboarding';
    this.resource.setBaseUrl();
    this.resource.endpoint = this.endpoint + path;
  }
}
