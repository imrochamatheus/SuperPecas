import { Routes } from "@angular/router";
import { PartsComponent } from "./parts.component";

export const partsRoutes: Routes = [
  {
    path: "",
    component: PartsComponent,
    children: [
      {
        path: "create",
        loadComponent: () =>
          import("./create-parts/create-parts.component").then(
            (m) => m.CreatePartsComponent
          ),
      },
      {
        path: ":id/edit",
        loadComponent: () =>
          import("./edit-parts/edit-parts.component").then(
            (m) => m.EditPartsComponent
          ),
      },
    ],
  },
];
