import { toast } from "react-toastify";
import { create } from "zustand";
import { UserPreview, UserQuery } from "../services/types";
import {
  BanUserService,
  DeleteUserService,
  SearchUsersService,
  UnbanUserService,
} from "../services/user.service";
import { Actions, DataPagingList } from "./type";

interface UserStore extends DataPagingList<UserPreview>, Actions {
  query: UserQuery;
  setQuery: (query: UserQuery) => void;
  setPage: (page: number) => void;
  ban: (id: string) => void;
  unban: (id: string) => void;
}

export const useUser = create<UserStore>((set, get) => ({
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
  setQuery: (query: UserQuery) => {
    set({ query: { ...get().query, ...query, page: 1 } });
    get().fetch();
  },
  async fetch() {
    set({ loading: true });
    try {
      const response = await SearchUsersService(get().query);
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
        const response = await SearchUsersService(get().query);
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
  add() {},
  update() {},
  async delete(id: string) {
    try {
      await DeleteUserService(id);
      set({
        data: get().data.filter((item) => item.id !== id),
      });
    } catch (error: any) {
      toast.error(JSON.stringify(error.response.data));
      throw error;
    }
  },
  async ban(id: string) {
    try {
      await BanUserService(id);
      set({
        data: get().data.filter((item) => item.id !== id),
      });
    } catch (error: any) {
      toast.error(JSON.stringify(error.response.data));
      throw error;
    }
  },
  async unban(id: string) {
    try {
      await UnbanUserService(id);
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
