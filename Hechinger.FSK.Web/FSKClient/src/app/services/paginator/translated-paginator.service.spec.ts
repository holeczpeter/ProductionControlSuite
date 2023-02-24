import { TestBed } from '@angular/core/testing';

import { TranslatedPaginatorService } from './translated-paginator.service';

describe('TranslatedPaginatorService', () => {
  let service: TranslatedPaginatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslatedPaginatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
