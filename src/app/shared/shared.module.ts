import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResourceService, AppConfigService } from './services/resource.service';
import { CommonService, AuthUserData } from './common';
import { DatePipe } from '@angular/common';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { PipesModule } from './pipes';
import { AppResourceInterceptor } from './interceptors/apikey.interceptor';
import { NzMessageModule } from 'ng-zorro-antd/message';

const appInitializerFn = (configService: AppConfigService) => {
  return () => {
    return configService.loadAppConfig();
  };
};

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    HttpClientJsonpModule,
    NzMessageModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    PipesModule
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppResourceInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    DatePipe,
    ResourceService,
    CommonService,
    AuthUserData
  ],
  exports: [],
})
export class SharedLibModule {}
