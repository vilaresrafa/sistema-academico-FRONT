import axios, { AxiosError } from "axios";
import useAuthStore from "../store/AuthStore";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../util/api";
import type { ResultadoPaginado } from "../interfaces/ResultadoPaginado";

const useApi = <T,>(endpoint: string) => {
  const { logout, setError } = useAuthStore();
  const navigate = useNavigate();

  const api = axios.create({ baseURL: API_URL });

  api.interceptors.request.use(
    (config) => {
      const token = useAuthStore.getState().token;
      if (token) config.headers.set("Authorization", `Bearer ${token}`);
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const status = error.response?.status;
      if (status === 401) {
        logout();
        setError("Necessário estar autenticado para acessar este recurso.");
        navigate("/login");
      } else if (status === 403) {
        setError("Você não tem permissão para acessar este recurso.");
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  const URL = endpoint; // axios baseURL already set to API_URL

  const handleAxiosError = (error: any) => {
    const axiosErr = error as AxiosError<any>;
    const data = axiosErr.response?.data;
    if (data) throw data;
    const status = axiosErr.response?.status;
    throw new Error(`Erro desconhecido - Status code: ${status ?? "?"}`);
  };

  const criar = async (obj: T) => {
    try {
      const response = await api.post(URL, obj);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const alterar = async (obj: T, id?: number | string) => {
    try {
      const target = id ? `${URL}/${id}` : URL;
      const response = await api.put(target, obj);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const listar = async (params?: Record<string, any>) => {
    try {
      const response = await api.get(URL, { params });
      return response.data as T[];
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const remover = async (id: number | string) => {
    try {
      const response = await api.delete(`${URL}/${id}`);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const recuperar = async (id: number | string) => {
    try {
      const response = await api.get(`${URL}/${id}`);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const recuperarComPaginacao = async (
    queryString: Record<string, string>
  ): Promise<ResultadoPaginado<T>> => {
    try {
      const response = await api.get(`${URL}/paginacao`, { params: queryString });
      return response.data;
    } catch (error) {
      return handleAxiosError(error);
    }
  };

  return { criar, alterar, remover, recuperar, listar, recuperarComPaginacao };
};

export default useApi;
