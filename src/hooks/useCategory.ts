import { create } from "zustand";
import { Actions, DataPagingList } from "./type";
import { Category, CategoryQuery } from "../services/types";
import {
  CreateCategoryService,
  DeleteCategoryService,
  SearchCategoriesService,
  UpdateCategoryService,
} from "../services/categories.service";
import { toast } from "react-toastify";

interface CategoryStore extends DataPagingList<Category>, Actions {
  setPage: (page: number) => void;
}

export const useCategory = create<CategoryStore>((set, get) => ({
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
  setQuery: (query: CategoryQuery) => {
    set({ query: { ...get().query, ...query, page: 1 } });
    get().fetch();
  },
  async fetch() {
    if (get().loading) return;
    set({ loading: true });
    try {
      const response = await SearchCategoriesService(get().query);
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
        const response = await SearchCategoriesService(get().query);
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
  async add(category: Category) {
    set({
      data: [
        {
          ...category,
          id: "tempt",
        },
        ...get().data,
      ],
    });
    try {
      const res_product = await CreateCategoryService(category);
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
  async update(categoryId: string, category: Category) {
    try {
      await UpdateCategoryService(categoryId, category);
      set({
        data: get().data.map((item) => {
          if (item.id === categoryId) {
            return {
              ...item,
              ...category,
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
  async delete(categoryId: string) {
    try {
      await DeleteCategoryService(categoryId);
      set({
        data: get().data.filter((item) => item.id !== categoryId),
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
