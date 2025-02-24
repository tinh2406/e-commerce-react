import axios from "axios";
import { API_URL } from "./constants";
import { Login, LoginResponse, Register } from "./types";

export const LoginService = async (data: Login): Promise<LoginResponse> => {
  const res = await axios.post(`${API_URL}/login`, data);
  return res.data;
};

export const RegisterService = async (data: Register) => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};

export const ForgotPasswordService = async (data: { email: string }) => {
  const res = await axios.post(`${API_URL}/request_token`, data);
  return res.data;
};

export const ResetPasswordService = async (data: {
  token: string;
  new_password: string;
  re_new_password: string;
}) => {
  const res = await axios.post(`${API_URL}/change_password`, data);
  return res.data;
};
