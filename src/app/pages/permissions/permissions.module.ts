import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsComponent } from './permissions.component';
import { HasPermissionDirectiveModule, SharedLibModule } from 'src/app/shared';
import { PermissionFormComponent } from './permission-form/permission-form.component';
import { PageProviderModule } from 'src/app/modules/page-provider.module';

@NgModule({
  declarations: [PermissionsComponent, PermissionFormComponent],
  imports: [
    CommonModule,
    PermissionsRoutingModule,
    SharedLibModule,
    HasPermissionDirectiveModule,
    PageProviderModule
  ]
})
export class PermissionsModule { }
