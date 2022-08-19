import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileSettingRoutingModule } from './profile-setting-routing.module';
import { ProfileSettingComponent } from './profile-setting.component';


@NgModule({
  declarations: [ProfileSettingComponent],
  imports: [
    CommonModule,
    ProfileSettingRoutingModule
  ]
})
export class ProfileSettingModule { }
