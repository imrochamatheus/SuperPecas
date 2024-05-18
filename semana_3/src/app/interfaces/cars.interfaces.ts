import { PaginationProperties } from "./pagination.interfaces";

interface CarCommon {
  nomeModelo: string;
  fabricante: string;
  codigoUnico: string;
}

export interface Car extends CarCommon {
  id: string;
}

export interface CreateCarRequest extends CarCommon {}

export interface CreateCarResponse extends CarCommon {
  id: string;
}

export interface ListCarResponse extends PaginationProperties {
  content: Car[];
}
