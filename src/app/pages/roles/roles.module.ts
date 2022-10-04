import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { RoleFormComponent } from './role-form/role-form.component';
import { HasPermissionDirectiveModule, SharedLibModule } from 'src/app/shared';
import { PageProviderModule } from 'src/app/modules/page-provider.module';


@NgModule({
  declarations: [RolesComponent, RoleFormComponent],
  imports: [
    CommonModule,
    RolesRoutingModule,
    PageProviderModule,
    HasPermissionDirectiveModule,
    SharedLibModule,
  ]
})
export class RolesModule { }
