import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesComponent } from './countries.component';
import { PageProviderModule } from 'src/app/modules/page-provider.module';
import { CountryFormComponent } from './country-form/country-form.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';

@NgModule({
  declarations: [
    CountriesComponent,
    CountryFormComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    PageProviderModule,
    NzUploadModule
  ]
})
export class CountriesModule { }
