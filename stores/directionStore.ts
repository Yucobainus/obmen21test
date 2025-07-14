import { defineStore } from "pinia";
import type { Directions, Direction } from "~/types/api";
import type { ExchangeDirection, Structure } from "~/types/exchange";

export const useDirectionStore = defineStore("directionStore", () => {
  const { fetchDirections, fetchFromDirection, fetchPair } = useApi();
  const directions = ref<Directions>([]);
  const bankDirections = ref<Directions>([]);
  const fromDirection = ref<number[]>([]);
  const toDirection = ref<number[]>([]);
  const fromIds = ref<number[]>([]);
  const toIds = ref<number[]>([]);
  const from = ref<ExchangeDirection>();
  const to = ref<ExchangeDirection>();
  const form = ref<Structure | null>();
  const course = ref<number>(0);
  const fromDirectionsIds = ref<any>();

  const isFetchError = ref<boolean>(false);

  const loadingTo = ref<boolean>(false);

  const cryptoDirections = ref<Directions>([]);

  async function loadDirections() {
    const data = await fetchDirections();
    let counter = 0;
    directions.value = data.data.map((direction) => {
      counter++;
      return { ...direction, isCurrent: false, id: counter };
    });
  }

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

  async function setFromDirection(ids: number[], elementId: number) {
    if (ids) {
      cleanUp();
      fromDirectionsIds.value = await fetchFromDirection(ids);
      if (fromDirectionsIds.value.data) {
        bankDirections.value = directions.value.filter(
          (direction: Direction) =>
            fromDirectionsIds.value.data.includes(direction.ids[0]) &&
            (direction.filter[0] === "r" || direction.filter[0] === "k")
        );
        cryptoDirections.value = cryptoDirections.value.map(
          (direction: Direction) => {
            return { ...direction, isCurrent: false };
          }
        );
        cryptoDirections.value[
          cryptoDirections.value.findIndex((dir) => {
            return dir.id === elementId;
          })
        ].isCurrent = true;
        fromIds.value = ids;
      } else {
        bankDirections.value = [];
      }
    }
  }
  function setToDirection(ids: number[], elementId: number) {
    if (ids) {
      bankDirections.value = bankDirections.value.map(
        (direction: Direction) => {
          return { ...direction, isCurrent: false };
        }
      );
      bankDirections.value[
        bankDirections.value.findIndex((dir) => {
          return dir.id === elementId;
        })
      ].isCurrent = true;
      toIds.value = ids;
    }
  }
  watchEffect(async () => {
    if (toIds.value.length >= 1 && fromIds.value.length >= 1) {
      try {
        loadingTo.value = true;
        const formData = await fetchPair(toIds.value[0], fromIds.value[0]);
        form.value = formData.data.structure;
        from.value = formData.data.from;
        to.value = formData.data.to;
        course.value = formData.data.course;
        isFetchError.value = false;
      } catch (err) {
        isFetchError.value = true;
        console.error(err);
      } finally {
        loadingTo.value = false;
      }
    }
  });
  function cleanUp() {
    toIds.value = [];
    fromIds.value = [];
    form.value = null;
  }

  function findIncryptoDirections(value: string) {
    if (!value) {
      cryptoDirections.value = directions.value.filter(
        (direction: Direction) => direction.filter[0] === "c"
      );
    }
    cryptoDirections.value = directions.value.filter(function (
      direction: Direction
    ) {
      if (direction.filter[0] === "c") {
        if (direction.name) {
          if (direction.name.toLowerCase().includes(value.toLowerCase())) {
            return true;
          } else {
            let isCurrency = false;
            direction.currency.forEach((currency) => {
              console.log(currency);
              if (currency.toLowerCase().includes(value.toLowerCase()))
                isCurrency = true;
            });
            return isCurrency;
          }
        }
      }
    });
  }

  function findInbankDirections(value: string) {
    if (!value) {
      bankDirections.value = directions.value.filter(
        (direction: Direction) =>
          fromDirectionsIds.value.data.includes(direction.ids[0]) &&
          (direction.filter[0] === "r" || direction.filter[0] === "k")
      );
    }
    bankDirections.value = directions.value.filter(function (
      direction: Direction
    ) {
      if (
        fromDirectionsIds.value.data.includes(direction.ids[0]) &&
        (direction.filter[0] === "r" || direction.filter[0] === "k")
      ) {
        if (direction.name) {
          if (direction.name.toLowerCase().includes(value.toLowerCase())) {
            return true;
          } else {
            let isCurrency = false;
            direction.currency.forEach((currency) => {
              console.log(currency);
              if (currency.toLowerCase().includes(value.toLowerCase()))
                isCurrency = true;
            });
            return isCurrency;
          }
        }
      }
    });
  }

  return {
    directions,
    cryptoDirections,
    fromDirection,
    toDirection,
    bankDirections,
    setDirection,
    fromIds,
    toIds,
    form,
    from,
    to,
    course,
    loadingTo,
    isFetchError,
    findIncryptoDirections,
    findInbankDirections,
  };
});
