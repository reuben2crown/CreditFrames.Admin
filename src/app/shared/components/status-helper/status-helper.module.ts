import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusHelperComponent } from './status-helper.component';
import { NzTagModule } from 'ng-zorro-antd/tag';

@NgModule({
  declarations: [StatusHelperComponent],
  exports: [StatusHelperComponent],
  imports: [
    CommonModule,
    NzTagModule
  ]
})
export class StatusHelperModule { }
