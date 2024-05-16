import { Component } from "@angular/core";
import { HeaderComponent } from "../../shared/components/header/header.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-parts",
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: "./parts.component.html",
  styleUrl: "./parts.component.less",
})
export class PartsComponent {}
