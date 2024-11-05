import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { TitleComponent } from '../../../shared/title/title.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewWorkday } from '../../../models/newWorkday';
import { WorkdayService } from '../../../services/workday.service';
import { Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { TimepickerComponent } from '../timepicker/timepicker.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-workday',
  standalone: true,
  imports: [
    TitleComponent,
    TimepickerComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule,
    NgxMatTimepickerModule
  ],
  templateUrl: './add-workday.component.html',
  styleUrl: './add-workday.component.css'
})
export class AddWorkdayComponent implements OnInit{

  workdayService = inject(WorkdayService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);


  form: FormGroup;
  workday = new NewWorkday();

  required: boolean = !1;
  @ViewChild('timepickerIn') timepickerIn: any;
  @ViewChild('timepickerOut') timepickerOut: any;
  formControlItem: FormControl = new FormControl('');


  initForm(): FormGroup {
    return this.formBuilder.group({
      idWorkday: [''],
      codeShift: ['', [Validators.required]],
      date: ['', [Validators.required]], 
      timeOfArrival: ['', [Validators.required]],
      departureTime: ['', [Validators.required]],
      idEmployee: ['']
    });
  }

  ngOnInit(): void {
    this.form = this.initForm();
  }

  getDateFormat(currentDate: Date){
    // Fecha en formato yyyy-mm-dd
    let year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    let day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  requestNewWorkday(form: FormGroup){
    this.workday.codeShift = form.value.codeShift;
    this.workday.date = this.getDateFormat(form.value.date);
    this.workday.timeOfArrival = form.value.timeOfArrival;
    this.workday.departureTime = form.value.departureTime;
    this.workday.idEmployee = form.value.idEmployee;
  }

  addWorkday(){
    this.requestNewWorkday(this.form);
    this.workdayService.addWorkday(this.workday).subscribe({
      next: resp => {
        console.log(resp);
        
      },
      error: error =>{
        console.log(error);
      },
      complete: () =>{
        this.form.reset(this.initForm());
        this.reloadSameUrl();
      }
    })
  }

  reloadSameUrl(){ // -> reactor method
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['dashboard/workdays']);
  }

  openFromIn(timepicker: { open: () => void }) {
    if (!this.formControlItem.disabled) {
      timepicker.open();
    }
  }

  openFromOut(timepicker: { open: () => void }) {
    if (!this.formControlItem.disabled) {
      timepicker.open();
    }
  }


}
