import { Routes } from "@angular/router";
import { CarsComponent } from "./cars.component";
import { ListCarComponent } from "./list-car/list-car.component";

export const carsRoutes: Routes = [
  {
    path: "",
    component: CarsComponent,
    children: [
      {
        path: "list",
        component: ListCarComponent,
      },
      {
        path: "create",
        loadComponent: () =>
          import("./create-car/create-car.component").then(
            (m) => m.CreateCarComponent
          ),
      },
      {
        path: ":id/edit",
        loadComponent: () =>
          import("./edit-car/edit-car.component").then(
            (m) => m.EditCarComponent
          ),
      },
    ],
  },
];
