import { defineStore } from "pinia";
import type { Directions, Direction } from "~/types/api";

export const useDirectionStore = defineStore("directionStore", () => {
  const { fetchDirections, fetchToDirection } = useApi();
  const directions = ref<Directions>([]);
  const bankDirections = ref<Directions>([]);
  const fromDirection = ref<number[]>([]);
  const toDirection = ref<number[]>([]);

  async function loadDirections() {
    const data = await fetchDirections();
    let counter = 0;
    directions.value = data.data.map((direction) => {
      counter++;
      return { ...direction, isCurrent: false, id: counter };
    });
  }
  const cryptoDirections = ref<Directions>([]);
  loadDirections();
  watch(directions, () => {
    let counter = 0;
    cryptoDirections.value = directions.value
      .filter((direction: Direction) => direction.filter[0] === "c")
      .map((direction) => {
        counter++;
        return { ...direction, id: counter };
      });
  });

  function setDirection(ids: number[], type: string, elementId: number) {
    if (type === "to") setToDirection(ids, elementId);
    if (type === "from") setFromDirection(ids, elementId);
  }

  async function setToDirection(ids: number[], elementId: number) {
    if (ids) {
      const toDirectionsIds = await fetchToDirection(ids);
      bankDirections.value = directions.value.filter(
        (direction: Direction) =>
          toDirectionsIds.data.includes(direction.ids[0]) &&
          (direction.filter[0] === "r" || direction.filter[0] === "k")
      );
      cryptoDirections.value = cryptoDirections.value.map(
        (direction: Direction) => {
          return { ...direction, isCurrent: false };
        }
      );
      cryptoDirections.value[
        directions.value.findIndex((dir) => {
          return dir.id === elementId;
        })
      ].isCurrent = true;
    }
  }
  function setFromDirection(ids: number[], elementId: number) {
    if (ids) {
      bankDirections.value = bankDirections.value.map(
        (direction: Direction) => {
          return { ...direction, isCurrent: false };
        }
      );
      bankDirections.value[
        bankDirections.value.findIndex((dir) => {
          console.log(dir.id, elementId);
          return dir.id === elementId;
        })
      ].isCurrent = true;
    }
  }

  return {
    directions,
    cryptoDirections,
    fromDirection,
    toDirection,
    bankDirections,
    setDirection,
  };
});
