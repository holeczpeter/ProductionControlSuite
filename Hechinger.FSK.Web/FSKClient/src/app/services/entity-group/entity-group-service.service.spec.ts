import { TestBed } from '@angular/core/testing';

import { EntityGroupService } from './entity-group-service.service';

describe('EntityGroupServiceService', () => {
  let service: EntityGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
