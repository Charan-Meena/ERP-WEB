import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExamSlotsbookComponent } from './modal-exam-slotsbook.component';

describe('ModalExamSlotsbookComponent', () => {
  let component: ModalExamSlotsbookComponent;
  let fixture: ComponentFixture<ModalExamSlotsbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalExamSlotsbookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalExamSlotsbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
