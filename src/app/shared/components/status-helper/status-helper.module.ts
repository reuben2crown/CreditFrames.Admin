import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusHelperComponent } from './status-helper.component';

@NgModule({
  declarations: [StatusHelperComponent],
  exports: [StatusHelperComponent],
  imports: [
    CommonModule
  ]
})
export class StatusHelperModule { }
