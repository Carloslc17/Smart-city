import axios from 'axios';

const http = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL || ""}/api`,
});

http.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("authToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

http.interceptors.response.use(
    (res) => res,
    (error) => {
        const url = error.config?.url ?? "";
        const isAuthCall = url.startsWith("/auth/");
        if (error.response?.status === 401 && !isAuthCall) {
      window.dispatchEvent(new Event("auth:unauthorized"));
    }
    return Promise.reject(error);
    }
);

export default http;