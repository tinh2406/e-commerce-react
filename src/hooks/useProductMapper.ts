import { create } from "zustand";
import {
  CreateProductMapperService,
  DeleteProductMapperService,
  SearchProductMappersService,
  UpdateProductMapperService,
} from "../services/product-mapper.service";
import {
  MapperQuery,
  ProductMapper,
  ProductMapperCreate,
} from "../services/types";
import { Actions, DataPagingList } from "./type";
import { toast } from "react-toastify";

interface ProductMapperStore extends DataPagingList<ProductMapper>, Actions {
  query: MapperQuery;
  setQuery: (query: MapperQuery) => void;
  setPage: (page: number) => void;
  add: (productsMapper: ProductMapperCreate) => void;
  update: (id: string, productsMapper: ProductMapperCreate) => void;
  delete: (id: string) => void;
}

export const useProductMapper = create<ProductMapperStore>((set, get) => ({
  data: [],
  page: 1,
  page_size: 10,
  page_count: undefined,
  item_count: 0,
  loading: false,
  query: {
    page: 1,
    page_size: 10,
    is_deleted: false,
  },
  setPage: (page: number) => {
    set({ query: { ...get().query, page } });
    get().fetch();
  },
  setQuery: (query: MapperQuery) => {
    set({ query: { ...get().query, ...query, page: 1 } });
    get().fetch();
  },
  async fetch() {
    set({ loading: true });
    try {
      const response = await SearchProductMappersService(get().query);
      set({
        data: response.data,
        page: response.page,
        page_size: response.page_size,
        page_count: response.page_count,
        item_count: response.item_count,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
    }
  },
  async loadNextPage() {
    const isLoading = get().loading;
    const page = get().page;
    const page_count = get().page_count;
    if (isLoading) return;
    if (page_count && page < page_count) {
      set({ query: { ...get().query, page: page + 1 }, loading: true });

      try {
        const response = await SearchProductMappersService(get().query);
        set({
          data: [...get().data, ...response.data],
          page: response.page,
          page_size: response.page_size,
          page_count: response.page_count,
          item_count: response.item_count,
          loading: false,
        });
      } catch (error) {
        set({ loading: false });
      }
    }
  },
  async add(productMapper: ProductMapperCreate) {
    set({ loading: true });
    try {
      await CreateProductMapperService(productMapper);
      get().fetch();
    } catch (error: any) {
      set({ loading: false });
      toast.error(JSON.stringify(error.response.data));
      throw error;
    }
  },
  async update(id: string, productsMapper: ProductMapperCreate) {
    set({ loading: true });
    try {
      await UpdateProductMapperService(id, productsMapper);
      get().fetch();
    } catch (error: any) {
      set({ loading: false });
      toast.error(JSON.stringify(error.response.data));
      throw error;
    }
  },
  async delete(id: string) {
    set({ loading: true });
    try {
      await DeleteProductMapperService(id);
      get().fetch();
    } catch (error: any) {
      set({ loading: false });
      toast.error(JSON.stringify(error.response.data));
      throw error;
    }
  },
  resetState() {
    set({
      data: [],
      page: 1,
      page_size: 10,
      page_count: undefined,
      item_count: 0,
      loading: false,
      query: {
        page: 1,
        page_size: 10,
      },
    });
  },
}));
