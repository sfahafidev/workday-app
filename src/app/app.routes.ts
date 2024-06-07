import { Routes } from '@angular/router';

export const routes: Routes = [


    {
        path: 'workday',
        title: 'Workday',
        loadComponent: () => import('./workday-app/workday/workday.component'),
    },
    {
        path: 'employee',
        title: 'Employee',
        loadComponent: () => import('./workday-app/employee/employee.component'),
    },
    {
        path: '',
        redirectTo: '/workday',
        pathMatch: 'full'
    }

];
