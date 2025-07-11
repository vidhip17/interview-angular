import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Employee, EmployeeService, EmployeeEdit } from '../../services/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-employee-detail',
  imports: [CommonModule,
    RouterModule,
    ReactiveFormsModule],
    standalone: true,
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.css'
})
export class EmployeeDetail implements OnInit  {
  employeeForm!: FormGroup;
  isEdit = false;
  employeeId!: number;
  employee?: Employee;
  employeeEdit?: EmployeeEdit;
  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  // ngOnInit(): void {
  //   this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
  //   this.loadEmployee();
  // }

  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));

    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      position: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      salary: ['', [Validators.required, Validators.min(0), ]],
    });

    this.loadEmployee();
  }

  loadEmployee() {
    this.employeeService.getEmployeeById(this.employeeId).subscribe({
    next: (data) => {
      this.employee = data;
      this.employeeForm.patchValue({
        name: data.name,
        email: data.email,
        position: data.position,
        salary: data.salary
      });
      
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

enableEdit() {
    this.isEdit = true;
  }

  cancelEdit() {
    this.isEdit = false;
    this.employeeForm.patchValue(this.employee!);
  }

  saveEdit() {
    if (this.employeeForm.invalid) return;

    const updatedEmployee: EmployeeEdit = {
      id: this.employeeId,
      ...this.employeeForm.value
    };

    this.employeeService.updateEmployee(this.employeeId, updatedEmployee).subscribe({
      next: () => {
        this.errorMessage = '';
        this.successMessage = 'Employee updated successfully!';
        this.isEdit = false;
        this.loadEmployee();
      },
      error: (err) => {
        if (err.status === 400) {
          if (typeof err.error === 'string') {
            this.errorMessage = err.error;
          } else if (Array.isArray(err.error?.errors)) {
            const errorMessages = err.error.errors
              .map((e: any) => e.defaultMessage || e.message || 'Invalid input')
              .join(', ');
            this.errorMessage = errorMessages;
          } else if (err.error?.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = 'Bad Request - Invalid input.';
          }
        } else {
          this.errorMessage = 'Failed to update employee.';
        }
      }
    });
  }



}
