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
  { path: 'payments', loadChildren: () => import('./pages/payments/payments.module').then(m => m.PaymentsModule), canActivate: [AuthGuard] },
  { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard] },
  { path: 'consultations', loadChildren: () => import('./pages/consultation/consultation.module').then(m => m.ConsultationModule), canActivate: [AuthGuard] },
  { path: 'payment-plans', loadChildren: () => import('./pages/payment-plan/payment-plan.module').then(m => m.PaymentPlanModule), canActivate: [AuthGuard] },
  { path: 'audit-logs', loadChildren: () => import('./pages/audit-log/audit-log.module').then(m => m.AuditLogModule), canActivate: [AuthGuard] },
  { path: 'customers', loadChildren: () => import('./pages/customers/customers.module').then(m => m.CustomersModule), canActivate: [AuthGuard] },
  { path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule), canActivate: [AuthGuard] },
  { path: 'profile-setting', loadChildren: () => import('./pages/profile-setting/profile-setting.module').then(m => m.ProfileSettingModule), canActivate: [AuthGuard] },
  { path: 'loan-types', loadChildren: () => import('./pages/loan-types/loan-types.module').then(m => m.LoanTypesModule), canActivate: [AuthGuard] },
  { path: 'loan-features', loadChildren: () => import('./pages/loan-features/loan-features.module').then(m => m.LoanFeaturesModule), canActivate: [AuthGuard] },
  { path: 'lenders', loadChildren: () => import('./pages/lenders/lenders.module').then(m => m.LendersModule), canActivate: [AuthGuard] },
  { path: 'countries', loadChildren: () => import('./pages/countries/countries.module').then(m => m.CountriesModule), canActivate: [AuthGuard] },
  { path: 'states', loadChildren: () => import('./pages/states/states.module').then(m => m.StatesModule), canActivate: [AuthGuard]},
  { path: 'loans', loadChildren: () => import('./pages/loans/loans.module').then(m => m.LoansModule), canActivate: [AuthGuard] },
  { path: 'search-histories', loadChildren: () => import('./pages/search-histories/search-histories.module').then(m => m.SearchHistoriesModule), canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
