<template>
  <main>
    <div class="container">
      <section class="content">
        <direction-block
          :name="'Отдаете'"
          :type="'to'"
          :directions="store.cryptoDirections"
        ></direction-block>
        <direction-block
          v-if="store.bankDirections"
          :name="'Получаете'"
          :type="'from'"
          :directions="store.bankDirections"
        ></direction-block>
      </section>
    </div>
  </main>
</template>
<script setup lang="ts">
import { useApi } from "#imports";
import type { Directions } from "./types/api";
import { useDirectionStore } from "#imports";
const store = useDirectionStore();

function selectFromDirection(ids: number[]) {
  store.fromDirection = ids;
}
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap");
* {
  font-family: "Roboto", sans-serif;
  color: #ffffff;
  margin: 0;
  padding: 0;
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
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}
body {
  background-color: #0c0c0c;
}

.content {
  display: flex;
  column-gap: 24px;
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
</style>
