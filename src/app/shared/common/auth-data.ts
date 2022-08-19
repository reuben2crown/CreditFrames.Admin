import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginResponseModel } from '../models/login-model';

import { AuthTokenModel } from '../models/user-model';
import { EventHelper } from './event-helper';

@Injectable({
  providedIn: 'root',
})
export class AuthUserData {
  private HAS_LOGGED_IN = '_creditFrames.hasLoggedIn';
  private ACCESS_TOKEN = '_creditFrames.access_token';
  private REFRESH_TOKEN = '_creditFrames.refresh_token';
  private jwtHelper: JwtHelperService = new JwtHelperService();

  currentUser: AuthTokenModel;
  permissions: string[] = [];
  userLoggedIn: boolean;

  constructor(public events: EventHelper) {
    this.getUserData();
    if (this.currentUser) {
      this.userLoggedIn = true;
    }
  }

  isAuthenticated(): boolean {
    const token = this.getLoginToken();
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  saveLogin(result: LoginResponseModel): void {
    if (result) {
      this.setLoginToken(result.accessToken); // safe token
      this.setRefreshToken(result.refreshToken); // safe refresh token

      this.currentUser = JSON.parse(this.jwtHelper.decodeToken(result.accessToken).UserData) as AuthTokenModel;
      this.permissions = this.jwtHelper.decodeToken(result.accessToken).permissions as string[] || [];

      if (this.currentUser) {
        this.setScreenName(`${this.currentUser.firstName} ${this.currentUser.lastName}`);
      }
      this.userLoggedIn = true;
      this.events.loginEvent.emit(this.userLoggedIn);
    }
  }

  logout(broadcast: boolean = true): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem(this.HAS_LOGGED_IN);
    localStorage.removeItem('_creditFrames.screen_name');
    localStorage.removeItem('_creditFrames.screen_name');
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('_creditFrames.loanQuery'); // remove loan query
    localStorage.removeItem('_creditFrames.workflowQuery'); // remove workflow query
    
    this.userLoggedIn = false;
    this.permissions = [];
    if (broadcast) {
      this.events.loginEvent.emit(this.userLoggedIn);
    }
  }

  setScreenName(username: string): void {
    localStorage.setItem('_creditFrames.screen_name', username);
  }

  getScreenName(): string {
    return localStorage.getItem('_creditFrames.screen_name');
  }

  getUserData(): AuthTokenModel {
    const token = this.getLoginToken() || '';
    if (token !== undefined && token !== null && token !== '') {
      this.currentUser = JSON.parse(this.jwtHelper.decodeToken(token).UserData) as AuthTokenModel;
      return this.currentUser;
    }
    return null;
  }

  getPermissions(): string[] {
    if (!(this.permissions || []).length) {
      const token = this.getLoginToken() || '';
      if (token !== undefined && token !== null && token !== '') {
        this.permissions = this.jwtHelper.decodeToken(token).permissions as string[] || [];
      }
    }

    if (typeof this.permissions == 'string') {
      this.permissions = [this.permissions];
    }
    return this.permissions || [];
  }

  setLoginToken(token: string): void {
    localStorage.setItem(this.ACCESS_TOKEN, token);
  }

  getLoginToken(): string {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN, token);
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }
}
