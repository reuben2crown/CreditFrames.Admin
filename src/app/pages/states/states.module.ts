import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatesRoutingModule } from './states-routing.module';
import { StatesComponent } from './states.component';
import { StateFormComponent } from './state-form/state-form.component';
import { PageProviderModule } from 'src/app/modules/page-provider.module';


@NgModule({
  declarations: [
    StatesComponent,
    StateFormComponent
  ],
  imports: [
    CommonModule,
    StatesRoutingModule,
    PageProviderModule
  ]
})
export class StatesModule { }
