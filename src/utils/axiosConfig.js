import axios from "axios";
import { store } from "../redux/store";

// Function to get the user from the Redux store
const getUserFromStore = () => {
  const state = store.getState();
  console.log(state.user);
  return state.user.user;
};

const axiosConfig = axios.create({
  baseURL: `${import.meta.env.VITE_API_LINK}/${getUserFromStore()}`,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const updateAxiosBaseUrl = () => {
  axiosConfig.defaults.baseURL = `${
    import.meta.env.VITE_API_LINK
  }/${getUserFromStore()}`;
};

store.subscribe(() => {
  updateAxiosBaseUrl();
});

updateAxiosBaseUrl();

// Interceptor to update baseURL before each request is sent
axiosConfig.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosConfig;
