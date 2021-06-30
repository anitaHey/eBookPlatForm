import { TestBed } from '@angular/core/testing';

import { FontManagementService } from './font-management.service';

describe('FontManagementService', () => {
  let service: FontManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FontManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
