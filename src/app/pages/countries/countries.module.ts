import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesComponent } from './countries.component';
import { CountryFormComponent } from './country-form/country-form.component';
import { PageProviderModule } from 'src/app/modules/page-provider.module';


@NgModule({
  declarations: [
    CountriesComponent,
    CountryFormComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    PageProviderModule
  ]
})
export class CountriesModule { }
