import axios, { AxiosError } from "axios";
import useAuthStore from "../store/AuthStore";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../util/api";

const useApi = () => {
  const { logout, setError } = useAuthStore();
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: API_URL,
  });

  api.interceptors.request.use(
    (config) => {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        logout();
        setError("Necessário estar autenticado para acessar este recurso.");
        navigate("/login");
      } else if (error.response?.status === 403) {
        setError("Você não tem permissão para acessar este recurso.");
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export default useApi;
