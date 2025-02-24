import { create } from "zustand";
import { SearchProductsServiceByIds } from "../services/products.service";
import { DisInterestRatingsService } from "../services/rating.service";
import { GetSuggestionNearestService } from "../services/suggestion.service";
import { ProductPreview } from "../services/types";

interface SuggestionStore {
  productIds: string[];
  latestLike: string[];
  latestDislike: string[];
  productId: string;

  load: (product_id: string) => void;

  data: ProductPreview[];
  page: number;
  page_size: number;
  query: any;
  setQuery: any;
  page_count?: number;
  item_count: number;
  loading: boolean;
  fetch: () => void;
  loadNextPage: () => void;
}

export const useSuggestionBaseOneProduct = create<SuggestionStore>(
  (set, get) => ({
    productIds: [],
    latestLike: [],
    latestDislike: [],
    query: undefined,
    setQuery: undefined,
    productId: "",
    data: [],
    page: 1,
    page_size: 10,
    page_count: undefined,
    item_count: 0,
    loading: false,

    async load(product_id: string) {
      if (!product_id) return;

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

      const ids = await GetSuggestionNearestService(
        get().latestLike,
        get().latestDislike,
        product_id
      );
      set({ productIds: ids, productId: product_id });
      get().fetch();
    },
    async fetch() {
      if (get().loading || !get().productId) return;

      set({ loading: true });
      try {
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
        set({ loading: true });

        try {
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
        } catch (error) {
          set({ loading: false });
        }
      }
    },
  })
);
