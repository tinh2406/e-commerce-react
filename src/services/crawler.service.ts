import axios from "axios";
import { API_URL } from "./constants";
import { CrawlerCreate, CrawlerDetail, CrawlerQuery } from "./types";

export const SearchCrawlersService = async (query: CrawlerQuery) => {
  const response = await axios.get(`${API_URL}/crawlers`, {
    params: query,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const GetCrawlerDetailService = async (
  id: string
): Promise<CrawlerDetail> => {
  const response = await axios.get(`${API_URL}/crawlers/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const CreateCrawlerService = async (data: CrawlerCreate) => {
  const response = await axios.post(`${API_URL}/crawlers`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const UpdateCrawlerService = async (id: string, data: CrawlerCreate) => {
  const response = await axios.put(`${API_URL}/crawlers/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const DeleteCrawlerService = async (id: string) => {
  const response = await axios.delete(`${API_URL}/crawlers/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const ActivateCrawlerService = async (id: string) => {
  const response = await axios.post(
    `${API_URL}/crawlers/${id}/activate`,
    null,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};
export const DeactivateCrawlerService = async (id: string) => {
  const response = await axios.post(
    `${API_URL}/crawlers/${id}/deactivate`,
    null,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};
