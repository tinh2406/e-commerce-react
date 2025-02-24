import axios from "axios";
import { API_URL } from "./constants";
import { Category, CategoryCreate, CategoryQuery } from "./types";

export const SearchCategoriesService = async (query: CategoryQuery) => {
  const response = await axios.get(`${API_URL}/categories`, {
    params: query,
  });
  return response.data;
};

export const CreateCategoryService = async (data: CategoryCreate) => {
  const response = await axios.post(`${API_URL}/categories`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const UpdateCategoryService = async (
  id: string,
  data: CategoryCreate
) => {
  const response = await axios.put(`${API_URL}/categories/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const DeleteCategoryService = async (id: string) => {
  const response = await axios.delete(`${API_URL}/categories/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const GetCategoryDetailService = async (
  id: string
): Promise<Category> => {
  const response = await axios.get(`${API_URL}/categories/${id}`);
  return response.data;
};
