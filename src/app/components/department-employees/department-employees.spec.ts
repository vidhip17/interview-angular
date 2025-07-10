import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentEmployees } from './department-employees';

describe('DepartmentEmployees', () => {
  let component: DepartmentEmployees;
  let fixture: ComponentFixture<DepartmentEmployees>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentEmployees]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentEmployees);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
