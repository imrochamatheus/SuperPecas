import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.less',
})
export class CarsComponent {}
