import axios from "axios";

// Base URL API
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Tambahkan Interceptor untuk Request
api.interceptors.request.use(
  (config) => {
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    } else {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Tambahkan Interceptor untuk Response
api.interceptors.response.use(
  (response) => response, // Jika response sukses, langsung dikembalikan
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
