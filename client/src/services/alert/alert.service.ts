import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Alert } from '@interfaces';
import { Subject, filter } from 'rxjs';

/**
 * Service for displaying alert messages.
 */
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private _alert$ = new Subject<Alert | undefined>();
  private keepAfterRouteChange = false;

  /**
   * Observable that emits alert messages.
   */
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

  /**
   * Clears the current alert message.
   */
  public clear() {
    this._alert$.next(undefined);
  }

  /**
   * Displays a success alert message.
   * @param message The message to display.
   * @param keepAfterRouteChange Whether to keep the alert after a route change. Default is false.
   */
  public success(message: string, keepAfterRouteChange = false) {
    this.alert('success', message, keepAfterRouteChange);
  }

  /**
   * Displays an error alert message.
   * @param message The message to display.
   * @param keepAfterRouteChange Whether to keep the alert after a route change. Default is false.
   */
  public error(message: string, keepAfterRouteChange = false) {
    this.alert('error', message, keepAfterRouteChange);
  }

  /**
   * Displays an info alert message.
   * @param message The message to display.
   * @param keepAfterRouteChange Whether to keep the alert after a route change. Default is false.
   */
  public info(message: string, keepAfterRouteChange = false) {
    this.alert('info', message, keepAfterRouteChange);
  }

  /**
   * Displays a warning alert message.
   * @param message The message to display.
   * @param keepAfterRouteChange Whether to keep the alert after a route change. Default is false.
   */
  public warn(message: string, keepAfterRouteChange = false) {
    this.alert('warning', message, keepAfterRouteChange);
  }

  /**
   * Displays an alert message.
   * @param type The type of alert.
   * @param message The message to display.
   * @param keepAfterRouteChange Whether to keep the alert after a route change. Default is false.
   */
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
