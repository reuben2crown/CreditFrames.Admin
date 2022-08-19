import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';
import { PageProviderModule } from 'src/app/modules/page-provider.module';

@NgModule({
  declarations: [PaymentsComponent, PaymentDetailComponent],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    PageProviderModule
  ]
})
export class PaymentsModule { }
