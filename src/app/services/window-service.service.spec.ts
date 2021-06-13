import { TestBed } from '@angular/core/testing';

import { WindowServiceService } from './window-service.service';

describe('WindowServiceService', () => {
  let service: WindowServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
