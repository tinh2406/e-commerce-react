import axios from "axios";
import { API_URL } from "./constants";
import {
  Address,
  AddressCreate,
  City,
  District,
  QueryAddress,
  Ward,
} from "./types";

export const SearchCitiesService = async (name?: string): Promise<City[]> => {
  const response = await axios.get(`${API_URL}/addresses/cities`, {
    params: {
      name,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const SearchDistrictsService = async (
  city: string,
  name?: string
): Promise<District[]> => {
  const response = await axios.get(`${API_URL}/addresses/districts`, {
    params: {
      name,
      city,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const SearchWardsService = async (
  district: string,
  name?: string
): Promise<Ward[]> => {
  const response = await axios.get(`${API_URL}/addresses/wards`, {
    params: {
      name,
      district,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const SearchAddressService = async (query: QueryAddress) => {
  const response = await axios.get(`${API_URL}/addresses`, {
    params: query,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const GetAddressDetailService = async (id: string): Promise<Address> => {
  const response = await axios.get(`${API_URL}/addresses/${id}`);
  return response.data;
};

export const CreateAddressService = async (data: AddressCreate) => {
  const response = await axios.post(`${API_URL}/addresses`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const UpdateAddressService = async (id: string, data: AddressCreate) => {
  const response = await axios.put(`${API_URL}/addresses/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const DeleteAddressService = async (id: string) => {
  const response = await axios.delete(`${API_URL}/addresses/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};
