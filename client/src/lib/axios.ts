import axios from "axios";
import type { AxiosInstance, CreateAxiosDefaults } from "axios";

const BASE_URL =
  import.meta.MODE === "production"
    ? import.meta.env.VITE_API_BASE_URL
    : "/api";
const config: CreateAxiosDefaults = {
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const api: AxiosInstance = axios.create(config);
export default api;
