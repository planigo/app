import { getToken, removeToken } from "@/helpers/localstorage.helper";
import { useUserStore } from "@/store/user.store";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: 5000,
  headers: {
    Authorization: getToken() ? `Bearer ${getToken()}` : "",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      removeToken();
      useUserStore().setCurrentUser(null);
      window.location.href = "/connexion";
    }
  }
);

export { axiosInstance };
