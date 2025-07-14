import { defineStore } from "pinia";
import { useDirectionStore } from "#imports";
import { computed, watch } from "vue";

export const useExchangeStore = defineStore("exchangeStore", () => {
  const directionStore = useDirectionStore();

  // Состояние хранилища
  const fromValue = ref<number>(directionStore.from?.min || 0);
  const fromExchangeValue = ref<number>(0);

  // Вычисляемые значения
  const toValue = computed(() => {
    const value = exchange(fromValue.value);
    return roundValue(value, directionStore.to?.roundCalculator);
  });

  // Функция обмена валют
  const exchange = (value: number): number => {
    if (!value || !directionStore.course) return 0;
    return value * directionStore.course;
  };

  // Обратный обмен (из целевой валюты в исходную)
  const exchangeFromCrypto = (value: number): number => {
    if (!value || !directionStore.course) return 0;
    return value / directionStore.course;
  };

  // Обновление значений
  const updateFromValue = (value: string | number) => {
    fromValue.value = Number(value);
  };

  const updateToValue = (value: string | number) => {
    const numericValue = Number(value);
    fromValue.value = roundValue(
      exchangeFromCrypto(numericValue),
      directionStore.from?.roundCalculator
    );
  };

  // Вспомогательная функция для округления
  const roundValue = (value: number, decimals?: number): number => {
    if (decimals === undefined) return value;
    const multiplier = 10 ** decimals;
    return Math.round(value * multiplier) / multiplier;
  };

  // Следим за изменением toValue для обновления fromExchangeValue
  watch(toValue, (newValue) => {
    if (newValue) {
      fromExchangeValue.value = roundValue(
        exchangeFromCrypto(newValue),
        0 // Округляем до целого для fromExchangeValue
      );
    } else {
      fromExchangeValue.value = 0;
    }
  });

  return {
    fromValue,
    toValue,
    fromExchangeValue,
    exchange,
    exchangeFromCrypto,
    updateFromValue,
    updateToValue,
  };
});
