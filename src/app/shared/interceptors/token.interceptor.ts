import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RefreshTokenService } from '../services/auth.service';
import { AuthUserData } from '../common';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  accessToken: string;
  cachedRequests: Array<HttpRequest<any>> = [];

  constructor(
    private _authData: AuthUserData,
    private _refreshTokenService: RefreshTokenService,
    // private _commonService: CommonService
  ) { }

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  // retry the requests. this method can be called after the token is refreshed
  public retryFailedRequests(next: HttpHandler): void {
    this.accessToken = this._authData.getLoginToken();
    this.cachedRequests.forEach(request => {
      // if (!request.headers.has('X-Content-Type')) {
      //   if (!request.headers.has('Content-Type')) {
      //   }
      // }
      if (this.accessToken) {
        request = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${this.accessToken}`)
        });
      }
      return next.handle(request);
    });
    
    this.cachedRequests = [];
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.headers.has('Authorization')) {
      this.accessToken = this._authData.getLoginToken();
      if (this.accessToken) {
        request = request.clone({
          headers: request.headers.append('Authorization', `Bearer ${this.accessToken}`)
        });
      }
    }

    return next.handle(request).pipe(tap(() => { }, async err => {
      if (err instanceof HttpErrorResponse) {
        if (err.error instanceof Error) {
          // console.warn(`A client-side or network error occurred. Handle it accordingly.`);
        } else {
          // console.warn(`Backend returned code ${err.status}, body was: ${err.error}`);
          // console.log(3, err.error);
        }

        if (err.status === 0) {
          // if (err.type === 3) {
          //   // type 3 indicates networking issue (though not concrete error code)
          // }
          // this.networkError('Network error! Please check your connection');
          // next;
        }

        if (err.status === 401) {
          const refreshToken = this._authData.getRefreshToken();
          if (refreshToken) {
            // save current request
            this.collectFailedRequest(request);
            // get reissue token
            const newToken = await this._refreshTokenService.getNewToken();
            if (newToken) {
              this.accessToken = newToken;
              // resend the pending request
              return this.retryFailedRequests(next);
            } else {
              this.gotoLogin();
            }
          } else {
            this.gotoLogin();
          }
        }
        // return nothing or empty observablec
        return EMPTY;
      }
    })
    );
  }

  // Handling HTTP Errors using Toaster
  public handleError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      switch (err.status) {
        case 400:
          errorMessage = "Bad Request.";
          break;
        case 401:
          errorMessage = "You need to log in to do this action.";
          break;
        case 403:
          errorMessage = "You don't have permission to access the requested resource.";
          break;
        case 404:
          errorMessage = "The requested resource does not exist.";
          break;
        case 412:
          errorMessage = "Precondition Failed.";
          break;
        case 500:
          errorMessage = "Internal Server Error.";
          break;
        case 503:
          errorMessage = "The requested service is not available.";
          break;
        case 422:
          errorMessage = "Validation Error!";
          break;
        default:
          errorMessage = "Something went wrong!";
      }
    }
    if (errorMessage) {
      // this.toasters.Error(errorMessage);
    }
  }

  gotoLogin() {
    this.cachedRequests = [];
    this._authData.logout();
  }
}
