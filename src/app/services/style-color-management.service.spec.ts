import { TestBed } from '@angular/core/testing';

import { StyleColorManagementService } from './style-color-management.service';

describe('StyleColorManagementService', () => {
  let service: StyleColorManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StyleColorManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
