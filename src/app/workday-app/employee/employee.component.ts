import { Component, effect, inject, OnInit, signal, ViewChild } from '@angular/core';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../interfaces/employee.interface';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule, 
    RouterModule, 
    AddEmployeeComponent,
    MatSortModule,
    MatTableModule
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export default class EmployeeComponent implements OnInit{

  service = inject(EmployeeService);
  _liveAnnouncer = inject(LiveAnnouncer);

  employees = signal<Employee[]>([]);

  displayedColumns: string[] = ['id', 'name', 'lastName', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(){
    effect(() => {
      this.dataSource.data = this.employees();
    });
    
  }

  ngOnInit(): void {
    this.getEmployees();    
  }

  getEmployees(){
    this.service.getEmployees().subscribe(resp => {
      this.employees.set(resp);      
    })
  }

  editEmployee(idEmployee: number){

  }

  deleteEmployee(idEmployee: number){

  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
