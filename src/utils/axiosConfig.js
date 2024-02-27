import axios from "axios";
import { store } from "../redux/store";

// Function to get the user from the Redux store
const getUserFromStore = () => {
  const state = store.getState();
  return state.user.user;
};

const axiosConfig = axios.create({
  baseURL: `${import.meta.env.VITE_API_LINK}/${getUserFromStore()}`,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to update baseURL before each request is sent
axiosConfig.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;

    // Update baseURL based on the current user state before each request
    config.baseURL = `${import.meta.env.VITE_API_LINK}/${getUserFromStore()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosConfig;
