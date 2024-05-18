import { PaginationProperties } from "./pagination.interfaces";

interface CarCommon {
  nomeModelo: string;
  fabricante: string;
  codigoUnico: string;
}

export interface Car extends CarCommon {
  id: number;
}

export interface CreateCarRequest extends CarCommon {}

export interface CreateCarResponse extends CarCommon {
  id: number;
}

export interface ListCarResponse extends PaginationProperties {
  content: Car[];
}
