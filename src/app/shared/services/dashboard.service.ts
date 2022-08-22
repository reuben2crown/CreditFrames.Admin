import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { Observable } from 'rxjs';
import { AdminDashboardModel } from '../models/dashboard-model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private endpoint = 'Dashboard';

  constructor(private resource: ResourceService) {
    
  }

  public getDashboard = (): Observable<AdminDashboardModel> => {
    this.setActionUrl(`/AdminDashboard`);
    return this.resource.get<AdminDashboardModel>();
  }

  private setActionUrl(path = '') {
    // this.resource.microservice = 'Trips';
    this.resource.setBaseUrl();
    this.resource.endpoint = this.endpoint + path;
  }
}
