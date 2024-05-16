import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-parts',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './parts.component.html',
  styleUrl: './parts.component.less',
})
export class PartsComponent {}
