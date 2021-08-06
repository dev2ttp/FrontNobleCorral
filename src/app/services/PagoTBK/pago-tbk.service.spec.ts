import { TestBed } from '@angular/core/testing';

import { PagoTBKService } from './pago-tbk.service';

describe('PagoTBKService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PagoTBKService = TestBed.get(PagoTBKService);
    expect(service).toBeTruthy();
  });
});
