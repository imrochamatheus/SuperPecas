import { Routes } from '@angular/router';
import { CarsComponent } from './cars.component';

export const carsRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CarsComponent,
    children: [
      {
        path: 'create',
        loadComponent: () =>
          import('./create-car/create-car.component').then(
            (m) => m.CreateCarComponent
          ),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./edit-car/edit-car.component').then(
            (m) => m.EditCarComponent
          ),
      },
    ],
  },
];
