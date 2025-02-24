import axios from "axios";
import { API_URL } from "./constants";

export const RealRatingService = async (
  product_id: string,
  rating: 0 | 1 | 2
) => {
  const response = await axios.post(
    `${API_URL}/ratings/${product_id}/real_rating`,
    {
      rating,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export const HiddenRatingService = async (
  product_id: string,
  rating: 0 | 1 | 2
) => {
  const response = await axios.post(
    `${API_URL}/ratings/${product_id}/hidden_rating`,
    {
      rating,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export const HiddenRatingsService = async (
  product_ids: string[],
  rating: 0 | 1 | 2
) => {
  const response = await Promise.all(
    product_ids.map((id) => HiddenRatingService(id, rating))
  );
  return response;
};

export const DisInterestRatingService = async (product_id: string) => {
  const response = await axios.post(
    `${API_URL}/ratings/${product_id}/disinterest_rating`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export const DisInterestRatingsService = async (product_ids: string[]) => {
  const response = await Promise.all(
    product_ids.map((id) => DisInterestRatingService(id))
  );
  return response;
};
