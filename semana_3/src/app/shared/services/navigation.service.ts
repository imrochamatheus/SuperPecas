import { Injectable } from "@angular/core";
import { Location } from "@angular/common";

import { Router } from "@angular/router";

@Injectable()
export class NavigationService {
  constructor(
    private readonly _router: Router,
    private readonly _location: Location
  ) {}

  public navigateTo(commands: any[]): void {
    this._router.navigate(commands);
  }

  public goBack(): void {
    this._location.back();
  }
}
