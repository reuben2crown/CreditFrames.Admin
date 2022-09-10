import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanFeaturesRoutingModule } from './loan-features-routing.module';
import { LoanFeaturesComponent } from './loan-features.component';
import { LoanFeatureFormComponent } from './loan-feature-form/loan-feature-form.component';
import { PageProviderModule } from 'src/app/modules/page-provider.module';



@NgModule({
  declarations: [
    LoanFeaturesComponent,
    LoanFeatureFormComponent
  ],
  imports: [
    CommonModule,
    LoanFeaturesRoutingModule,
    PageProviderModule
  ]
})
export class LoanFeaturesModule { }
