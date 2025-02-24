import { create } from "zustand";
import { Actions, DataPagingList } from "./type";
import {
  MapperQuery,
  ProductsMapper,
  ProductsMapperCreate,
} from "../services/types";
import {
  CreateProductsMappersService,
  DeleteProductsMappersService,
  SearchProductsMappersService,
  UpdateProductsMappersService,
} from "../services/products-mapper.service";
import { toast } from "react-toastify";

interface ProductsMapperStore extends DataPagingList<ProductsMapper>, Actions {
  query: MapperQuery;
  setQuery: (query: MapperQuery) => void;
  setPage: (page: number) => void;
  add: (productsMapper: ProductsMapperCreate) => void;
  update: (id: string, productsMapper: ProductsMapperCreate) => void;
  delete: (id: string) => void;
}

export const useProductsMapper = create<ProductsMapperStore>((set, get) => ({
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
      const response = await SearchProductsMappersService(get().query);
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
        const response = await SearchProductsMappersService(get().query);
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
  async add(productsMapper: ProductsMapperCreate) {
    set({ loading: true });
    try {
      await CreateProductsMappersService(productsMapper);
      get().fetch();
    } catch (error: any) {
      set({ loading: false });
      toast.error(JSON.stringify(error.response.data));
      throw error;
    }
  },
  async update(id: string, productsMapper: ProductsMapperCreate) {
    set({ loading: true });
    try {
      await UpdateProductsMappersService(id, productsMapper);
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
      await DeleteProductsMappersService(id);
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
