import { TestBed } from '@angular/core/testing';

import { PaperManagementService } from './paper-management.service';

describe('PaperManagementService', () => {
  let service: PaperManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaperManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
