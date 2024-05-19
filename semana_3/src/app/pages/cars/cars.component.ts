import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-cars",
  standalone: true,
  imports: [RouterOutlet],
  template: "<router-outlet/>",
})
export class CarsComponent {}
