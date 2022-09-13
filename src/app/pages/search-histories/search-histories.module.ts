import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchHistoriesRoutingModule } from './search-histories-routing.module';
import { SearchHistoriesComponent } from './search-histories.component';
import { PageProviderModule } from 'src/app/modules/page-provider.module';


@NgModule({
  declarations: [
    SearchHistoriesComponent
  ],
  imports: [
    CommonModule,
    SearchHistoriesRoutingModule,
    PageProviderModule 
  ]
})
export class SearchHistoriesModule { }
