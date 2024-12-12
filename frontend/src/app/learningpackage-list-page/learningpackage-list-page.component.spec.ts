import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningpackageListPageComponent } from './learningpackage-list-page.component';

describe('LearningpackageListPageComponent', () => {
  let component: LearningpackageListPageComponent;
  let fixture: ComponentFixture<LearningpackageListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningpackageListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningpackageListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
