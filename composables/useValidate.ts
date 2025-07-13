export function useValidate() {
  const validateInput = (value: string, min: number, max: number) => {
    let error: string | boolean = false;
    value = value.replace(/[^0-9]/g, "");
    // Проверка на пустое значение
    if (value === "") {
      return;
    }

    // Проверка, что введено число (разрешены только цифры)
    if (!/^\d+$/.test(value)) {
      error = "Можно вводить только цифры!";
    }

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
  return { validateInput };
}
