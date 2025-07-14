export function useValidate() {
  const validateInput = (value: string, min: number, max: number) => {
    let error: string | boolean = false;
    // value = value
    //   .replace(/[^\d\.]+/g, " ")
    //   .replace(/(^\.|\.$|\.(?=\.))/g, "")
    //   .trim();

    // Проверка на пустое значение
    if (value === "") {
      return;
    }

    // Проверка, что введено число (разрешены только цифры)
    // if (!/^\d*\.?\d+$/.test(value)) {
    //   error = "Можно вводить только цифры!";
    // }

    const numValue = Number(value);

    // Проверка на минимальное значение
    if (numValue < min) {
      error = `Число не может быть меньше ${min}`;
    }

    // Проверка на максимальное значение
    if (numValue > max) {
      error = `Число не может быть больше ${max}`;
    }
    return {
      value,
      error,
    };
  };

  const testRegex = (regex: RegExp, str: string) => {
    // Проверяем, что первый аргумент действительно регулярное выражение
    if (!(regex instanceof RegExp)) {
      throw new TypeError("Первый аргумент должен быть регулярным выражением");
    }
    return {
      result: regex.test(str),
      isEmpty: str ? false : "Введите значение",
    };
  };
  return { validateInput, testRegex };
}
