import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormInputErrorComponent } from './form-input-error.component';

@NgModule({
  declarations: [FormInputErrorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  entryComponents: [FormInputErrorComponent],
  exports: [FormInputErrorComponent]
})
export class FormInputErrorModule { }
