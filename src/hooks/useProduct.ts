import { create } from "zustand";
import { Actions, DataPagingList } from "./type";
import { ProductPreview, ProductQuery, ProductCreate } from "../services/types";
import {
  CreateProductService,
  DeleteProductService,
  SearchProductsService,
  UpdateProductService,
} from "../services/products.service";
import { toast } from "react-toastify";

interface ProductStore extends DataPagingList<ProductPreview>, Actions {
  query: ProductQuery;
  setQuery: (query: ProductQuery) => void;
  setPage: (page: number) => void;
}

export const useProduct = create<ProductStore>((set, get) => ({
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
  setQuery: (query: ProductQuery) => {
    set({ query: { ...get().query, ...query, page: 1 } });
    get().fetch();
  },
  async fetch() {
    set({ loading: true });
    try {
      const response = await SearchProductsService(get().query);
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
        const response = await SearchProductsService(get().query);
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
  async add(product: ProductCreate) {
    set({
      data: [
        {
          id: "tempt",
          ...product,
        },
        ...get().data,
      ],
    });
    try {
      const res_product = await CreateProductService(product);
      set({
        data: get().data.map((item) => {
          if (item.id === "tempt") {
            return res_product;
          }
          return item;
        }),
      });
    } catch (error: any) {
      set({
        data: get().data.filter((item) => item.id !== "tempt"),
      });
      toast.error(JSON.stringify(error.response.data));
      throw error;
    }
  },
  async update(id: string, product: ProductCreate) {
    try {
      await UpdateProductService(id, product);
      set({
        data: get().data.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              ...product,
            };
          }
          return item;
        }),
      });
    } catch (error: any) {
      toast.error(JSON.stringify(error.response.data));
      throw error;
    }
  },
  async delete(id: string) {
    try {
      await DeleteProductService(id);
      set({
        data: get().data.filter((item) => item.id !== id),
      });
    } catch (error: any) {
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
        is_deleted: false,
      },
    });
  },
}));
