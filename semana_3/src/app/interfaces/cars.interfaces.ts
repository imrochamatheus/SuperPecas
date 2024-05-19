import { PaginationConfig } from "../shared/components/base-list/base-list.interfaces";

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

export interface ListCarResponse extends PaginationConfig {
  content: Car[];
}
