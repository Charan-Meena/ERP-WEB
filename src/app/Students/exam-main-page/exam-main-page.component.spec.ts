import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamMainPageComponent } from './exam-main-page.component';

describe('ExamMainPageComponent', () => {
  let component: ExamMainPageComponent;
  let fixture: ComponentFixture<ExamMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamMainPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
