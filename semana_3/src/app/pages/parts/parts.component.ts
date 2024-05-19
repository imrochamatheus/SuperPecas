import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { HeaderComponent } from "../../shared/components/header/header.component";
import { NavigationService } from "../../shared/services/navigation.service";
import { NotificationService } from "../../shared/services/notification.service";
import { PartsService } from "../../shared/services/parts.service";

@Component({
  selector: "app-parts",
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  providers: [PartsService, NavigationService, NotificationService],
  template: `<router-outlet></router-outlet>`,
})
export class PartsComponent {}
