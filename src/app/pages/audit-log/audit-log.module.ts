import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditLogRoutingModule } from './audit-log-routing.module';
import { AuditLogComponent } from './audit-log.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  declarations: [AuditLogComponent],
  imports: [
    CommonModule,
    AuditLogRoutingModule,
    NzTableModule,
    NzPaginationModule
  ]
})
export class AuditLogModule { }
