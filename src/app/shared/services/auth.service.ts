import { Injectable } from '@angular/core';
import { LoginModel, ReissueTokenModel, LoginResponseModel, ChangePasswordModel, PasswordResetModel, ForgotPasswordModel, AccountVerificationModel, ResendVerificationModel, Validate2FATokenModel } from '../models/login-model';
import { from, Observable } from 'rxjs';
import { ResourceService } from './resource.service';
import { AuthUserData } from '../common/auth-data';
// import { IpAddressService } from './ipaddress.service';
import { mergeMap } from 'rxjs/operators';
import { CommonService } from '../common/common.service';
import { DataResponseModel, ResponseModel } from '../models/response-model';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private endpoint = 'Auth';
  private deviceId: string;

  constructor(
    public resource: ResourceService,
    // private ipservice: IpAddressService
  ) {
    // this.resource.endpoint = this.endpoint;
  }

  public login = (model: LoginModel): Observable<DataResponseModel<LoginResponseModel>> => {
    this.setActionUrl('/Login', 'Auth');
    return from(this.getDeviceId())
      .pipe(mergeMap((deviceId) => {
        if (deviceId) {
          model.deviceId = deviceId;
        }

        // var encryptedData = JSON.stringify(model)
        // const headers = new HttpHeaders().append('Accept-Auth', encryptedData);

        return this.resource.post<DataResponseModel<LoginResponseModel>>(model); //, headers
      }));
  }

  public validate2FAToken = (model: Validate2FATokenModel): Observable<DataResponseModel<LoginResponseModel>> => {
    this.setActionUrl('/Validate2FAToken', 'Auth');
    return from(this.getDeviceId())
      .pipe(mergeMap((deviceId) => {
        if (deviceId) {
          model.deviceId = deviceId;
        }
        return this.resource.post<DataResponseModel<LoginResponseModel>>(model);
      }));
  }

  public reissue_token(token: string, refreshToken: string): Observable<LoginResponseModel> {
    this.setActionUrl('/RefreshToken', 'Auth');
    const model: ReissueTokenModel = {
      // token: token,
      refreshToken: refreshToken
    }
    return from(this.getDeviceId())
      .pipe(mergeMap((deviceId) => {
        if (deviceId) {
          model.deviceId = deviceId;
        }
        return this.resource.post<LoginResponseModel>(model);
      }));
  }

  public changePassword = (model: ChangePasswordModel): Observable<ResponseModel> => {
    this.setActionUrl(`/ChangePassword`, 'PasswordManagers');
    return this.resource.post<any>(model);
  };

  public initiatePasswordReset = (model: ForgotPasswordModel): Observable<any> => {
    this.setActionUrl(`/InitiatePasswordReset`, 'PasswordManagers');
    return this.resource.post<any>(model);
  };

  public completePasswordReset = (model: PasswordResetModel): Observable<any> => {
    this.setActionUrl(`/CompletePasswordReset`, 'PasswordManagers');
    return this.resource.post<any>(model);
  };

  public verifyAccount = (model: AccountVerificationModel): Observable<any> => {
    this.setActionUrl(`/VerifyAccount`, 'Verifications');
    return this.resource.post<any>(model);
  };

  public checkIfEmailExist = (item: {}): Observable<any> => {
    this.setActionUrl(`/CheckIfEmailExist`, 'Verifications'); //, 'Onboarding'
    return this.resource.post<any>(item);
  };

  public resendVerication = (model: ResendVerificationModel): Observable<any> => {
    this.setActionUrl(`/ResendVerification`, 'Verifications');
    return this.resource.post<any>(model);
  };

  public logout = (): Observable<any> => {
    this.setActionUrl(`/Logout`, 'Auth');
    return this.resource.post<any>(null);
  };

  private setActionUrl(path = '', baseEndpoint: 'Auth' | 'PasswordManagers' | 'Verifications'): void { // , microservice: 'Onboarding' | 'UserSecurity' | 'Trips' = 'UserSecurity'
    // this.resource.microservice = microservice;
    this.resource.setBaseUrl();
    this.resource.endpoint = baseEndpoint + path;
  }

  public getDeviceId = async () => {
    if (!this.deviceId) {
      // We recommend to call `load` at application startup.
      const fp = await FingerprintJS.load();

      // The FingerprintJS agent is ready.
      // Get a visitor identifier when you'd like to.
      const result = await fp.get();

      // This is the visitor identifier:
      this.deviceId = result.visitorId;
    }
    return this.deviceId;
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
      if (response) {
        if (response && response.accessToken) {
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
