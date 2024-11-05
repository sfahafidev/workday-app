import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Employee } from '../interfaces/employee.interface';
import { NewEmployee } from '../models/newEmployee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private http = inject(HttpClient);

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>('http://localhost:8080/assist-control/v1/employees');
  }

  addEmployee(employee: NewEmployee): Observable<Object> {
    return this.http.post('http://localhost:8080/assist-control/v1/employee', employee)
      .pipe(catchError(this.manejoErrores));
 }


 private manejoErrores(error: HttpErrorResponse){
  return throwError(() => error.error);
}


}
