import { NgModule } from '@angular/core';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { DatePipe } from '@angular/common';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzUploadModule } from 'ng-zorro-antd/upload';

@NgModule({
  imports: [
    NzPaginationModule,
    NzPageHeaderModule,
    NzDescriptionsModule,
    NzTableModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzDatePickerModule,
    NzDropDownModule,
    NzSpaceModule,
    NzDrawerModule,
    NzToolTipModule,
    NzDividerModule,
    NzPopconfirmModule,
    NzMessageModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
    NzCheckboxModule,
    NzGridModule,
    NzCardModule,
    NzListModule,
    NzStatisticModule,
    NzAlertModule,
    NzTagModule,
    NzSwitchModule,
    NzUploadModule
  ],
  exports: [
    NzPaginationModule,
    NzPageHeaderModule,
    NzDescriptionsModule,
    NzTableModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzDatePickerModule,
    NzDropDownModule,
    NzSpaceModule,
    NzDrawerModule,
    NzToolTipModule,
    NzDividerModule,
    NzPopconfirmModule,
    NzMessageModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
    NzCheckboxModule,
    NzGridModule,
    NzCardModule,
    NzListModule,
    NzStatisticModule,
    NzAlertModule,
    NzTagModule,
    NzSwitchModule,
    NzUploadModule
  ],
  providers: [DatePipe]
})
export class PageProviderModule {
}
