import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelOnlineExamComponent } from './admin-panel-online-exam.component';

describe('AdminPanelOnlineExamComponent', () => {
  let component: AdminPanelOnlineExamComponent;
  let fixture: ComponentFixture<AdminPanelOnlineExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPanelOnlineExamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPanelOnlineExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
