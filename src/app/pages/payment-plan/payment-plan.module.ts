import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentPlanRoutingModule } from './payment-plan-routing.module';
import { PaymentPlanComponent } from './payment-plan.component';
import { PaymentPlanFormComponent } from './payment-plan-form/payment-plan-form.component';
import { PageProviderModule } from 'src/app/modules/page-provider.module';


@NgModule({
  declarations: [PaymentPlanComponent, PaymentPlanFormComponent],
  imports: [
    CommonModule,
    PaymentPlanRoutingModule,
    PageProviderModule
  ]
})
export class PaymentPlanModule { }
