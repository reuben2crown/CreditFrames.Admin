import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LendersRoutingModule } from './lenders-routing.module';
import { LendersComponent } from './lenders.component';
import { PageProviderModule } from 'src/app/modules/page-provider.module';
import { LenderFormComponent } from './lender-form/lender-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LendersComponent,
    LenderFormComponent
  ],
  imports: [
    CommonModule,
    LendersRoutingModule,
    PageProviderModule,
    ReactiveFormsModule
  ]
})
export class LendersModule { }
