export interface TableColumn<T> {
  key: keyof T;
  label: string;
  formatter?: (value: T) => string;
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

export interface ActionOutput<T> {
  item: T;
  page: string;
  size: string;
}

export type ConfirmationMessageFn<T> = (item: T) => string;
