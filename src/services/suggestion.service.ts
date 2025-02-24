import axios from "axios";
import { API_URL } from "./constants";

export const GetSuggestionsService = async (
  like: string[],
  dislike: string[]
) => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.post(
      `${API_URL}/suggestions`,
      {
        latest_ratings: [like, dislike],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    const res = await axios.post(`${API_URL}/suggestions`, {
      latest_ratings: [like, dislike],
    });
    return res.data;
  }
};
export const GetSuggestionNearestService = async (
  like: string[],
  dislike: string[],
  productId: string
) => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.post(
      `${API_URL}/suggestions/${productId}/nearest`,
      {
        latest_ratings: [like, dislike],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    const res = await axios.post(
      `${API_URL}/suggestions/${productId}/nearest`,
      {
        latest_ratings: [like, dislike],
      }
    );
    return res.data;
  }
};
