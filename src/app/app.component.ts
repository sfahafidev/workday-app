import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import ToolbarComponent from './shared/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'workday-app';
}
