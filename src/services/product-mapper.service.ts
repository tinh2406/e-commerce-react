import axios from "axios";
import { API_URL } from "./constants";
import { MapperQuery, ProductMapper, ProductMapperCreate } from "./types";

export const SearchProductMappersService = async (query: MapperQuery) => {
  const response = await axios.get(`${API_URL}/product-mappers`, {
    params: query,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const GetProductMapperDetailService = async (
  id: string
): Promise<ProductMapper> => {
  const response = await axios.get(`${API_URL}/product-mappers/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const CreateProductMapperService = async (data: ProductMapperCreate) => {
  const response = await axios.post(`${API_URL}/product-mappers`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const UpdateProductMapperService = async (
  id: string,
  data: ProductMapperCreate
) => {
  const response = await axios.put(`${API_URL}/product-mappers/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const DeleteProductMapperService = async (id: string) => {
  const response = await axios.delete(`${API_URL}/product-mappers/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};
