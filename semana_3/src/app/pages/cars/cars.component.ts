import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { CarsService } from "../../shared/services/cars.service";
import { NavigationService } from "../../shared/services/navigation.service";
import { NotificationService } from "../../shared/services/notification.service";

@Component({
  selector: "app-cars",
  standalone: true,
  imports: [RouterOutlet],
  providers: [CarsService, NavigationService, NotificationService],
  template: "<router-outlet/>",
})
export class CarsComponent {}
