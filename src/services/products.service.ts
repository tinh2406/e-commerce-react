import axios from "axios";
import { API_URL } from "./constants";
import { ProductCreate, ProductDetail, ProductQuery } from "./types";

export const SearchProductsService = async (query: ProductQuery) => {
  const response = await axios.get(`${API_URL}/products`, {
    params: query,
  });
  return response.data;
};

export const SearchWishListService = async () => {
  const response = await axios.get(`${API_URL}/products/wish_list`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const SearchProductsServiceByIds = async (product_ids: string[]) => {
  const response = await axios.post(`${API_URL}/products/list_by_ids`, {
    product_ids,
  });
  return response.data;
};

export const GetProductDetailService = async (
  id: string
): Promise<ProductDetail> => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

export const CreateProductService = async (data: ProductCreate) => {
  const response = await axios.post(`${API_URL}/products`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const UpdateProductService = async (id: string, data: ProductCreate) => {
  const response = await axios.put(`${API_URL}/products/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const DeleteProductService = async (id: string) => {
  const response = await axios.delete(`${API_URL}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const LikeProductService = async (id: string) => {
  const response = await axios.post(
    `${API_URL}/products/${id}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export const UnlikeProductService = async (id: string) => {
  const response = await axios.delete(`${API_URL}/products/${id}/unlike`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};
