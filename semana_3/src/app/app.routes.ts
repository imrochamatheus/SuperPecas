import { Routes } from "@angular/router";

import { carsRoutes } from "./pages/cars/cars.routes";
import { partsRoutes } from "./pages/parts/parts.routes";

import { HomeComponent } from "./pages/home/home.component";
import { LayoutComponent } from "./pages/layout/layout.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: LayoutComponent,
    children: [
      {
        path: "",
        component: HomeComponent,
      },
      {
        path: "cars",
        children: carsRoutes,
      },
      {
        path: "parts",
        children: partsRoutes,
      },
    ],
  },
];
