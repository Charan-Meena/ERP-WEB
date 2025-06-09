import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrameMasterComponent } from './programe-master.component';

describe('ProgrameMasterComponent', () => {
  let component: ProgrameMasterComponent;
  let fixture: ComponentFixture<ProgrameMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrameMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrameMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
