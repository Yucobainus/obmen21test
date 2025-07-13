import { defineStore } from "pinia";
import { useDirectionStore } from "#imports";

export const useExchangeStore = defineStore("exchangeStore", () => {
  const directionStore = useDirectionStore();
  const fromValue = ref<number>(directionStore.from?.min || 0);
  const toValue = ref<number>(
    +exchange(directionStore.from?.min || 0).toFixed(directionStore.to?.round)
  );
  function exchange(value: number): number {
    if (value) {
      console.log(value);
      return +value * +directionStore.course;
    } else {
      return 0;
    }
  }

  function updateFromValue(value: string | number) {
    fromValue.value = +value;
  }

  watch(fromValue, () => {
    if (fromValue.value) toValue.value = +exchange(fromValue.value).toFixed(8);
  });

  return {
    fromValue,
    toValue,
    exchange,
    updateFromValue,
  };
});
