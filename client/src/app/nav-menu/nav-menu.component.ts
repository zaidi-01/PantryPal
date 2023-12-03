import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { ApplicationPaths } from '../app.constants';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss',
})
export class NavMenuComponent {
  isExpanded = false;
  isAuthenticated$: Observable<boolean>;

  constructor(
    authorizeService: AuthorizeService,
    public appPaths: ApplicationPaths,
    private router: Router
  ) {
    this.isAuthenticated$ = authorizeService.isAuthenticated();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  navigateToAdmin() {
    this.router.navigate(['/', this.appPaths.admin]);
  }
}
