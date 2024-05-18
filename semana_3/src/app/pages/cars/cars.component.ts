import { Component, OnInit, inject } from "@angular/core";
import {
  Router,
  RouterOutlet,
  NavigationEnd,
  ActivatedRoute,
} from "@angular/router";

import { Subject, filter, takeUntil } from "rxjs";

@Component({
  selector: "app-cars",
  standalone: true,
  imports: [RouterOutlet],
  template: "<router-outlet/>",
})
export class CarsComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _destroy$ = new Subject<void>();

  private listenRouterEvents(): void {
    this._router.events
      .pipe(
        takeUntil(this._destroy$),
        filter(
          (value) => value instanceof NavigationEnd && value.url === "/cars"
        )
      )
      .subscribe(this.redirectToList.bind(this));
  }

  private redirectToList(): void {
    this._router.navigate(["list"], {
      relativeTo: this._activatedRoute,
    });
  }

  public ngOnInit(): void {
    this.listenRouterEvents();
  }
}
