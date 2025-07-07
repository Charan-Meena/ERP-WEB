import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExamSlotsComponent } from './student-exam-slots.component';

describe('StudentExamSlotsComponent', () => {
  let component: StudentExamSlotsComponent;
  let fixture: ComponentFixture<StudentExamSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentExamSlotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentExamSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
