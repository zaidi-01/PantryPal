import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizeService } from 'src/api-authorization/authorize.service';

@Component({
  selector: 'app-home',
  template: '',
})
export class HomeComponent {
  constructor(authorizeService: AuthorizeService, router: Router) {
    authorizeService.isAuthenticated().subscribe((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        router.navigate(['admin']);
      } else {
        router.navigate(['search']);
      }
    });
  }
}
