import { TestBed } from '@angular/core/testing';

import { LearningpackageService } from './learningpackage.service';

describe('LearningpackageService', () => {
  let service: LearningpackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningpackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
