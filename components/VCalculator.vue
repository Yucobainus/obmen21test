<template>
  <div class="calculator">
    <div class="calculator__content">
      <div class="calculator__item calculator-item">
        <div class="calculator-item__header">Отдаете</div>
        <div class="calculator-item__input">
          <input
            type="text"
            name="from"
            id="from"
            v-model.number="fromInput"
            @keyup="onFromInput"
          />
        </div>
        <div class="calculator-item__info">
          <span class="calculator-item__min">
            Мин: {{ directionStore.from?.min }}
            {{ directionStore.from?.currency.toUpperCase() }}
          </span>
          <span class="calculator-item__max">
            Макс: {{ directionStore.from?.max }}
            {{ directionStore.from?.currency.toUpperCase() }}
          </span>
        </div>
      </div>
      <div class="calculator__item calculator-item">
        <div class="calculator-item__header">Получаете</div>
        <div class="calculator-item__input">
          <input type="text" name="to" id="to" :value="exchangeStore.toValue" />
        </div>
        <div class="calculator-item__info">
          <span class="calculator-item__min">
            Мин: {{ directionStore.to?.min }}
            {{ directionStore.to?.currency.toUpperCase() }}
          </span>
          <span class="calculator-item__max">
            Макс: {{ directionStore.to?.max }}
            {{ directionStore.to?.currency.toUpperCase() }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDirectionStore, useExchangeStore } from "#imports";

const exchangeStore = useExchangeStore();
const directionStore = useDirectionStore();

const fromInput = ref<string | number>("0");

function onFromInput(event: any) {
  const val: number = event.target.value.replace(/[^0-9]/g, "");
  if (directionStore.from) {
    if (directionStore.from?.min < val && val > directionStore.from?.max) {
      fromInput.value = val;
      exchangeStore.updateFromValue(+fromInput.value);
    }
  }
}
</script>

<style scoped lang="scss">
.calculator {
  margin-bottom: 25px;
  // .calculator__content

  &__content {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }

  // .calculator__item

  &__item {
  }
}
.calculator-item {
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  // .calculator-item__header

  &__header {
    font-weight: bold;
  }

  // .calculator-item__input

  &__input {
    display: flex;
    input {
      width: 100%;
      background-color: #1d1e25;
      text-align: right;
      padding: 14px 10px;
      border-radius: 7px;
      border: none;
      outline: none;
    }
  }

  // .calculator-item__info

  &__info {
    display: flex;
    justify-content: space-between;
    color: #757981;
    font-size: 15px;
  }

  // .calculator-item__min

  &__min {
    color: #757981;
  }

  // .calculator-item__max

  &__max {
  }
}
</style>
