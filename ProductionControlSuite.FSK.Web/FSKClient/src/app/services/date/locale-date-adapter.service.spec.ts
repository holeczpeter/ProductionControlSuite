import { TestBed } from '@angular/core/testing';

import { LocaleDateAdapterService } from './locale-date-adapter.service';

describe('LocaleDateAdapterService', () => {
  let service: LocaleDateAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocaleDateAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
