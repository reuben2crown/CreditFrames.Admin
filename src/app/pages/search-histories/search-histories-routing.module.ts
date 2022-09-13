import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchHistoriesComponent } from './search-histories.component';

const routes: Routes = [{ path: '', component: SearchHistoriesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchHistoriesRoutingModule { }
