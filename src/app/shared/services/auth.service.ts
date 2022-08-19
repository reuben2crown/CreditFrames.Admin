import { Injectable } from '@angular/core';
import { LoginModel, ReissueTokenModel, LoginResponseModel, ChangePasswordModel, PasswordResetModel, ForgotPasswordModel, AccountVerificationModel, ResendVerificationModel } from '../models/login-model';
import { Observable } from 'rxjs';
import { ResourceService } from './resource.service';
import { AuthUserData } from '../common/auth-data';
import { IpAddressService } from './ipaddress.service';
import { mergeMap } from 'rxjs/operators';
import { CommonService } from '../common/common.service';
import { ResponseModel } from '../models/response-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpoint = 'Auth';

  constructor(
    public resource: ResourceService,
    private ipservice: IpAddressService
  ) {
    this.resource.endpoint = this.endpoint;
  }

  public login = (model: LoginModel): Observable<any> => {
    return this.ipservice.getIpAddress().pipe(
      mergeMap((result: any) => {
        if (result) {
          model.ipAddress = result.ip;
        }
        this.setActionUrl(`/Login`);
        return this.resource.post<any>(model);
      })
    );
  };

  public changePassword = (model: ChangePasswordModel): Observable<ResponseModel> => {
    this.setActionUrl(`/ChangePassword`);
    return this.resource.post<any>(model);
  };

  public forgotPassword = (model: ForgotPasswordModel): Observable<any> => {
        this.setActionUrl(`/ForgotPassword`);
    return this.resource.post<any>(model);
  };

  public confirmPasswordReset = (model: PasswordResetModel): Observable<any> => {
    this.setActionUrl(`/ConfirmPasswordReset`);
    return this.resource.post<any>(model);
  };

  public verifyAccount = (model: AccountVerificationModel): Observable<any> => {
    this.setActionUrl(`/VerifyAccount`);
    return this.resource.post<any>(model);
  };

  public checkIfEmailExist = (item: {}): Observable<any> => {
    this.setActionUrl(`/CheckIfEmailExist`, 'Onboarding');
    return this.resource.post<any>(item);
  };

  public resendVerication = (model: ResendVerificationModel): Observable<any> => {
    this.setActionUrl(`/ResendVerification`);
    return this.resource.post<any>(model);
  };

  public logout = (): Observable<any> => {
    this.setActionUrl(`/Logout`);
    return this.resource.post<any>(null);
  };

  public reissue_token(token: string, refreshToken: string): Observable<LoginResponseModel> {
    this.setActionUrl(`/RefreshToken`);
    const model = new ReissueTokenModel();
    model.token = token;
    model.refreshToken = refreshToken;
    return this.resource.post<any>(model);
  }

  private setActionUrl(path = '', microservice: 'Onboarding' | 'UserSecurity' | 'Trips' = 'UserSecurity'): void {
    this.resource.microservice = microservice;
    this.resource.setBaseUrl();
    this.resource.endpoint = this.endpoint + path;
  }
}

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {
  constructor(private authService: AuthService, private commonService: CommonService, private _authData: AuthUserData) { }

  async getNewToken(): Promise<string> {
    const token = this._authData.getLoginToken();
    const refresh_token = this._authData.getRefreshToken();
    if (!refresh_token || !token) {
      return null;
    }
    
    try {
      let response = await this.authService.reissue_token(token, refresh_token).toPromise();
      if(response){
        if (response.status && response.accessToken) {
          this._authData.saveLogin(response);
          return response.accessToken;
        } else {
          this._authData.logout();
        }
      }
      return response?.accessToken;
    } catch (error) {
      this.commonService.handleError(error);
      this._authData.logout();
      return null;
    }
  }
}
