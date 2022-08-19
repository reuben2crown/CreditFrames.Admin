import { Injectable, Injector } from "@angular/core";
import { HttpClient, HttpBackend, HttpRequest, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { AppConfig } from "../common/config";
import { QueryParams } from "../models/query-params";
import { PagedList } from "../models/pagination";

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  public baseUrl: string;
  public endpoint: string;
  public appConfig: AppConfig;
  public microservice: 'Onboarding' | 'UserSecurity' | 'Trips';

  constructor(private httpClient: HttpClient, private injector: Injector) {
    if (!this.baseUrl) {
      const configuration = this.injector.get(AppConfigService);
      this.appConfig = configuration.appConfig;
    }
  }

  public post<T>(item: T): Observable<T> {
    const data = JSON.stringify(item);
    return this.httpClient.post<T>(`${this.baseUrl}/${this.endpoint}`, data);
  }

  public upload<T>(
    data: FormData,
    type: 'POST' | 'PUT' = 'POST'
  ): Observable<HttpEvent<T>> {
    const headers = new HttpHeaders({
      'X-Content-Type': 'multipart/form-data',
    });

    const request = new HttpRequest(
      type,
      `${this.baseUrl}/${this.endpoint}`,
      data,
      {
        // reportProgress: true,
        responseType: 'json',
        headers,
      }
    );
    return this.httpClient.request<T>(request);
  }

  public put<T>(id: number, item: T): Observable<T> {
    const data = JSON.stringify(item);
    return this.httpClient.put<T>(
      `${this.baseUrl}/${this.endpoint}/${id}`,
      data
    );
  }

  public update<T>(item: T, id?: number): Observable<T> {
    const data = JSON.stringify(item);
    let url = `${this.baseUrl}/${this.endpoint}`;
    if (id) {
      url = `${url}/${id}`;
    }
    return this.httpClient.put<T>(url, data);
  }

  public get<T>(id?: any): Observable<T> {
    let url = `${this.baseUrl}/${this.endpoint}`;
    if (id) {
      url = `${url}/${id}`;
    }
    return this.httpClient.get<T>(url);
  }

  public getUrl(): string {
    return `${this.baseUrl}/${this.endpoint}`;
  }

  public getLists<T>(): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.baseUrl}/${this.endpoint}`);
  }

  public getAll<T>(options = {}): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}/${this.endpoint}`, options);
  }

  public getPagedList<T>(queryParams?: any): Observable<PagedList<T>> {
    if (queryParams && queryParams.pageNumber > 0) {
      // queryParams.pageNumber = queryParams.pageNumber -1;
    }
    let queryString = '';
    if (queryParams) {
      queryString = Object.keys(queryParams)
        .filter((x) => queryParams[x] != null && queryParams[x] != undefined)
        .map((key) => {
          if (Array.isArray(queryParams[key])) {
            var param = '';
            queryParams[key].forEach((item: any) => {
              param =
                `${param}${encodeURIComponent(key)}` +
                '=' +
                encodeURIComponent(item) +
                '&';
            });
            return param;
          } else {
            return (
              encodeURIComponent(key) +
              '=' +
              encodeURIComponent(queryParams[key])
            );
          }
        })
        .join('&');
    }

    let separator = (queryString == '') ? '' : (this.endpoint.includes('?') ? '&' : '?');
    return this.httpClient.get<PagedList<T>>(
      `${this.baseUrl}/${this.endpoint}${separator}${queryString}`
    );
  }

  public delete<T>(id?: number): Observable<T> {
    var url = `${this.baseUrl}/${this.endpoint}`;
    if (id) {
      url = `${url}/${id}`;
    }
    return this.httpClient.delete<T>(url);
  }

  public downloadFile<T>(queryParams?: QueryParams): Observable<any> {
    const queryString = queryParams
      ? Object.keys(queryParams)
          .map((key) => {
            return (
              encodeURIComponent(key) +
              '=' +
              encodeURIComponent(queryParams[key])
            );
          })
          .join('&')
      : '';
    return this.httpClient.get(
      `${this.baseUrl}/${this.endpoint}&${queryString}`,
      { responseType: 'blob' }
    );
  }

  setBaseUrl() {
    if (this.appConfig) {
      this.baseUrl = this.appConfig.baseUrl;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  public appConfig: AppConfig;

  constructor(private injector: Injector, private httpHandler: HttpBackend) { }

  loadAppConfig() {
    let http = this.injector.get(HttpClient);
    http = new HttpClient(this.httpHandler); // use HttpBackend handler to ensure that HTTP_INTERCEPTOR ignored this request
    return http
      .get("assets/data/appConfig.json")
      .toPromise()
      .then((data: AppConfig) => {
        this.appConfig = data;
      });
  }
}
