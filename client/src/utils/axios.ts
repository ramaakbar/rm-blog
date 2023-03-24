import Axios from "axios";
import { toast } from "sonner";

export const axios = Axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    if (error.response?.data?.statusCode === 401) return Promise.reject(error);
    toast.error(message);

    return Promise.reject(error);
  }
);
