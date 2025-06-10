import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSchemeSubjectComponent } from './course-scheme-subject.component';

describe('CourseSchemeSubjectComponent', () => {
  let component: CourseSchemeSubjectComponent;
  let fixture: ComponentFixture<CourseSchemeSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseSchemeSubjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseSchemeSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
