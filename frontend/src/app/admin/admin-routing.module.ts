import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { RoleGuard } from '../core/guards/role.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'MAIN_ADMIN'] },
  },
  {
    path: 'vehicles',
    loadChildren: () =>
      import('./vehicles/vehicles.module').then((m) => m.VehiclesModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'MAIN_ADMIN'] },
  },
  {
    path: 'agents',
    loadChildren: () =>
      import('./agents/agent.module').then((m) => m.AgentsModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'MAIN_ADMIN'] },
  },
  {
    path: 'bookings',
    loadChildren: () =>
      import('./bookings/bookings.module').then((m) => m.BookingsModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'MAIN_ADMIN'] },
  },
  {
    path: 'audit',
    loadChildren: () =>
      import('../audit/audit.module').then((m) => m.AuditModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['MAIN_ADMIN'] },
  },
  {
    path: 'metrics',
    loadChildren: () =>
      import('../metrics/metrics.module').then((m) => m.MetricsModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'MAIN_ADMIN'] },
  },
  {
    path: 'support',
    loadChildren: () =>
      import('../support/support.module').then((m) => m.SupportModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'MAIN_ADMIN', 'AGENT'] },
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'MAIN_ADMIN'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
