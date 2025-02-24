import axios, { AxiosRequestConfig } from "axios";
import { API_URL } from "./constants";
import { PasswordUpdate, UserDetail, UserQuery, UserUpdate } from "./types";

export const GetMeService = async (
  config?: AxiosRequestConfig<any>
): Promise<UserDetail> => {
  const response = await axios.get(`${API_URL}/users/me`, {
    ...config,
  });
  return response.data;
};

export const UpdateProfileService = async (data: UserUpdate) => {
  const response = await axios.patch(
    `${API_URL}/users/okechua`,
    {
      ...data,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export const UpdatePasswordService = async (data: PasswordUpdate) => {
  const response = await axios.post(`${API_URL}/users/password`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const SearchUsersService = async (query: UserQuery) => {
  const response = await axios.get(`${API_URL}/users`, {
    params: query,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const DeleteUserService = async (id: string) => {
  const response = await axios.delete(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const RestoreUserService = async (id: string) => {
  const response = await axios.post(
    `${API_URL}/users/${id}/restore`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export const BanUserService = async (id: string) => {
  const response = await axios.post(
    `${API_URL}/users/${id}/ban`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export const UnbanUserService = async (id: string) => {
  const response = await axios.post(
    `${API_URL}/users/${id}/unban`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};
