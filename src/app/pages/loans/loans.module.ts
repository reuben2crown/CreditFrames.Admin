import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoansRoutingModule } from './loans-routing.module';
import { LoansComponent } from './loans.component';
import { PageProviderModule } from 'src/app/modules/page-provider.module';


@NgModule({
  declarations: [
    LoansComponent
  ],
  imports: [
    CommonModule,
    LoansRoutingModule,
    PageProviderModule
  ]
})
export class LoansModule { }
