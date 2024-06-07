import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Workday } from '../interfaces/workday.interface';
import { NewWorkday } from '../models/newWorkday';


@Injectable({
  providedIn: 'root'
})
export class WorkdayService {

  private http = inject(HttpClient);

  workdays = signal<Workday[]>([]);

   getWorkdaysCurrentWeek(date: string, idEmployee: number): Observable<Workday[]> {
    let params = new HttpParams()
    .set('date', date)
    .set('idEmployee', idEmployee);
    return this.http.get<Workday[]>('http://localhost:8080/assist-control/v1/workdays-week', {params: params});
   }

   addWorkday(workday: NewWorkday): Observable<Object> {
      return this.http.post('http://localhost:8080/assist-control/v1/workday', workday)
        .pipe(catchError(this.manejoErrores));
   }

   getWorkdayById(idWorkday: number): Observable<Workday>{
      return this.http.get<Workday>(`http://localhost:8080/assist-control/v1/workday/${idWorkday}`);
   }

   deleteWorkdayById(idWorkday: number): Observable<any>{
      return this.http.delete(`http://localhost:8080/assist-control/v1/workday/${idWorkday}`)
        .pipe(catchError(this.manejoErrores));
   }


   private manejoErrores(error: HttpErrorResponse){
    return throwError(() => error.error);
  }


}
