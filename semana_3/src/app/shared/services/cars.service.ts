import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

import { Observable } from "rxjs";

import {
  Car,
  ListCarResponse,
  CreateCarRequest,
  CreateCarResponse,
} from "../../interfaces/cars.interfaces";

import { environment } from "../../../environments/environments";

@Injectable()
export class CarsService {
  private readonly _http: HttpClient = inject(HttpClient);

  public readonly apiUrl: string = environment.apiUrl;
  public readonly baseUrl: string = `${this.apiUrl}/carro`;

  public listCars(): Observable<Car[]> {
    return this._http.get<Car[]>(`${this.baseUrl}/listaTodos`);
  }

  public getCarById(id: string): Observable<Car> {
    return this._http.get<Car>(`${this.baseUrl}/${id}`);
  }

  public listCarsWithPagination(
    page: string,
    size: string
  ): Observable<ListCarResponse> {
    const payload: Record<string, string> = { page, size };

    const url = new URL(`${this.baseUrl}/listaTodosPaginado`);
    const searchParams = new URLSearchParams(payload);

    url.search = searchParams.toString();

    return this._http.get<ListCarResponse>(url.toString());
  }

  public listCarsByTermWithPagination(
    term: string,
    page: string,
    size: string
  ): Observable<ListCarResponse> {
    const payload: Record<string, string> = { page, size };

    const url = new URL(
      `${this.baseUrl}/listaTodosPaginado${term ? "/" + term : ""}`
    );
    const searchParams = new URLSearchParams(payload);
    url.search = searchParams.toString();

    return this._http.get<ListCarResponse>(url.toString());
  }

  public createCar(payload: CreateCarRequest): Observable<CreateCarResponse> {
    return this._http.post<CreateCarResponse>(`${this.baseUrl}`, payload);
  }

  public updateCar(payload: Car): Observable<CreateCarResponse> {
    return this._http.put<CreateCarResponse>(`${this.baseUrl}`, payload);
  }

  public deleteCar(id: string): Observable<void> {
    return this._http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
