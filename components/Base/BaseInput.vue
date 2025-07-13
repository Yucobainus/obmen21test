<template>
  <div class="base-input">
    <div v-if="icon" class="base-input__icon">
      <img :src="`/${icon}`" alt="input-icon" />
    </div>
    <input
      :style="{ 'background-color': bgColor, padding: customPadding }"
      type="text"
      :name="name"
      :placeholder="placeholder"
    />
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  icon?: string;
  name: string;
  placeholder: string;
  bgColor: string;
  customPadding?: string;
}
withDefaults(defineProps<IProps>(), {
  icon: "",
});
</script>

<style lang="scss" scoped>
.base-input {
  display: flex;
  position: relative;
  input {
    display: block;
    padding: 20px 0 20px 48px;
    color: #757981;
    width: 100%;
    border: none;
    border-radius: 7px;
    outline: none;
  }
  &__icon {
    display: block;
    position: absolute;
    top: 18px;
    left: 17px;
    width: 20px;
    height: 20px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>
