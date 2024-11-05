import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { AddWorkdayComponent } from "./add-workday/add-workday.component";
import { Workday } from '../../interfaces/workday.interface';
import { WorkdayService } from '../../services/workday.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../shared/title/title.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-workday',
  standalone: true,
  imports: [
    CommonModule,
    AddWorkdayComponent,
    MatTableModule,
    MatButtonModule,
    RouterModule,
    TitleComponent
  ],
  templateUrl: './workday.component.html',
  styleUrl: './workday.component.css'
})
export default class WorkdayComponent implements OnInit {

  service = inject(WorkdayService);

  workdays = signal<Workday[]>([]);
  totalHours: number = 0;
  date: Date = new Date();
  dateFormater: string;
  currentWeek: string;

  workdayById: Workday;

  displayedColumns: string[] = ['id', 'shift', 'date', 'timeOfArrival', 'departureTime', 'totalHours', 'approved', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(){
    effect(() => {
      this.dataSource.data = this.workdays();
    });
    
  }

  ngOnInit(): void {

    this.dateFormater = this.getDateFormat(this.date);
    this.currentWeek = this.dateFormater;

    this.getWeek(this.dateFormater, 1);
  }

  getDateFormat(currentDate: Date){
    // Fecha en formato yyyy-mm-dd
    let year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    let day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getWeek(date: string, idEmployee: number){

    this.totalHours = 0;

    this.service.getWorkdaysCurrentWeek(date, idEmployee).subscribe(resp => {
      this.workdays.set(resp);
      this.workdays().sort((a, b) => a.totalHours > b.totalHours ? -1 : 1);
      this.workdays().forEach(workday => {
        this.totalHours += workday.totalHours;
      })
    })
  }

  getLastWeek(){
    this.date.setDate(this.date.getDate() - 7);
    this.dateFormater = this.getDateFormat(this.date);
    this.getWeek(this.dateFormater, 1);
  }

  getNextWeek(){
    this.date.setDate(this.date.getDate() + 7);
    this.dateFormater = this.getDateFormat(this.date);
    this.getWeek(this.dateFormater, 1);
  }

  findWorkdayById(idWorkday: number){
    this.service.getWorkdayById(idWorkday).subscribe(resp => {
      this.workdayById = resp;
    })
  }

  editWorkday(idWorkday: number){

  }

  deleteWorkday(idWorkday: number){
    this.service.deleteWorkdayById(idWorkday).subscribe(resp => {
      console.log(resp);
    });
  }

}
