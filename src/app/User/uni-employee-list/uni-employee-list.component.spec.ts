import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniEmployeeListComponent } from './uni-employee-list.component';

describe('UniEmployeeListComponent', () => {
  let component: UniEmployeeListComponent;
  let fixture: ComponentFixture<UniEmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniEmployeeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
