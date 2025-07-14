<template>
  <BaseBlock class="payment">
    <template v-if="!directionStore.isFetchError">
      <v-calculator></v-calculator>
      <VForm></VForm>
    </template>
    <template v-else>
      <div class="fetch-error">
        Произошла ошибка! :( <br />
        Попробуйте другое направление
      </div>
    </template>
  </BaseBlock>
</template>

<script setup lang="ts">
import { useDirectionStore } from "#imports";
const directionStore = useDirectionStore();
</script>

<style lang="scss" scoped>
.payment {
  max-height: 85vh;
  overflow-y: scroll;
  padding: 30px;
}
.fetch-error {
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  color: rgba(204, 0, 0, 0.842);
}
</style>
