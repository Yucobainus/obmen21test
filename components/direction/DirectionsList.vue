<template>
  <ul class="directions-list">
    <li
      v-for="direction in directions"
      :key="direction.ids[0]"
      class="directions-list__item"
    >
      <direction-item :type="type" :direction="direction"></direction-item>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { type Directions } from "~/types/api";

interface IProps {
  directions: Directions;
  type: string;
}
defineProps<IProps>();
</script>

<style scoped lang="scss">
.directions-list {
  padding: 25px 25px 25px 25px;
  background-color: #16171c;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  max-height: 60vh;
  overflow-y: scroll;
  // .directions-list__item

  &__item {
  }
}
</style>
