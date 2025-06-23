import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeAdminListComponent } from './college-admin-list.component';

describe('CollegeAdminListComponent', () => {
  let component: CollegeAdminListComponent;
  let fixture: ComponentFixture<CollegeAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollegeAdminListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollegeAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
