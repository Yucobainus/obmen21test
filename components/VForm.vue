<template>
  <form action="#" class="form" v-if="directionStore.form" @submit="submitFrom">
    <h3 class="form__title">Отправитель</h3>
    <div class="form__inputs">
      <div
        class="form__input"
        v-for="input in directionStore.form?.from.input"
        :key="input.name"
      >
        <base-input
          :bg-color="'#1D1E25'"
          :name="input.name"
          :placeholder="input.receive.placeholder"
          :custom-padding="'20px 0 20px 20px'"
          :regex="input.regex"
          class="form-input"
        >
        </base-input>
      </div>
    </div>
    <h3 class="form__title">Получатель</h3>
    <div class="form__inputs">
      <div
        class="form__input"
        v-for="input in directionStore.form?.to.input"
        :key="input.name"
      >
        <base-input
          :bg-color="'#1D1E25'"
          :name="input.name"
          :placeholder="input.receive.placeholder"
          :custom-padding="'20px 0 20px 20px'"
          :regex="input.regex"
          class="form-input"
        >
        </base-input>
      </div>
    </div>
    <div class="form__license">
      <input type="checkbox" name="license" id="license" />
      <label for="license">
        Я согласен с <a href="#"> обработкой персональных данных </a> и
        <a href="#"> принимаю правила обмена </a>
      </label>
    </div>
    <div class="form__submit">
      <div class="form__submit-icon">
        <img src="../public/payment.svg" alt="payment" />
      </div>
      <input type="submit" value="Перейти к оплате" />
    </div>
    <div class="error-block" v-if="isError">
      <div class="error-block__item" v-for="(error, key) in errors" :key="key">
        <template v-if="key"> {{ key }} : {{ error }} </template>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useDirectionStore, useValidate, useExchangeStore } from "#imports";

const { testRegex } = useValidate();

const directionStore = useDirectionStore();
const exchangeStore = useExchangeStore();

const isError = ref<boolean>(false);
const errors = ref<any>({});
function submitFrom(event: any) {
  event.preventDefault();
  isError.value = false;
  errors.value = {};
  const elements = event.target.elements;

  for (let el of elements) {
    if (el.attributes.regex) {
      let validateInput = testRegex(new RegExp(el.attributes.regex), el.value);
      if (!validateInput.result) {
        isError.value = true;
        errors.value[`${el.value}`] = "Некорректно заполненно поле!";
      }
      if (validateInput.isEmpty) {
        isError.value = true;
        errors.value[`${el.attributes.placeholder.value}`] =
          "Поле обязательно к заполнению!";
      }
    }
    if (el.type === "checkbox") {
      if (!el.checked) {
        isError.value = true;
        errors.value["Примите соглашение обмена"] = "";
      }
    }
  }

  if (exchangeStore.fromValue === 0) {
    errors.value["Нельзя обменять 0"] = "";
  }

  if (!isError) {
    alert("Форма отправлена");
  }
}
</script>

<style lang="scss" scoped>
.form {
  // .form__title
  display: flex;
  flex-direction: column;
  align-items: center;
  &__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  // .form__inputs

  &__inputs {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    margin-bottom: 20px;
  }

  // .form__input

  &__input {
  }

  // .form__license

  &__license {
    font-size: 15px;
    display: flex;
    align-items: center;
    column-gap: 20px;
    margin-bottom: 25px;
    a {
      color: #0060f7;
      &:hover {
        text-decoration: underline;
      }
    }
    label {
      &:hover {
        cursor: pointer;
      }
      color: #8f939b;
      flex-shrink: 4;
    }
  }

  // .form__submit

  &__submit {
    //Тут хотел через псеводэлемент иконку добавить, но почему-то не сработало, не разобрался
    position: relative;
    input[type="submit"] {
      padding: 18.5px 28px 18.5px 58px;
      border-radius: 10px;
      background-color: #0060f7;
      font-size: 16px;
      font-weight: 500;
      border: none;
      &:hover {
        cursor: pointer;
      }
    }
  }
  &__submit-icon {
    display: block;
    position: absolute;
    z-index: 2;
    width: 19px;
    height: 3px;
    top: 20px;
    left: 28px;
  }
}

.error-block {
  display: flex;
  flex-direction: column;
  row-gap: 9px;
  margin-top: 20px;
  &__item {
    font-weight: 700;
    color: rgba(204, 0, 0, 0.842);
  }
}
</style>
