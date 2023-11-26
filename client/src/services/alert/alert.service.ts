import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject, filter } from 'rxjs';

export interface Alert {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private _alert$ = new Subject<Alert | undefined>();
  private keepAfterRouteChange = false;

  public get alert$() {
    return this._alert$.asObservable();
  }

  constructor(router: Router) {
    router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((_) => {
        if (this.keepAfterRouteChange) {
          this.keepAfterRouteChange = false;
        } else {
          this.clear();
        }
      });
  }

  public clear() {
    this._alert$.next(undefined);
  }

  public success(message: string, keepAfterRouteChange = false) {
    this.alert('success', message, keepAfterRouteChange);
  }

  public error(message: string, keepAfterRouteChange = false) {
    this.alert('error', message, keepAfterRouteChange);
  }

  public info(message: string, keepAfterRouteChange = false) {
    this.alert('info', message, keepAfterRouteChange);
  }

  public warn(message: string, keepAfterRouteChange = false) {
    this.alert('warning', message, keepAfterRouteChange);
  }

  private alert(
    type: Alert['type'],
    message: string,
    keepAfterRouteChange = false
  ) {
    if (!message) {
      throw new Error('Alert message must be defined');
    }

    this.keepAfterRouteChange = keepAfterRouteChange;
    this._alert$.next({ type, message });
  }
}
