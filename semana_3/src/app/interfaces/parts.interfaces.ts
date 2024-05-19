import { PaginationConfig } from "../shared/components/base-list/base-list.interfaces";

interface PartsCommon {
  nome: string;
  carroId: string;
  descricao: string;
  fabricante: string;
  numeroSerie: string;
  modeloCarro: string;
  carroNomeModelo: string;
  carroFabricante: string;
}

export interface Part extends PartsCommon {
  id: string;
}

export interface CreatePartsRequest extends PartsCommon {}

export interface CreatePartsResponse extends PartsCommon {
  id: string;
}

export interface ListPartsResponse extends PaginationConfig {
  content: Part[];
}
