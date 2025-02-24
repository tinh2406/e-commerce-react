import { create } from "zustand";
import { UserDetail } from "../services/types";
import { LoginService } from "../services/auth.service";
import { GetMeService, UpdateProfileService } from "../services/user.service";
import { useLoading } from "./useLoading";
import { toast } from "react-toastify";

interface AuthState {
  user: UserDetail | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  fetchMe: () => Promise<void>;
  logout: () => void;
  update: (user: Partial<UserDetail>) => void;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  loading: false,
  login: async (email: string, password: string) => {
    set({ loading: true });
    try {
      const response = await LoginService({ email, password });

      set({ user: response.user, token: response.token });
      localStorage.setItem("token", response.token);
      toast.success("Welcome back!");
    } catch (error: any) {
      toast.error(JSON.stringify(error.response.data || error));
    } finally {
      set({ loading: false });
    }
  },
  fetchMe: async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    set({ loading: true });
    useLoading.setState({ isLoading: true });
    try {
      const response = await GetMeService({
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ user: response, token });
    } catch (error) {
      console.error;
    } finally {
      set({ loading: false });
      useLoading.setState({ isLoading: false });
    }
  },
  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("token");
  },
  update: async (user) => {
    set({ loading: true });
    try {
      await UpdateProfileService({ ...get().user, ...user });
      set({ user: { ...get().user, ...user } });
    } catch (error) {
      console.error;
    } finally {
      set({ loading: false });
    }
  },
}));
