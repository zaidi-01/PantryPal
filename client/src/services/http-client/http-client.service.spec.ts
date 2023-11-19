import { TestBed } from '@angular/core/testing';
import { HttpClientService } from './http-client.service';

describe('HttpClientService', () => {
  let service: HttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpClientService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
