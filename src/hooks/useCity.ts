import { create } from "zustand";
import { City } from "../services/types";
import { SearchCitiesService } from "../services/address.service";

interface CityStore {
  data: City[];
  query: {
    name?: string;
  };
  fetch: () => Promise<void>;
  get: (id: string) => City | undefined;
}

export const useCity = create<CityStore>((set, get) => ({
  data: [],
  query: {
    name: "",
  },
  async fetch() {
    const response = await SearchCitiesService(get().query.name);
    set({ data: response });
  },
  get(id: string) {
    return get().data.find((item) => item.id === id);
  },
}));
