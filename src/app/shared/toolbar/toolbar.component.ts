import { Component } from '@angular/core';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { RouterOutlet, RouterModule } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule, 
    MatSidenavModule, 
    MatListModule,
    RouterModule, 
    RouterOutlet
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export default class ToolbarComponent {

  public menuItems = routes
  .map( route => route ?? [] )
  .flat()
  .filter( route => route && route.path )
  .filter( route => !route.path?.includes(':'));

  fillerNav: number[] = [111111111111,2,3,4,5]

}
