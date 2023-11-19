import { TestBed } from '@angular/core/testing';
import { FridgeService } from './fridge.service';

describe('FridgeService', () => {
  let service: FridgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FridgeService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
