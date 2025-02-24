import axios from "axios";
import { API_URL } from "./constants";
import { MapperQuery, ProductsMapper, ProductsMapperCreate } from "./types";

export const SearchProductsMappersService = async (query: MapperQuery) => {
  const response = await axios.get(`${API_URL}/products-mappers`, {
    params: query,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const GetProductsMappersDetailService = async (
  id: string
): Promise<ProductsMapper> => {
  const response = await axios.get(`${API_URL}/products-mappers/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const CreateProductsMappersService = async (
  data: ProductsMapperCreate
) => {
  const response = await axios.post(`${API_URL}/products-mappers`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const UpdateProductsMappersService = async (
  id: string,
  data: ProductsMapperCreate
) => {
  const response = await axios.put(`${API_URL}/products-mappers/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const DeleteProductsMappersService = async (id: string) => {
  const response = await axios.delete(`${API_URL}/products-mappers/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};
