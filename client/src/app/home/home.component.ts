import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { ApplicationPaths } from '../app.constants';

@Component({
  selector: 'app-home',
  template: '',
})
export class HomeComponent {
  constructor(
    authorizeService: AuthorizeService,
    router: Router,
    appPaths: ApplicationPaths
  ) {
    authorizeService.isAuthenticated().subscribe((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        router.navigate([`/${appPaths.admin}`]);
      } else {
        router.navigate([`/${appPaths.search}`]);
      }
    });
  }
}
