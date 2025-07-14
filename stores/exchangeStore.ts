import { defineStore } from "pinia";
import { useDirectionStore } from "#imports";

export const useExchangeStore = defineStore("exchangeStore", () => {
  const directionStore = useDirectionStore();
  const fromValue = ref<number>(directionStore.from?.min || 0);
  const toValue = ref<number>(
    +exchange(directionStore.from?.min || 0).toFixed(
      directionStore.to?.roundCalculator
    )
  );
  const fromExchangeValue = ref<number>(0);

  function exchange(value: number): number {
    if (value) {
      return +value * +directionStore.course;
    } else {
      return 0;
    }
  }
  function exchangeFromCrypto(value: number): number {
    if (value) {
      return +value * (1 / +directionStore.course);
    } else {
      return 0;
    }
  }

  function updateFromValue(value: string | number) {
    fromValue.value = +value;
  }
  function updateToValue(value: string | number) {
    toValue.value = +value;
  }

  watch(fromValue, () => {
    toValue.value = +exchange(fromValue.value).toFixed(
      directionStore.to?.roundCalculator
    );
  });

  watch(toValue, () => {
    if (toValue.value) {
      fromExchangeValue.value = +exchangeFromCrypto(toValue.value).toFixed(0);
    }
  });

  return {
    fromValue,
    toValue,
    exchange,
    updateFromValue,
    updateToValue,
    fromExchangeValue,
    exchangeFromCrypto,
  };
});
