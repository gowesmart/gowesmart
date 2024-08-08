import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token") ?? "";
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (["post", "patch", "delete"].includes(config.method)) {
      config.headers.Authorization = `Bearer ${token.replace(/^"(.*)"$/, "$1")}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
