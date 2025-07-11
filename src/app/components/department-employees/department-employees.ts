import { Component } from '@angular/core';
import { Employee, EmployeeService } from '../../services/employee';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-department-employees',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './department-employees.html',
  styleUrl: './department-employees.css'
})
export class DepartmentEmployees {
  deptId = '';
  employees: Employee[] = [];
  errorMessage = '';

  constructor(private employeeService: EmployeeService, private router: Router) {}

  getEmployees() {
    if (!this.deptId) {
      this.errorMessage = 'Please enter Department ID';
      this.employees = [];
      return;
    }
    this.errorMessage = '';
    this.employeeService.getEmployeesByDept(this.deptId).subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
        this.errorMessage = err.error?.message || 'Unknown error occurred';
        this.employees = [];
      }
    });
  }

  downloadEmployeesByDeptReport() {
  this.employeeService.downloadEmployeesByDeptReport().subscribe({
    next: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'employees_by_department.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    },
    error: () => alert('Failed to download report')
  });
}

  goToEmployee(emp: Employee) {
    //  alert('Navigating to: ', `/employee/${emp.id}`);
      console.log('Navigating to: ', `/employee/${emp.id}`);  
    this.router.navigate(['/employee', emp.id]);

  }

}
