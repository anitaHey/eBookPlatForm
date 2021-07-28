import { TestBed } from '@angular/core/testing';

import { TextStyleManagementService } from './text-style-management.service';

describe('TextStyleManagementService', () => {
  let service: TextStyleManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextStyleManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
