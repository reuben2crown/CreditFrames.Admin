import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Route, CanLoad, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { AuthUserData } from '../common/auth-data';
import { CommonService } from '../common/common.service';
import { RefreshTokenService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(public authData: AuthUserData, private refreshTokenService: RefreshTokenService, public router: Router, private commonService: CommonService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return await this.authorize(route, state.url);
  }

  async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    return await this.authorize(childRoute, state.url);
  }

  async canLoad(route: Route) {
    return await this.authorize(route, route.path);
  }

  async authorize(route: ActivatedRouteSnapshot | Route, returnUrl?: string) {
    // then check if original token has expired.
    if (!this.authData.isAuthenticated()) {
      return await this.refreshToken(returnUrl);
    }

    // then check if token data is not null.
    const user = this.authData.getUserData();
    if (!user) {
      return this.logout(returnUrl);
    }

    // then check if permission matched.
    const userPermissions = this.authData.getPermissions() || [];
    let routePermissions = [];
    if (route.data) {
      routePermissions = route.data["permissions"] as Array<string> || [];
    }

    if (routePermissions.length && !(userPermissions || []).some(p => routePermissions.includes(p.trim()))) {
      this.commonService.showToastError('Your account does not have permission to access that page.');
      //this.router.navigate(['/']);
      return false; // this.logout(returnUrl);
    }
    return true;
  }

  logout(returnUrl?: string) {
    this.authData.logout();
    this.router.navigate(['login'], {
      queryParams: { returnUrl: returnUrl }
    });
    return false;
  }

  async refreshToken(returnUrl?: string) {
    const refreshToken = this.authData.getRefreshToken();
    if (refreshToken) {
      // get reissue token
      var response = await this.refreshTokenService.getNewToken();
      if (response) {
        return true;
      } else {
        return this.logout(returnUrl);
      }
    } else {
      return this.logout(returnUrl);
    }
  }
}
