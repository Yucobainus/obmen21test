import useBaseApi from "~/api/useBaseApi";
import { type Directions } from "~/types/api";
export const useApi = () => {
  const { get, post } = useBaseApi();

  // Get All Directions
  const fetchDirections = async () => {
    return get<Directions>("/calculator");
  };

  const fetchToDirection = async (ids: number[]) => {
    return get<number[]>(`/calculator/from/${ids[0]}`);
  };

  return {
    fetchDirections,
    fetchToDirection,
  };
};

export default useApi;
