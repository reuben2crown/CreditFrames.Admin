import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LendersRoutingModule } from './lenders-routing.module';
import { LendersComponent } from './lenders.component';
import { PageProviderModule } from 'src/app/modules/page-provider.module';
import { LenderFormComponent } from './lender-form/lender-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LenderLoantypeFormComponent } from './lender-loantype-form/lender-loantype-form.component';
import { PipesModule } from 'src/app/shared';


@NgModule({
  declarations: [
    LendersComponent,
    LenderFormComponent,
    LenderLoantypeFormComponent
  ],
  imports: [
    CommonModule,
    LendersRoutingModule,
    PageProviderModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class LendersModule { }
