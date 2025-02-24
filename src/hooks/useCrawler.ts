import { create } from "zustand";
import { Actions, DataPagingList } from "./type";
import { CrawlerPreview, CrawlerQuery, CrawlerCreate } from "../services/types";
import {
  ActivateCrawlerService,
  CreateCrawlerService,
  DeactivateCrawlerService,
  DeleteCrawlerService,
  SearchCrawlersService,
  UpdateCrawlerService,
} from "../services/crawler.service";
import { toast } from "react-toastify";

interface CrawlerStore extends DataPagingList<CrawlerPreview>, Actions {
  query: CrawlerQuery;
  setQuery: (query: CrawlerQuery) => void;
  setPage: (page: number) => void;
  toggleActive: (id: string, newStatus: boolean) => void;
  add: (crawler: CrawlerCreate) => void;
  update: (id: string, product: CrawlerCreate) => void;
}

export const useCrawler = create<CrawlerStore>((set, get) => ({
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
  setQuery: (query: CrawlerQuery) => {
    set({ query: { ...get().query, ...query, page: 1 } });
    get().fetch();
  },
  async fetch() {
    set({ loading: true });
    try {
      const response = await SearchCrawlersService(get().query);
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
        const response = await SearchCrawlersService(get().query);
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
  async toggleActive(id: string, newStatus: boolean) {
    set((state) => ({
      data: state.data.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      ),
    }));
    try {
      if (newStatus) {
        await ActivateCrawlerService(id);
      } else {
        await DeactivateCrawlerService(id);
      }
    } catch (error) {
      set((state) => ({
        data: state.data.map((item) =>
          item.id === id ? { ...item, enabled: !item.enabled } : item
        ),
      }));
      toast.error("Failed to toggle active status");
    }
  },
  async add(crawler: CrawlerCreate) {
    set({
      data: [
        {
          id: "tempt",
          ...crawler,
          args: "",
          kwargs: "",
          enabled: false,
          last_run_at: "",
          date_changed: "",
          total_run_count: 0,
          expires: crawler.end_time || "",
          ...(crawler.every
            ? {
                crontab: {
                  minute: "0",
                  hour: "0",
                  day_of_week: "*",
                  day_of_month: "*",
                  month_of_year: "*",
                },
              }
            : {
                interval: {
                  every: crawler.cycle_length || 0,
                  period: "minutes",
                },
              }),
        },
        ...get().data,
      ],
    });
    try {
      const res_product = await CreateCrawlerService(crawler);
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
  async update(id: string, crawler: CrawlerCreate) {
    try {
      await UpdateCrawlerService(id, crawler);
      set({
        data: get().data.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              ...crawler,
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
      await DeleteCrawlerService(id);
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
      },
    });
  },
}));
