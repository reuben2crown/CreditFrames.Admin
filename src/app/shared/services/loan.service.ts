import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModuleKind } from 'typescript';
import { ResourceService } from './resource.service';
import { LoanModel } from '../models/loan-model';
import { DataResponseModel, ResponseModel } from '../models/response-model';
import { Observable } from 'rxjs';
import { PagedList } from '../models/pagination';
import { QueryParams } from '../models/query-params';


@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }
  url: string = 'https://apitest.creditframeys.com/api/Loans';

  getAll() {
    return this.http.get<LoanModel[]>(this.url);
    }

    getById(id: string) {
        var result = this.http.get<LoanModel>(`${this.url}/${id}`);
        return result;
    }

    create(model: LoanModel) {
        return this.http.post<LoanModel[]>(this.url, ModuleKind);
    }

    edit(id: string, model: LoanModel) {
        return this.http.put<LoanModel>(`${this.url}/${id}`, model);
    }

    delete(id: string) {
        return this.http.delete<LoanModel>(`${this.url}/${id}`);
    }
}