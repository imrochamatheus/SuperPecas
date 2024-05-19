export interface TableColumn<T> {
  key: keyof T;
  label: string;
}

export interface SearchParams {
  term?: string;
  page: string;
  size: string;
}

export interface PaginationConfig {
  last?: boolean;
  first?: boolean;
  size?: number;
  number?: number;
  empty?: boolean;
  totalPages?: number;
  totalElements?: number;
  numberOfElements?: number;
}

export type ConfirmationMessageFn<T> = (item: T) => string;
