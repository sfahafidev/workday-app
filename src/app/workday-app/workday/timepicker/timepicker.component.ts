import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormControlName } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

@Component({
  selector: 'timepicker-input-component',
  standalone: true,
  imports: [
    MatInputModule,
    NgxMatTimepickerModule
  ],
  templateUrl: './timepicker.component.html',
  styleUrl: './timepicker.component.css'
})
export class TimepickerComponent {

  required: boolean = !1;

  formControlItem: FormControl = new FormControl('');

  @Input({required: true}) labelTitle!: string;
  @Input({required: true}) formControl!: FormControlName;

  @ViewChild('timepicker') timepicker: any;

  /**
   * Lets the user click on the icon in the input.
   */
  openFromIcon(timepicker: { open: () => void }) {
    if (!this.formControlItem.disabled) {
      timepicker.open();
    }
  }

   /**
   * Function to clear FormControl's value, called from the HTML template using the clear button
   *
   * @param $event - The Event's data object
   */
   onClear($event: Event) {
    this.formControlItem.setValue(null);
  }

}
