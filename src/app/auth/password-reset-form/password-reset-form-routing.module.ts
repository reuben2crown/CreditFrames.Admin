import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordResetFormComponent } from './password-reset-form.component';

const routes: Routes = [
  {
    path: '',
    component: PasswordResetFormComponent,
    data: { title: 'Reset Password' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordResetFormRoutingModule { }
