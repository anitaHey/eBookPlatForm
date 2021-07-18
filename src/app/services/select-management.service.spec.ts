import { TestBed } from '@angular/core/testing';

import { SelectManagementService } from './select-management.service';

describe('SelectManagementService', () => {
  let service: SelectManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
