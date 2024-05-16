import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";

import { HeaderComponent } from "./../../shared/components/header/header.component";

import { NavLink } from "./layout.interfaces";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    MatListModule,
    HeaderComponent,
    RouterLinkActive,
    MatSidenavModule,
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
