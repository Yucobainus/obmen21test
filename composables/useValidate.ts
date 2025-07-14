interface ValidationResult {
  value: string;
  error: string | false;
  isValid: boolean;
}

export function useValidate() {
  /**
   * Валидация числового ввода с проверкой диапазона
   * @param value - Входная строка для проверки
   * @param min - Минимальное допустимое значение
   * @param max - Максимальное допустимое значение
   * @returns Объект с результатами валидации
   */
  const validateInput = (
    value: string,
    min: number,
    max: number
  ): ValidationResult => {
    // Проверка на пустое значение
    if (value.trim() === "") {
      return {
        value,
        error: "Поле не может быть пустым",
        isValid: false,
      };
    }

    // Проверка на число
    const numValue = Number(value);
    if (isNaN(numValue)) {
      return {
        value,
        error: "Введите корректное число",
        isValid: false,
      };
    }

    // Проверка диапазона
    let error: string | false = false;
    if (numValue < min) {
      error = `Значение не может быть меньше ${min}`;
    } else if (numValue > max) {
      error = `Значение не может быть больше ${max}`;
    }

    return {
      value,
      error,
      isValid: error === false,
    };
  };

  /**
   * Проверка строки по регулярному выражению
   * @param regex - Регулярное выражение для проверки
   * @param str - Строка для проверки
   * @returns Объект с результатами проверки
   */
  const testRegex = (regex: RegExp, str: string) => {
    if (!(regex instanceof RegExp)) {
      throw new TypeError("Первый аргумент должен быть регулярным выражением");
    }

    const isEmpty = str.trim() === "";

    return {
      result: !isEmpty && regex.test(str),
      isEmpty: isEmpty ? "Введите значение" : false,
      isValid: !isEmpty && regex.test(str),
    };
  };

  /**
   * Валидация email
   * @param email - Email для проверки
   * @returns Объект с результатами валидации
   */
  const validateEmail = (email: string): ValidationResult => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { result, isEmpty } = testRegex(emailRegex, email);

    return {
      value: email,
      error: isEmpty || !result ? "Введите корректный email" : false,
      isValid: !isEmpty && result,
    };
  };

  /**
   * Валидация пароля
   * @param password - Пароль для проверки
   * @param minLength - Минимальная длина пароля
   * @returns Объект с результатами валидации
   */
  const validatePassword = (
    password: string,
    minLength = 8
  ): ValidationResult => {
    if (password.trim() === "") {
      return {
        value: password,
        error: "Пароль не может быть пустым",
        isValid: false,
      };
    }

    if (password.length < minLength) {
      return {
        value: password,
        error: `Пароль должен содержать минимум ${minLength} символов`,
        isValid: false,
      };
    }

    return {
      value: password,
      error: false,
      isValid: true,
    };
  };

  return {
    validateInput,
    testRegex,
    validateEmail,
    validatePassword,
  };
}
