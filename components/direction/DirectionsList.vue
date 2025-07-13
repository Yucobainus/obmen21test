<template>
  <ul class="directions-list">
    <TransitionGroup name="list" tag="ul">
      <li
        v-for="direction in directions"
        :key="direction.ids[0]"
        class="directions-list__item"
      >
        <direction-item :type="type" :direction="direction"></direction-item>
      </li>
    </TransitionGroup>
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
  overflow-x: hidden;
  padding: 25px 25px 25px 25px;
  background-color: #16171c;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  max-height: 68vh;
  overflow-y: scroll;
  // .directions-list__item

  &__item {
  }
}

.list-move, /* применять переход к движущимся элементам */
.list-enter-active,
.list-leave-active {
  transition: all 0.7s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>
