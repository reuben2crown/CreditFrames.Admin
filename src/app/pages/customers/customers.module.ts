import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { PageProviderModule } from 'src/app/modules/page-provider.module';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@NgModule({
  declarations: [CustomersComponent, CustomerDetailComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    PageProviderModule,
    NzTabsModule
  ]
})
export class CustomersModule { }
