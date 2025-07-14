<template>
  <div class="calculator">
    <div class="calculator__content">
      <div
        class="calculator__item calculator-item"
        v-if="directionStore.fromIds.length >= 1"
      >
        <div class="calculator-item__header">Отдаете</div>
        <div class="calculator-item__input" :class="{ error: fromError }">
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
        <div class="calculator-item__error" v-if="fromError">
          {{ fromError }}
        </div>
      </div>
      <div
        class="calculator__item calculator-item"
        v-if="directionStore.toIds.length >= 1"
      >
        <div class="calculator-item__header">Получаете</div>
        <div class="calculator-item__input">
          <input
            type="text"
            name="to"
            id="to"
            v-model="toInput"
            @keyup="onToInput"
          />
        </div>
        <div class="calculator-item__info">
          <span class="calculator-item__min">
            Мин:
            {{
              exchangeStore
                .exchange(directionStore.from?.min || 0)
                .toFixed(directionStore.to?.roundCalculator)
            }}
            {{ directionStore.to?.currency.toUpperCase() }}
          </span>
          <span class="calculator-item__max">
            Макс:
            {{
              exchangeStore
                .exchange(directionStore.from?.max || 0)
                .toFixed(directionStore.to?.roundCalculator)
            }}
            {{ directionStore.to?.currency.toUpperCase() }}
          </span>
        </div>
        <div class="calculator-item__error" v-if="toError">
          {{ toError }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDirectionStore, useExchangeStore, useValidate } from "#imports";

const exchangeStore = useExchangeStore();
const directionStore = useDirectionStore();
const { validateInput } = useValidate();

const fromInput = ref<string | number>("0");
const fromError = ref<string | boolean>("");

const toInput = ref<string | number>("0");
const toError = ref<string | boolean>("");

watch(
  () => exchangeStore.fromExchangeValue,
  () => {
    fromInput.value = exchangeStore.fromExchangeValue;
  }
);

watch(
  () => exchangeStore.toValue,
  () => {
    toInput.value = exchangeStore.toValue;
  }
);

function onFromInput(event: any) {
  if (directionStore.from) {
    const input = validateInput(
      event.target.value,
      directionStore.from?.min,
      directionStore.from?.max
    );
    if (!input?.error && input?.value) {
      fromInput.value = input?.value;
      fromError.value = "";
      exchangeStore.updateFromValue(fromInput.value);
    } else if (input?.value) {
      fromInput.value = input.value;
      fromError.value = input.error;
    }
  }
}

function onToInput(event: any) {
  if (directionStore.to && directionStore.from) {
    const input = validateInput(
      event.target.value,
      exchangeStore.exchange(directionStore.from?.min),
      exchangeStore.exchange(directionStore.from?.max)
    );
    if (!input?.error && input?.value) {
      toInput.value = input?.value;
      toError.value = "";
      exchangeStore.updateToValue(toInput.value);
    } else if (input?.value) {
      toInput.value = input.value;
      toError.value = input.error;
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
    row-gap: 25px;
  }

  // .calculator__item

  &__item {
  }
}
.calculator-item {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  position: relative;

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
      padding: 13px 9px;
      border-radius: 7px;
      outline: none;
      transition: 0.2s;
      border: 1px solid #1d1e25;
    }
    &.error {
      input {
        border: 1px solid rgb(204, 0, 0);
      }
    }
  }

  // .calculator-item__info

  &__info {
    display: flex;
    justify-content: space-between;
    color: #757981;
    font-size: 15px;
  }

  &__error {
    position: absolute;
    right: 0;
    bottom: -17px;
    transition: 0.5s;
    font-size: 13px;
    color: rgb(204, 0, 0);
  }
}
</style>
