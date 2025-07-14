<template>
  <main>
    <div class="container">
      <section class="content">
        <direction-block
          class="content__item"
          :name="'Отдаете'"
          :type="'from'"
          :directions="directionStore.cryptoDirections"
          @find-in-block="findInCrypto($event.target.value)"
        ></direction-block>
        <direction-block
          class="content__item"
          v-if="directionStore.bankDirections"
          :name="'Получаете'"
          :type="'to'"
          :directions="directionStore.bankDirections"
          :class="{ loading: directionStore.loadingTo }"
          @find-in-block="findInBanks($event.target.value)"
        ></direction-block>
        <payment-block class="content__item"></payment-block>
      </section>
    </div>
  </main>
</template>
<script setup lang="ts">
import { useDirectionStore } from "#imports";
const directionStore = useDirectionStore();

function findInCrypto(value: string) {
  directionStore.findIncryptoDirections(value);
}
function findInBanks(value: string) {
  directionStore.findInbankDirections(value);
}
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap");
* {
  font-family: "Roboto", sans-serif;
  color: #ffffff;
  margin: 0;
  padding: 0;
  ::-webkit-scrollbar {
    width: 2px;
  }
  ::-webkit-scrollbar-thumb {
    background: #888; /* thumb color */
    border-radius: 6px;
  }
}

*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Убираем стандартные стили списков */
ul,
ol {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Убираем подчеркивание у ссылок */
a {
  text-decoration: none;
  color: inherit;
}

/* Сброс стилей для заголовков */
span,
h1,
h2,
h3,
h4,
h5,
h6 {
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
}
body {
  background-color: #0c0c0c;
}

// Inputs

input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none; /* для поддержки в Safari */
  width: 24px;
  height: 24px;
  border: 2px solid #0060f7;
  border-radius: 0.25rem;
  background-color: #1d1e25;
  cursor: pointer;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  margin: 0;
  &:checked {
    background-color: #0d6efd;
    border-color: #0d6efd;
    //Сюда вытащил стандартный чекбокс с W3 (Опционально картеку заменю попозже)
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e");
  }
  &:active {
    filter: brightness(90%);
  }

  &:hover:not(:disabled) {
    border-color: #0d6efd;
  }

  &:focus {
    border-color: #0d6efd;
    outline: none;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }

  &:disabled {
    filter: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:disabled ~ .checkbox-label {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.content {
  display: flex;
  column-gap: 24px;
  &__item {
    width: calc(33.3333% - 12px);
  }
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.direction.loading .directions-list {
  opacity: 0.3;
}
</style>
