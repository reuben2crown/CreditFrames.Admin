import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultationRoutingModule } from './consultation-routing.module';
import { ConsultationComponent } from './consultation.component';
import { ConsultationDetailComponent } from './consultation-detail/consultation-detail.component';
import { TopupComponent } from './topup/topup.component';
import { PageProviderModule } from 'src/app/modules/page-provider.module';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [ConsultationComponent, ConsultationDetailComponent, TopupComponent],
  imports: [
    CommonModule,
    ConsultationRoutingModule,
    PageProviderModule,
    NzModalModule
  ]
})
export class ConsultationModule { }
