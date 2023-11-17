import { TestBed } from '@angular/core/testing';

import { FridgeServiceService } from './fridge-service.service';

describe('FridgeServiceService', () => {
  let service: FridgeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FridgeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
