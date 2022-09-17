import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LenderFormComponent } from './lender-form/lender-form.component';
import { LendersComponent } from './lenders.component';

const routes: Routes = [
  { path: '', component: LendersComponent, data: { title: 'Manage Lenders'} },
  { path: 'lender-form', component: LenderFormComponent, data: { title: 'Create New Lender'} },
  { path: 'lender-form/:id', component: LenderFormComponent, data: { title: 'Edit Lender'} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LendersRoutingModule { }
