import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoansRoutingModule } from './loans-routing.module';
import { LoansComponent } from './loans.component';
import { LoanDetailComponent } from './loan-detail/loan-detail.component';
import { StatusHelperModule } from 'src/app/shared';
import { PageProviderModule } from 'src/app/modules/page-provider.module';


@NgModule({
  declarations: [
    LoansComponent,
    LoanDetailComponent
  ],
  imports: [
    CommonModule,
    LoansRoutingModule,
    StatusHelperModule,
    PageProviderModule
  ]
})
export class LoansModule { }
