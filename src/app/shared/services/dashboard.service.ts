import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { Observable } from 'rxjs';
import { DashboardModel } from '../models/dashboard-model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private endpoint = 'Dashboard';

  constructor(private resource: ResourceService) {
    
  }

  public getDashboard = (): Observable<DashboardModel> => {
    this.setActionUrl(`/GetDashboard`);
    return this.resource.get<DashboardModel>();
  }

  private setActionUrl(path = '') {
    // this.resource.microservice = 'Trips';
    this.resource.setBaseUrl();
    this.resource.endpoint = this.endpoint + path;
  }
}
