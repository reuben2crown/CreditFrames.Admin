import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConfigService } from "../services/resource.service";

@Injectable()
export class AppResourceInterceptor implements HttpInterceptor {
  private appId: string;
  private apiKey: string;

  constructor(configService: AppConfigService) {
    const appConfig = configService.appConfig;
    if (appConfig) {
      this.appId = appConfig.appId;
      this.apiKey = appConfig.apiKey;
    }
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.headers.has("X-Content-Type")) {
      if (!req.headers.has("Content-Type")) {
        req = req.clone({
          headers: req.headers.set("Content-Type", "application/json")
        });
      }

      if (!req.headers.has("Accept")) {
        req = req.clone({
          headers: req.headers.set("Accept", "application/json")
        });
      }
    }

    // SET API KEY
    if (!req.headers.has('X-Auth-Key') && this.apiKey) {
      req = req.clone({
        headers: req.headers.set('X-Auth-Key', `${this.apiKey}`),
      });
    }
    return next.handle(req);
  }
}
