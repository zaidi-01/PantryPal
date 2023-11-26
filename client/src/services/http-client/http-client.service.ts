import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

const API_PREFIX = 'api/';

/**
 * Service for making HTTP requests.
 */
@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(
    private httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  /**
   * Sends a GET request to the specified URL.
   * @param url - The URL to send the request to.
   * @returns An Observable that emits the response data.
   */
  public get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(this.baseUrl + API_PREFIX + url);
  }

  /**
   * Sends a POST request to the specified URL.
   * @param url - The URL to send the request to.
   * @param body - The request body.
   * @returns An Observable that emits the response data.
   */
  public post<T>(url: string, body: any): Observable<T> {
    return this.httpClient.post<T>(this.baseUrl + API_PREFIX + url, body);
  }

  /**
   * Sends a PUT request to the specified URL.
   * @param url - The URL to send the request to.
   * @param body - The request body.
   * @returns An Observable that emits the response data.
   */
  public put<T>(url: string, body: any): Observable<T> {
    return this.httpClient.put<T>(this.baseUrl + API_PREFIX + url, body);
  }

  /**
   * Sends a DELETE request to the specified URL.
   * @param url - The URL to send the request to.
   * @returns An Observable that emits the response data.
   */
  public delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(this.baseUrl + API_PREFIX + url);
  }

  /**
   * Sends a PATCH request to the specified URL.
   * @param url - The URL to send the request to.
   * @param body - The request body.
   * @returns An Observable that emits the response data.
   */
  public patch<T>(url: string, body: any): Observable<T> {
    return this.httpClient.patch<T>(this.baseUrl + API_PREFIX + url, body);
  }
}
