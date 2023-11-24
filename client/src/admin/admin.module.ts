import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ROUTES, RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/api-authorization/authorize.guard';
import { ApplicationPaths } from 'src/app/app.constants';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const buildRoutes = (appPaths: ApplicationPaths): Routes => [
  {
    path: appPaths.admin,
    component: AdminDashboardComponent,
    pathMatch: 'full',
    canActivate: [authGuard],
  },
];

@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild([])],
  providers: [
    { provide: ApplicationPaths, useClass: ApplicationPaths },
    {
      provide: ROUTES,
      useFactory: buildRoutes,
      deps: [ApplicationPaths],
      multi: true,
    },
  ],
})
export class AdminModule {}
