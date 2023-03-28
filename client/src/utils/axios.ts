import Axios from "axios";
import { toast } from "sonner";

export const axios = Axios.create({
  // https://stackoverflow.com/questions/62098417/nextjs-docker-compose-how-to-resolve-container-hostname-client-side
  baseURL: process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    if (
      error.response?.data?.statusCode === 401 &&
      error.response?.config.method === "get"
    )
      return Promise.reject(error);

    toast.error(message);

    return Promise.reject(error);
  }
);
