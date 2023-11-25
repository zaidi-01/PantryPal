import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ApplicationPaths } from 'src/api-authorization/api-authorization.constants';
import { AuthorizeService } from 'src/api-authorization/authorize.service';

@Component({
  selector: 'app-admin-session-indicator',
  templateUrl: './admin-session-indicator.component.html',
  styleUrl: './admin-session-indicator.component.scss',
})
export class AdminSessionIndicatorComponent {
  @HostBinding('hidden')
  private isHidden = true;

  constructor(private router: Router, authorizeService: AuthorizeService) {
    authorizeService
      .isAuthenticated()
      .pipe(take(1))
      .subscribe((isAuthenticated) => (this.isHidden = !isAuthenticated));
  }

  logout() {
    this.router.navigate(ApplicationPaths.LogOutPathComponents, {
      state: { local: true, returnUrl: '/' },
    });
  }
}
