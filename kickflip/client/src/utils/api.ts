import axios from "axios";
import store from "../features/store";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;
    if (error.response.status === 401 && !prevRequest._retry) {
      prevRequest._retry = true;
      try {
        const { data } = await api.post("/auth/refresh");
        store.dispatch({
          type: "auth/refreshToken",
          payload: data.accessToken,
        });
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;
        prevRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return api(prevRequest);
      } catch (error) {
        store.dispatch({ type: "/auth/logout" });
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
