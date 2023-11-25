import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationPaths } from 'src/api-authorization/api-authorization.constants';

@Component({
  selector: 'app-admin-session-indicator',
  templateUrl: './admin-session-indicator.component.html',
  styleUrl: './admin-session-indicator.component.scss',
})
export class AdminSessionIndicatorComponent {
  constructor(private router: Router) {}

  logout() {
    this.router.navigate(ApplicationPaths.LogOutPathComponents, {
      state: { local: true, returnUrl: '/' },
    });
  }
}
