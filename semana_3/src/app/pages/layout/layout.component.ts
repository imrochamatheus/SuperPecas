import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";

import { HeaderComponent } from "./../../shared/components/header/header.component";

import { ToastModule } from "primeng/toast";
import { ConfirmationService, MessageService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";

import { NavLink } from "./layout.interfaces";
import { CarsService } from "../../shared/services/cars.service";
import { NavigationService } from "../../shared/services/navigation.service";
import { NotificationService } from "../../shared/services/notification.service";
import { PartsService } from "../../shared/services/parts.service";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [
    RouterLink,
    ToastModule,
    RouterOutlet,
    MatListModule,
    HeaderComponent,
    RouterLinkActive,
    MatSidenavModule,
    ConfirmDialogModule,
  ],
  providers: [
    CarsService,
    PartsService,
    MessageService,
    NavigationService,
    ConfirmationService,
    NotificationService,
  ],
  templateUrl: "./layout.component.html",
  styleUrl: "./layout.component.less",
})
export class LayoutComponent {
  public readonly navLinks: NavLink[] = [
    { label: "Home", path: "" },
    { label: "Carros", path: "cars" },
    { label: "Peças", path: "parts" },
  ];
}
