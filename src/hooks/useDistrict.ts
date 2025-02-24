import { create } from "zustand";
import { District } from "../services/types";
import { SearchDistrictsService } from "../services/address.service";

interface DistrictStore {
  data: District[];
  query: {
    city?: string;
    name?: string;
  };
  fetch: () => Promise<void>;
  get: (id: string) => District | undefined;
}

export const useDistrict = create<DistrictStore>((set, get) => ({
  data: [],
  query: {
    city: "",
    name: "",
  },
  async fetch() {
    const city = get().query.city;
    if (!city) {
      set({ data: [] });
      return;
    }
    const response = await SearchDistrictsService(city, get().query.name);
    set({ data: response });
  },
  get(id: string) {
    return get().data.find((item) => item.id === id);
  },
}));
