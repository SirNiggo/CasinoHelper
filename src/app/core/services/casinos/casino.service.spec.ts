import { TestBed } from '@angular/core/testing';

import { CasinoService } from './casino.service';

describe('CasinoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CasinoService = TestBed.get(CasinoService);
    expect(service).toBeTruthy();
  });
});
