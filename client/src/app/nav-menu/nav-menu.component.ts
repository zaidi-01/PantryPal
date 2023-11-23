import { Component } from '@angular/core';
import { ApplicationPaths } from '../app.constants';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(public appPaths: ApplicationPaths) {}

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
