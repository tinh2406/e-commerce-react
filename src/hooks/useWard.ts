import { create } from "zustand";
import { Ward } from "../services/types";
import { SearchWardsService } from "../services/address.service";

interface WardStore {
  data: Ward[];
  query: {
    district?: string;
    name?: string;
  };
  fetch: () => Promise<void>;
  get: (id: string) => Ward | undefined;
}

export const useWard = create<WardStore>((set, get) => ({
  data: [],
  query: {
    district: "",
    name: "",
  },
  async fetch() {
    const district = get().query.district;
    if (!district) {
      set({ data: [] });
      return;
    }
    const response = await SearchWardsService(district, get().query.name);
    set({ data: response });
  },
  get(id: string) {
    return get().data.find((item) => item.id === id);
  },
}));
