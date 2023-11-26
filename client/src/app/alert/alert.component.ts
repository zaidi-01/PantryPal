import { Component } from '@angular/core';
import { Alert, AlertService } from '@services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  alert$: Observable<Alert | undefined>;

  constructor(alertService: AlertService) {
    this.alert$ = alertService.alert$;
  }
}
