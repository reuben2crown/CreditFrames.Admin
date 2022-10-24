import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchHistoryComponent } from './search-history.component';

const routes: Routes = [{ path: '', component: SearchHistoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchHistoryRoutingModule { }
