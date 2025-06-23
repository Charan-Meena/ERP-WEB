import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeEmployeeListComponent } from './college-employee-list.component';

describe('CollegeEmployeeListComponent', () => {
  let component: CollegeEmployeeListComponent;
  let fixture: ComponentFixture<CollegeEmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollegeEmployeeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollegeEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
