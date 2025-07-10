import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../../services/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.css'
})
export class EmployeeDetail implements OnInit  {
  employeeId!: number;
  employee?: Employee;
  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEmployee();
  }

  loadEmployee() {
    this.employeeService.getEmployeeById(this.employeeId).subscribe({
    next: (data) => {
      this.employee = data;
    },
    error: (err) => {
      this.errorMessage = 'Failed to load employee details';
      console.error(err);
    }
  });
  }

  deleteEmployee() {
    if(confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(this.employeeId).subscribe({
        next: () => {
          this.successMessage = 'Employee deleted successfully!';
          setTimeout(() => this.router.navigate(['/']), 1500);
        },
        error: () => {
          this.errorMessage = 'Failed to delete employee';
        }
      });
    }
  }

  goBack() {
  this.router.navigate(['/']);
}
}
