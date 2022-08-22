import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
  public baseUrl: string;
  public appId: string;
  public apiKey: string;
  public signalRUrl: string;
  public contacts: ContactConfig;
}


@Injectable()
export class ContactConfig {
  public address: string;
  public emailAddress: string;
  public phoneNumber: string;
  public website: string;
}