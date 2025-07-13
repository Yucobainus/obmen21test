import useBaseApi from "~/api/useBaseApi";
import { type Directions } from "~/types/api";
import type { ExchangeApiResponse } from "~/types/exchange";
export const useApi = () => {
  const { get, post } = useBaseApi();

  // Get All Directions
  const fetchDirections = async () => {
    return get<Directions>("/api/v1/calculator");
  };

  const fetchFromDirection = async (ids: number[]) => {
    return get<number[]>(`/api/v1/calculator/from/${ids[0]}`);
  };

  const fetchPair = async (from: number, to: number) => {
    return get<ExchangeApiResponse>(`/api/v1/calculator/pair/${from}/${to}`);
  };

  return {
    fetchDirections,
    fetchFromDirection,
    fetchPair,
  };
};

export default useApi;
