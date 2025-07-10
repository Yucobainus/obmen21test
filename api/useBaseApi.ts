import { API_BASE_URL } from "~/constants/constants";
interface ApiResponse<T> {
  data: T;
  status: number;
  error?: any;
}

export const useBaseApi = () => {
  const config = useRuntimeConfig();

  const get = async <T>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await $fetch<T>(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        params,
      });
      return { data: response, status: 200 };
    } catch (error: any) {
      return { data: null as T, status: error.statusCode, error };
    }
  };

  const post = async <T>(
    endpoint: string,
    body?: any
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await $fetch<T>(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return { data: response, status: 200 };
    } catch (error: any) {
      return { data: null as T, status: error.statusCode, error };
    }
  };

  return {
    get,
    post,
  };
};

export default useBaseApi;
