import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSchemeMasterComponent } from './course-scheme-master.component';

describe('CourseSchemeMasterComponent', () => {
  let component: CourseSchemeMasterComponent;
  let fixture: ComponentFixture<CourseSchemeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseSchemeMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseSchemeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
