import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ROUTES, RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/api-authorization/authorize.guard';
import { ApplicationPaths } from 'src/app/app.constants';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSessionIndicatorComponent } from './admin-session-indicator/admin-session-indicator.component';

const buildRoutes = (appPaths: ApplicationPaths): Routes => [
  {
    path: appPaths.admin,
    component: AdminDashboardComponent,
    pathMatch: 'full',
    canActivate: [authGuard],
  },
];

@NgModule({
  declarations: [AdminDashboardComponent, AdminSessionIndicatorComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule.forChild([]),
  ],
  providers: [
    { provide: ApplicationPaths, useClass: ApplicationPaths },
    {
      provide: ROUTES,
      useFactory: buildRoutes,
      deps: [ApplicationPaths],
      multi: true,
    },
  ],
  exports: [AdminSessionIndicatorComponent],
})
export class AdminModule {}
