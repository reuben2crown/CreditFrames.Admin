import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordResetFormComponent } from './password-reset-form.component';
import { PasswordResetFormRoutingModule } from './password-reset-form-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzFormModule } from 'ng-zorro-antd/form';

@NgModule({
  declarations: [PasswordResetFormComponent],
  imports: [
    CommonModule,
    PasswordResetFormRoutingModule,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,
    NzButtonModule,
    NzPageHeaderModule,
    NzIconModule,
    NzDropDownModule,
    NzDividerModule,
    NzAvatarModule,
    NzCheckboxModule,
    NzInputModule,
    NzToolTipModule
  ]
})
export class PasswordResetFormModule { }
