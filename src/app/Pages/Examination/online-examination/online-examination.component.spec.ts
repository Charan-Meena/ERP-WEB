import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineExaminationComponent } from './online-examination.component';

describe('OnlineExaminationComponent', () => {
  let component: OnlineExaminationComponent;
  let fixture: ComponentFixture<OnlineExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineExaminationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
