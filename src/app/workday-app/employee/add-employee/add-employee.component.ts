import { Component, inject } from '@angular/core';
import { TitleComponent } from '../../../shared/title/title.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { NewEmployee } from '../../../models/newEmployee';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    TitleComponent,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {

  form: FormGroup;
  employee = new NewEmployee();

  employeeService = inject(EmployeeService)
  formBuilder = inject(FormBuilder);
  router =inject(Router);

  initForm(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]], 
    });
  }

  ngOnInit(): void {
    this.form = this.initForm();
  }

  requestNewEmployee(form: FormGroup){
    this.employee.name = form.value.name;
    this.employee.lastName = form.value.lastName;
  } 

  addEmployee(){
    this.requestNewEmployee(this.form);
    this.employeeService.addEmployee(this.employee).subscribe({
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

  reloadSameUrl(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['employee']);
  }

}
