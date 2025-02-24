import { create } from "zustand";
import { GetSuggestionsService } from "../services/suggestion.service";
import { useAuth } from "./useAuth";
import { ProductPreview, ProductQuery } from "../services/types";
import {
  SearchProductsService,
  SearchProductsServiceByIds,
} from "../services/products.service";
import {
  DisInterestRatingsService,
  HiddenRatingsService,
} from "../services/rating.service";

interface SuggestionStore {
  productIds: string[];
  latestLike: string[];
  latestDislike: string[];
  load: () => void;
  addLike: (productId: string) => void;
  addDislike: (productId: string) => void;
  addMoreLike: (productIds: string[]) => void;
  addMoreDislike: (productIds: string[]) => void;
  reload(): void;
  timeOutId: number | undefined;

  query: ProductQuery;
  setQuery: (query: ProductQuery) => void;

  data: ProductPreview[];
  page: number;
  page_size: number;
  page_count?: number;
  item_count: number;
  loading: boolean;
  fetch: () => void;
  loadNextPage: () => void;
}

export const useSuggestions = create<SuggestionStore>((set, get) => ({
  productIds: [],
  latestLike: [],
  latestDislike: [],
  query: {
    page: 1,
    page_size: 10,
    is_deleted: false,
  },
  timeOutId: undefined,
  data: [],
  page: 1,
  page_size: 10,
  page_count: undefined,
  item_count: 0,
  loading: false,

  setQuery: (query: ProductQuery) => {
    set({ query: { ...get().query, ...query, page: 1 } });
    get().fetch();
  },
  async fetch() {
    set({ loading: true });
    try {
      if (get().query.keyword || get().query.category_id) {
        const response = await SearchProductsService(get().query);
        set({
          data: response.data,
          page: response.page,
          page_size: response.page_size,
          page_count: response.page_count,
          item_count: response.item_count,
          loading: false,
        });
        get().addMoreLike(response.data.map((item: ProductPreview) => item.id));

        if (get().timeOutId) clearTimeout(get().timeOutId);
        set({
          timeOutId: setTimeout(async () => {
            await HiddenRatingsService(
              response.data.map((item: ProductPreview) => item.id).slice(0, 3),
              2
            );
          }, 5000),
        });

        return;
      } else {
        const response = await SearchProductsServiceByIds(
          get().productIds.slice(0, 10)
        );
        set({
          data: response,
          page: 1,
          page_size: 10,
          page_count: get().productIds.length / 10,
          item_count: get().productIds.length,
          loading: false,
        });
        await DisInterestRatingsService(
          response.data.map((item: ProductPreview) => item.id)
        );
      }
      return;
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
        if (get().query.keyword || get().query.category_id) {
          const response = await SearchProductsService(get().query);

          set({
            data: [...get().data, ...response.data],
            page: response.page,
            page_size: response.page_size,
            page_count: response.page_count,
            item_count: response.item_count,
            loading: false,
          });
          return;
        } else {
          if (page * 10 < get().productIds.length) {
            const response = await SearchProductsServiceByIds(
              get().productIds.slice(page * 10, (page + 1) * 10)
            );
            set({
              data: [...get().data, ...response],
              page: get().page + 1,
              page_size: 10,
              page_count: get().productIds.length / 10,
              item_count: get().productIds.length,
              loading: false,
            });
            await DisInterestRatingsService(
              response.data.map((item: ProductPreview) => item.id)
            );
          }
        }
      } catch (error) {
        set({ loading: false });
      }
    }
  },
  async load() {
    const cookie = localStorage.getItem("suggestions");
    const latestLike = localStorage.getItem("latestLike");
    const latestDislike = localStorage.getItem("latestDislike");

    try {
      if (latestLike) set({ latestLike: JSON.parse(latestLike) });
      else set({ latestLike: [] });
    } catch (error) {
      set({ latestLike: [] });
    }
    try {
      if (latestDislike) set({ latestDislike: JSON.parse(latestDislike) });
      else set({ latestDislike: [] });
    } catch (error) {
      set({ latestDislike: [] });
    }

    if (cookie) {
      const { productIds, timeOut } = JSON.parse(cookie);

      if (timeOut > Date.now()) {
        set({ productIds });
        get().fetch();
        return;
      }
      localStorage.removeItem("suggestions");
    }
    const ids = await GetSuggestionsService(
      get().latestLike,
      get().latestDislike
    );
    set({ productIds: ids });
    get().fetch();

    if (useAuth.getState().user) {
      localStorage.setItem(
        "suggestions",
        JSON.stringify({
          productIds: ids,
          timeOut: Date.now() + 1000 * 60 * 60,
        })
      );
    }
  },
  async reload() {
    const ids = await GetSuggestionsService(
      get().latestLike,
      get().latestDislike
    );
    set({ productIds: ids });
    if (useAuth.getState().user) {
      localStorage.setItem(
        "suggestions",
        JSON.stringify({
          productIds: ids,
          timeOut: Date.now() + 1000 * 60 * 60,
        })
      );
    }
  },
  addLike: (productId: string) => {
    set({ latestLike: [...get().latestLike, productId] });
    localStorage.setItem("latestLike", JSON.stringify(get().latestLike));
    get().reload();
  },
  addMoreLike: (productIds: string[]) => {
    let latestLike = [...get().latestLike, ...productIds];
    latestLike = Array.from(new Set(latestLike.slice(-20)));
    set({ latestLike });
    localStorage.setItem("latestLike", JSON.stringify(latestLike));
    get().reload();
  },
  addDislike: (productId: string) => {
    set({ latestDislike: [...get().latestDislike, productId] });
    localStorage.setItem("latestDislike", JSON.stringify(get().latestDislike));
    get().reload();
  },
  addMoreDislike: (productIds: string[]) => {
    let latestDislike = [...get().latestDislike, ...productIds];
    latestDislike = Array.from(new Set(latestDislike.slice(-20)));
    set({ latestDislike });
    localStorage.setItem("latestDislike", JSON.stringify(latestDislike));
    get().reload();
  },
}));
