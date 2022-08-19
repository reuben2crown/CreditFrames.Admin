import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthUserData } from '../../common/auth-data';
import { HasPermissionDirective } from './hasPermission.directive';

@NgModule({
  declarations: [HasPermissionDirective],
  providers: [AuthUserData],
  imports: [
    CommonModule
  ],
  entryComponents: [HasPermissionDirective],
   exports: [HasPermissionDirective]
})
export class HasPermissionDirectiveModule { }
