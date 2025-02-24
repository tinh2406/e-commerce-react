import { toast } from "react-toastify";
import { create } from "zustand";
import {
  CreateAddressService,
  DeleteAddressService,
  SearchAddressService,
  UpdateAddressService,
} from "../services/address.service";
import { Address, QueryAddress } from "../services/types";

interface AddressStore {
  data: Address[];
  loading: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  fetch: (query: QueryAddress) => Promise<void>;
  add: (address: Address) => Promise<void>;
  update: (id: string, address: Address) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

export const useAddress = create<AddressStore>((set, get) => ({
  data: [],
  loading: false,
  isOpen: false,

  setIsOpen(isOpen: boolean) {
    set({ isOpen });
  },

  async fetch(query: QueryAddress) {
    set({ loading: true });
    try {
      const response = await SearchAddressService(query);
      set({
        data: response.data,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
    }
  },

  async add(address) {
    set({
      data: [
        {
          ...address,
          id: "tempt",
        },
        ...get().data,
      ],
    });
    try {
      const res_address = await CreateAddressService(address);
      set({
        data: get().data.map((item) => {
          if (item.id === "tempt") {
            return res_address;
          }
          return item;
        }),
      });
    } catch (error) {
      set({
        data: get().data.filter((item) => item.id !== "tempt"),
      });
      toast.error(JSON.stringify(error.response.data));
      throw error;
    }
  },
  async update(id: string, address: Address) {
    try {
      await UpdateAddressService(id, address);
      set({
        data: get().data.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              ...address,
            };
          }
          return item;
        }),
      });
    } catch (error) {
      toast.error(JSON.stringify(error.response.data));
      throw error;
    }
  },
  async delete(id: string) {
    try {
      await DeleteAddressService(id);
      set({
        data: get().data.filter((item) => item.id !== id),
      });
    } catch (error) {
      toast.error(JSON.stringify(error.response.data));
      throw error;
    }
  },
  resetState() {
    set({
      data: [],
      loading: false,
    });
  },
}));
