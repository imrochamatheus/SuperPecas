import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../../environments/environments";
import {
  Part,
  ListPartsResponse,
  CreatePartsRequest,
  CreatePartsResponse,
  TopKCarsWithMostPartsResponse,
} from "../../interfaces/parts.interfaces";

@Injectable({
  providedIn: "root",
})
export class PartsService {
  public readonly apiUrl: string = environment.apiUrl;
  public readonly baseUrl: string = `${this.apiUrl}/peca`;

  constructor(private readonly _http: HttpClient) {}

  public listParts(): Observable<Part[]> {
    return this._http.get<Part[]>(`${this.baseUrl}/listaTodos`);
  }

  public getPartById(id: string): Observable<Part> {
    return this._http.get<Part>(`${this.baseUrl}/${id}`);
  }

  public listPartsWithPagination(
    page: string,
    size: string
  ): Observable<ListPartsResponse> {
    const payload: Record<string, string> = { page, size };

    const url = new URL(`${this.baseUrl}/listaTodosPaginado`);
    const searchParams = new URLSearchParams(payload);

    url.search = searchParams.toString();

    return this._http.get<ListPartsResponse>(url.toString());
  }

  public listPartsByTermWithPagination(
    term: string,
    page: string,
    size: string
  ): Observable<ListPartsResponse> {
    const payload: Record<string, string> = { page, size };

    const url = new URL(
      `${this.baseUrl}/listaTodosPaginado${term ? "/" + term : ""}`
    );
    const searchParams = new URLSearchParams(payload);
    url.search = searchParams.toString();

    return this._http.get<ListPartsResponse>(url.toString());
  }

  public createPart(
    payload: CreatePartsRequest
  ): Observable<CreatePartsResponse> {
    return this._http.post<CreatePartsResponse>(`${this.baseUrl}`, payload);
  }

  public updatePart(payload: Part): Observable<CreatePartsResponse> {
    return this._http.put<CreatePartsResponse>(`${this.baseUrl}`, payload);
  }

  public deletePart(id: string): Observable<void> {
    return this._http.delete<void>(`${this.baseUrl}/${id}`);
  }

  public listTopKCarsWithMostParts(): Observable<
    TopKCarsWithMostPartsResponse[]
  > {
    return this._http.get<TopKCarsWithMostPartsResponse[]>(
      `${this.baseUrl}/listaTop10CarroComMaisPecas`
    );
  }
}
