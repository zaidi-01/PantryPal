import { Component } from '@angular/core';
import { ApplicationPaths } from '../app.constants';
import { Observable } from 'rxjs';
import { AuthorizeService } from 'src/api-authorization/authorize.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent {
  isExpanded = false;
  isAuthenticated$: Observable<boolean>;

  constructor(public appPaths: ApplicationPaths, authorizeService: AuthorizeService) {
    this.isAuthenticated$ = authorizeService.isAuthenticated();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
