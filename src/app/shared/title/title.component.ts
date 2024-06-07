import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [],
  template: `
    <h2>{{title}}</h2>
  `,
  styles: ''
})
export class TitleComponent {

  @Input({required: true}) title!: string;

}
