import axios from "axios";
import type { AxiosInstance, CreateAxiosDefaults } from "axios";

const isProduction = import.meta.env.MODE === "production";

const BASE_URL = isProduction ? "/api" : import.meta.env.VITE_API_BASE_URL;
const config: CreateAxiosDefaults = {
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const api: AxiosInstance = axios.create(config);
export default api;
