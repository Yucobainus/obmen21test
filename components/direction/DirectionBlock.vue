<template>
  <BaseBlock class="direction">
    <div class="direction__info">
      <h3 class="direction__header">
        {{ name }}
      </h3>
      <div class="direction__search">
        <base-input
          :bg-color="'#16171c'"
          :icon="'search.svg'"
          :placeholder="'Поиск валюты'"
          :name="name"
        ></base-input>
      </div>
    </div>
    <div class="direction__list">
      <directions-list :directions="directions" :type="type"></directions-list>
    </div>
  </BaseBlock>
</template>

<script setup lang="ts">
import type { Directions } from "~/types/api";
import DirectionsList from "./DirectionsList.vue";
import BaseBlock from "../Base/BaseBlock.vue";

interface IProps {
  directions: Directions;
  name: string;
  type: string;
}

defineProps<IProps>();
</script>

<style lang="scss">
.direction {
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
}
</style>
