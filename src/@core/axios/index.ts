import axios from "axios";
import { getUserToken } from "../utils/user-storage";

export default axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const protectedAxios = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

protectedAxios.interceptors.request.use((config) => {
  const tokensData = getUserToken();
  config.headers = config.headers || {};
  config.headers.Authorization = `Bearer ${tokensData?.token}`;
  return config;
});
