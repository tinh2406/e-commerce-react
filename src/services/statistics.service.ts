import axios from "axios";
import { StatisticQuery, StatisticResponse } from "./types";
import { API_URL } from "./constants";

export const ProductStatisticsService = async (
  query: StatisticQuery
): Promise<StatisticResponse> => {
  const res = await axios.get(`${API_URL}/statistics/products`, {
    params: query,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

export const UserStatisticsService = async (
  query: StatisticQuery
): Promise<StatisticResponse> => {
  const res = await axios.get(`${API_URL}/statistics/users`, {
    params: query,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};
