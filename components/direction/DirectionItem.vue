<template>
  <div
    class="direction-item"
    @click="selectDirection"
    :class="{ active: direction.isCurrent }"
  >
    <div class="direction-item__arrow" v-if="direction.isCurrent">
      <img src="../../public/arrow.svg" alt="arrow" />
    </div>
    <div class="direction-item__content">
      <div class="direction-item__icon">
        <!-- <img src="" alt="arrow" /> -->
      </div>
      <div class="direction-item__description">
        <div class="direction-item__currency">
          <template v-if="type === 'to'">
            {{ direction.currency[0].toUpperCase() }}
          </template>
          <template v-else>
            {{ direction.name }}
          </template>
        </div>
        <div class="direction-item__name" v-if="type === 'to'">
          {{ direction.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Direction } from "~/types/api";
import { useDirectionStore } from "#imports";
const store = useDirectionStore();
interface IProps {
  direction: Direction;
  type: string;
}
function selectDirection() {
  store.setDirection(props.direction.ids, props.type, props.direction.id);
}
const props = defineProps<IProps>();
</script>

<style scoped lang="scss">
.direction-item {
  display: inline-flex;
  align-items: center;
  height: 36px;
  padding: 9px 13px;
  transition: 0.5s;
  border-radius: 8px;
  column-gap: 8px;
  transition: 0.5s;
  &:hover {
    cursor: pointer;
    background-color: #1d1e25;
  }
  &.active {
    background-color: #1d1e25;
  }
  // .direction-item__arrow

  &__arrow {
  }

  // .direction-item__content

  &__content {
    display: flex;
    column-gap: 8px;
  }

  // .direction-item__icon

  &__icon {
  }

  // .direction-item__description

  &__description {
    display: flex;
    flex-direction: column;
    row-gap: 2px;
  }

  // .direction-item__currency

  &__currency {
    font-size: 15px;
    font-weight: 600;
  }

  // .direction-item__name

  &__name {
    color: #757981;
    font-size: 14px;
  }
}
</style>
