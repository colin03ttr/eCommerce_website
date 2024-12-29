import { TestBed } from '@angular/core/testing';

import { watchService } from './watch.service';

describe('WatchService', () => {
  let service: watchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(watchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
