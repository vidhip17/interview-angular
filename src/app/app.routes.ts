import { Routes } from '@angular/router';
// import { DepartmentEmployees } from './components/department-employees/department-employees.component';
import { DepartmentEmployees } from './components/department-employees/department-employees';
import { EmployeeDetail } from './components/employee-detail/employee-detail';

export const routes: Routes = [
    { path: '', component: DepartmentEmployees },
  { path: 'employee/:id', component: EmployeeDetail },
  { path: '**', redirectTo: '' }
];
