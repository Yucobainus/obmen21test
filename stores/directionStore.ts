import { defineStore } from "pinia";
import type { Directions, Direction } from "~/types/api";
import type { ExchangeDirection, Structure } from "~/types/exchange";

export const useDirectionStore = defineStore("directionStore", () => {
  const { fetchDirections, fetchFromDirection, fetchPair } = useApi();

  // Состояние хранилища
  const directions = ref<Directions>([]);
  const bankDirections = ref<Directions>([]);
  const cryptoDirections = ref<Directions>([]);
  const fromIds = ref<number[]>([]);
  const toIds = ref<number[]>([]);
  const from = ref<ExchangeDirection>();
  const to = ref<ExchangeDirection>();
  const form = ref<Structure | null>(null);
  const course = ref<number>(0);
  const fromDirectionsIds = ref<number[]>([]);

  // Состояние загрузки и ошибок
  const isFetchError = ref<boolean>(false);
  const loadingTo = ref<boolean>(false);

  // Инициализация направлений
  const initializeDirections = async () => {
    try {
      const { data } = await fetchDirections();
      directions.value = data.map((direction, index) => ({
        ...direction,
        isCurrent: false,
        id: index + 1,
      }));

      // Инициализируем крипто-направления сразу
      cryptoDirections.value = directions.value
        .filter((direction) => direction.filter[0] === "c")
        .map((direction, index) => ({
          ...direction,
          id: index + 1,
        }));
    } catch (error) {
      console.error("Failed to load directions:", error);
      isFetchError.value = true;
    }
  };

  // Загрузка направлений при создании хранилища
  initializeDirections();

  // Установка направления
  const setDirection = (
    ids: number[],
    type: "from" | "to",
    elementId: number
  ) => {
    if (type === "to") {
      setToDirection(ids, elementId);
    } else {
      setFromDirection(ids, elementId);
    }
  };

  // Установка направления "from"
  const setFromDirection = async (ids: number[], elementId: number) => {
    if (!ids?.length) return;

    cleanUp();

    try {
      const { data } = await fetchFromDirection(ids);
      fromDirectionsIds.value = data || [];

      if (fromDirectionsIds.value.length) {
        bankDirections.value = directions.value.filter(
          (direction) =>
            fromDirectionsIds.value.includes(direction.ids[0]) &&
            (direction.filter[0] === "r" || direction.filter[0] === "k")
        );

        // Обновляем состояние isCurrent для крипто-направлений
        cryptoDirections.value = cryptoDirections.value.map((direction) => ({
          ...direction,
          isCurrent: direction.id === elementId,
        }));

        fromIds.value = ids;
      } else {
        bankDirections.value = [];
      }
    } catch (error) {
      console.error("Failed to set from direction:", error);
      isFetchError.value = true;
    }
  };

  // Установка направления "to"
  const setToDirection = (ids: number[], elementId: number) => {
    if (!ids?.length) return;

    bankDirections.value = bankDirections.value.map((direction) => ({
      ...direction,
      isCurrent: direction.id === elementId,
    }));

    toIds.value = ids;
  };

  // Загрузка пары направлений
  watchEffect(async () => {
    if (toIds.value.length && fromIds.value.length) {
      try {
        loadingTo.value = true;
        isFetchError.value = false;

        const { data } = await fetchPair(toIds.value[0], fromIds.value[0]);
        form.value = data.structure;
        from.value = data.from;
        to.value = data.to;
        course.value = data.course;
      } catch (error) {
        isFetchError.value = true;
        console.error("Failed to fetch pair:", error);
      } finally {
        loadingTo.value = false;
      }
    }
  });

  // Очистка состояния
  const cleanUp = () => {
    toIds.value = [];
    fromIds.value = [];
    form.value = null;
    from.value = undefined;
    to.value = undefined;
    course.value = 0;
  };

  // Поиск в крипто-направлениях
  const findInCryptoDirections = (value: string) => {
    if (!value) {
      cryptoDirections.value = directions.value.filter(
        (direction) => direction.filter[0] === "c"
      );
      return;
    }

    const searchTerm = value.toLowerCase();

    cryptoDirections.value = directions.value.filter((direction) => {
      if (direction.filter[0] !== "c") return false;

      return (
        direction.name?.toLowerCase().includes(searchTerm) ||
        direction.currency.some((currency) =>
          currency.toLowerCase().includes(searchTerm)
        )
      );
    });
  };

  // Поиск в банковских направлениях
  const findInBankDirections = (value: string) => {
    if (!value) {
      bankDirections.value = directions.value.filter(
        (direction) =>
          fromDirectionsIds.value.includes(direction.ids[0]) &&
          (direction.filter[0] === "r" || direction.filter[0] === "k")
      );
      return;
    }

    const searchTerm = value.toLowerCase();

    bankDirections.value = directions.value.filter((direction) => {
      const isBankDirection =
        fromDirectionsIds.value.includes(direction.ids[0]) &&
        (direction.filter[0] === "r" || direction.filter[0] === "k");

      if (!isBankDirection) return false;

      return (
        direction.name?.toLowerCase().includes(searchTerm) ||
        direction.currency.some((currency) =>
          currency.toLowerCase().includes(searchTerm)
        )
      );
    });
  };

  return {
    directions,
    cryptoDirections,
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
    findInCryptoDirections,
    findInBankDirections,
  };
});
