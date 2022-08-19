import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XssValidator } from './xss.validator';
import { WhiteSpaceValidator } from './whitespace.validator';

@NgModule({
  // declarations: [XssValidator, WhiteSpaceValidator],
  imports: [CommonModule],
  // exports: [XssValidator, WhiteSpaceValidator]
})
export class CustomValidatorModule {}
