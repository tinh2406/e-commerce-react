import { toast } from "react-toastify";
import { create } from "zustand";
import {
  GetProductDetailService,
  LikeProductService,
  SearchWishListService,
  UnlikeProductService,
} from "../services/products.service";
import { ProductPreview } from "../services/types";
import { RealRatingService } from "../services/rating.service";

interface WishListStore {
  data: ProductPreview[];
  loading: boolean;
  add: (productId: string) => Promise<boolean>;
  remove: (productId: string) => Promise<boolean>;
}

export const useWishList = create<WishListStore>((set, get) => ({
  data: [],
  loading: false,

  async fetch() {
    set({ loading: true });
    try {
      const response = await SearchWishListService();
      set({
        data: response.data,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
    }
  },
  async add(productId: string) {
    try {
      await Promise.all([
        LikeProductService(productId),
        RealRatingService(productId, 2),
      ]);
      const res_product = await GetProductDetailService(productId);
      await set({
        data: [...get().data, res_product],
      });
      return true;
    } catch (error: any) {
      toast.error(JSON.stringify(error.response.data));
      return false;
    }
  },

  async remove(id: string) {
    try {
      await Promise.all([UnlikeProductService(id), RealRatingService(id, 0)]);
      set({
        data: get().data.filter((item) => item.id !== id),
      });
      return true;
    } catch (error: any) {
      toast.error(JSON.stringify(error.response.data));
      return false;
    }
  },
}));
