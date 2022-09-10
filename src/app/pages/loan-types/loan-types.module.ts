import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanTypesRoutingModule } from './loan-types-routing.module';
import { LoanTypesComponent } from './loan-types.component';
import { PageProviderModule } from 'src/app/modules/page-provider.module';
import { LoanTypeFormComponent } from './loan-type-form/loan-type-form.component';


@NgModule({
  declarations: [
    LoanTypesComponent,
    LoanTypeFormComponent
  ],
  imports: [
    CommonModule,
    LoanTypesRoutingModule,
    PageProviderModule
  ]
})
export class LoanTypesModule { }
