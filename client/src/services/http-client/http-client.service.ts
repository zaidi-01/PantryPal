import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

const API_PREFIX = 'api/';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(
    private httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  public get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(this.baseUrl + API_PREFIX + url);
  }

  public post<T>(url: string, body: any): Observable<T> {
    return this.httpClient.post<T>(this.baseUrl + API_PREFIX + url, body);
  }

  public put<T>(url: string, body: any): Observable<T> {
    return this.httpClient.put<T>(this.baseUrl + API_PREFIX + url, body);
  }

  public delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(this.baseUrl + API_PREFIX + url);
  }

  public patch<T>(url: string, body: any): Observable<T> {
    return this.httpClient.patch<T>(this.baseUrl + API_PREFIX + url, body);
  }
}
