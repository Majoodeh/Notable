import axios from "axios";
import type { AxiosInstance, CreateAxiosDefaults } from "axios";

const config: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
};

const api: AxiosInstance = axios.create(config);
export default api;
