<template>
  <div class="direction">
    <div class="direction__info">
      <h3 class="direction__header">
        {{ name }}
      </h3>
      <div class="direction__search">
        <input type="text" name="directionName" placeholder="Поиск валюты" />
      </div>
    </div>
    <div class="direction__list">
      <directions-list :directions="directions" :type="type"></directions-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Directions } from "~/types/api";
import DirectionsList from "./DirectionsList.vue";

interface IProps {
  directions: Directions;
  name: string;
  type: string;
}

defineProps<IProps>();
</script>

<style lang="scss">
.direction {
  min-width: 529px;
  ::-webkit-scrollbar {
    width: 2px;
  }
  ::-webkit-scrollbar-thumb {
    background: #888; /* thumb color */
    border-radius: 6px;
  }
  &__info {
    background-color: #1d1e25;
    padding: 30px;
  }

  // .direction__header

  &__header {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 25px;
  }

  // .direction__search

  &__search {
    display: flex;
    position: relative;
    input {
      display: block;
      background-color: #16171c;
      padding: 20px 0 20px 48px;
      color: #757981;
      width: 100%;
      border: none;
      border-radius: 7px;
      outline: none;
    }
    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 18px;
      left: 17px;
      background-image: url(../../public/search.svg);
      width: 20px;
      height: 20px;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }

  // .direction__list

  &__list {
  }
}
</style>
