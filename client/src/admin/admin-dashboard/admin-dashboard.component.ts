import { Component } from '@angular/core';
import { ApplicationPaths } from 'src/app/app.constants';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  constructor(public appPaths: ApplicationPaths) {}
}
