import { Component, HostBinding, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApplicationPaths } from 'src/api-authorization/api-authorization.constants';
import { AuthorizeService } from 'src/api-authorization/authorize.service';

@Component({
  selector: 'app-admin-session-indicator',
  templateUrl: './admin-session-indicator.component.html',
  styleUrl: './admin-session-indicator.component.scss',
})
export class AdminSessionIndicatorComponent implements OnDestroy {
  @HostBinding('hidden')
  private isHidden = true;

  private destroy$ = new Subject<void>();

  constructor(private router: Router, authorizeService: AuthorizeService) {
    authorizeService
      .isAuthenticated()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isAuthenticated) => (this.isHidden = !isAuthenticated));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout() {
    this.router.navigate(ApplicationPaths.LogOutPathComponents, {
      state: { local: true, returnUrl: '/' },
    });
  }
}
