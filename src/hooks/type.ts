export interface DataQuery {
  keyword?: string;
  is_deleted?: boolean;
  created_from?: Date;
  created_to?: Date;
  delete_from?: Date;
  delete_to?: Date;
  order_by?: string;
  order_type?: string;
  page_size?: number;
  page?: number;
}

export interface DataPagingList<T = any> {
  data: T[];
  page: number;
  page_size: number;
  page_count?: number;
  item_count: number;
  loading: boolean;
  query: DataQuery;
}

export interface Action {
  setQuery: (query: DataQuery) => void;
  fetch: () => void;
  loadNextPage: () => void;
}

export interface Actions extends Action {
  add: (newData: any) => void;
  update: (id: string, updatedData: any) => void;
  delete: (id: string) => void;
  resetState: () => void;
}
