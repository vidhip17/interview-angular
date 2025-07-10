import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getEmployeesByDept(deptId: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/departments/${deptId}/employees`);
  }

  getEmployeeById(empId: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/employees/${empId}`);
  }

  getAllDept(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/departments`);
  }

  deleteEmployee(empId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/employees/${empId}`);
  }

  downloadEmployeesByDeptReport(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/reports/employees-by-dept`, { responseType: 'blob' });
  }
  
}
