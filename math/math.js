/**
 * Возвращает значение в интервале `[min; max]`.
 * @param {number} min Минимальное значение
 * @param {number} max Максимальное значение
 * @param {number} value Текущеее значение
 */
export const clamp = (min, max, value) => Math.max(min, Math.min(max, value));

/**
 * Нормализует значение.
 * @param {number} min Минимальное значение
 * @param {number} max Максимальное значение
 * @param {number} value Текущее значение
 */
export const normalize = (min, max, value) => (value - min) / (max - min);

/**
 * Интерполирует значение от минимального к максимальному.
 * @param {number} min Минимальное значение
 * @param {number} max Максимальное значние
 * @param {number} value Нормализованное значение (от 0 до 1)
 */
export const lerp = (min, max, value) => (1 - value) * min + value * max;

/**
 * Округляет число с заданной точностью к нижней границе.
 * @param {number} number Число
 * @param {number} precision Точность
 */
export const floor = (number, precision = 0) => {
    const multiplier = Math.pow(10, precision);

    return Math.floor(number * multiplier) / multiplier;
};

/**
 * Округляет число с заданной точностью к верхней границе.
 * @param {number} number Число
 * @param {number} precision Точность
 */
export const ceil = (number, precision = 0) => {
    const multiplier = Math.pow(10, precision);

    return Math.ceil(number * multiplier) / multiplier;
};

/**
 * Округляет число с заданной точностью.
 * @param {number} number Число
 * @param {number} precision Точность
 */
export const round = (number, precision = 0) => {
    const multiplier = Math.pow(10, precision);

    return Math.round(number * multiplier) / multiplier;
};

/**
 * Возвращает случайное число в интервале `[min; max]`.
 * @param {number} min Минимальное число
 * @param {number} max Максимальное число
 */
export const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
