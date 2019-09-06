import { TestBed } from '@angular/core/testing';

import { SlotsService } from './slots.service';

describe('SlotsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SlotsService = TestBed.get(SlotsService);
    expect(service).toBeTruthy();
  });
});
