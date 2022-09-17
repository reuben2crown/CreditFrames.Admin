import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./auth/password-reset-form/password-reset-form.module').then(m => m.PasswordResetFormModule)
  },
  { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard], data: { title: 'Manage Users'} },
  { path: 'audit-logs', loadChildren: () => import('./pages/audit-log/audit-log.module').then(m => m.AuditLogModule), canActivate: [AuthGuard], data: { title: 'Audit History'} },
  { path: 'customers', loadChildren: () => import('./pages/customers/customers.module').then(m => m.CustomersModule), canActivate: [AuthGuard], data: { title: 'Customers'} },
  { path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule), canActivate: [AuthGuard], data: { title: 'Settings'} },
  { path: 'profile-setting', loadChildren: () => import('./pages/profile-setting/profile-setting.module').then(m => m.ProfileSettingModule), canActivate: [AuthGuard], data: { title: 'Update Profile'} },
  { path: 'loan', loadChildren: () => import('./pages/loans/loans.module').then(m => m.LoansModule), canActivate: [AuthGuard], data: { title: 'Loans'} },
  { path: 'loan-types', loadChildren: () => import('./pages/loan-types/loan-types.module').then(m => m.LoanTypesModule), canActivate: [AuthGuard], data: { title: 'Loan Types'} },
  { path: 'loan-features', loadChildren: () => import('./pages/loan-features/loan-features.module').then(m => m.LoanFeaturesModule), canActivate: [AuthGuard], data: { title: 'Loan Features'} },
  { path: 'lenders', loadChildren: () => import('./pages/lenders/lenders.module').then(m => m.LendersModule), canActivate: [AuthGuard], data: { title: 'Lenders'} },
  { path: 'countries', loadChildren: () => import('./pages/countries/countries.module').then(m => m.CountriesModule), canActivate: [AuthGuard], data: { title: 'Manage Countries'} },
  { path: 'states', loadChildren: () => import('./pages/states/states.module').then(m => m.StatesModule), canActivate: [AuthGuard], data: { title: 'Manage States'} },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
