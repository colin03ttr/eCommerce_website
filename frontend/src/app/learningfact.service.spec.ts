import { TestBed } from '@angular/core/testing';

import { LearningfactService } from './learningfact.service';

describe('LearningfactService', () => {
  let service: LearningfactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningfactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
