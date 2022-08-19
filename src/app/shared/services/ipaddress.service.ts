import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IpAddressService {

  constructor(private http: HttpClient) {
  }

  public getIpAddress(){
    return this.http.jsonp('https://api.ipify.org?format=jsonp', "callback");
  }
}
