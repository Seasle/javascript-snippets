import { clamp } from '../math/math.js';

export default class Color {
    /**
     * Создает экземпляр класса цвета.
     * @param {number} value HEX код цвета
     *
     * @example
     * new Color(0xff0000) - красный цвет
     */
    constructor(value) {
        this.red = value >> 16;
        this.green = (value - (this.red << 16)) >> 8;
        this.blue = value - ((this.red << 16) + (this.green << 8));
    }

    /**
     * Создает экземпляр класса из трех оттенков.
     * @param {number} red Красный оттенок
     * @param {number} green Зеленый оттенок
     * @param {number} blue Синий оттенок
     */
    static fromRGB(red, green, blue) {
        return new Color(Color.HEX(red, green, blue));
    }

    /**
     * Возвращает 16-ное число на основе трех оттенков.
     * @param {number} red Красный оттенок
     * @param {number} green Зеленый оттенок
     * @param {number} blue Синий оттенок
     */
    static HEX(red, green, blue) {
        return (red << 16) + (green << 8) + blue;
    }

    /**
     * Возвращает осветленный цвет.
     * @param {number} percent Процент осветления
     */
    lighten(percent) {
        return Color.fromRGB(
            Math.round(clamp(0, 255, this.red + this.red * percent)),
            Math.round(clamp(0, 255, this.green + this.green * percent)),
            Math.round(clamp(0, 255, this.blue + this.blue * percent))
        );
    }

    /**
     * Возвращает затемненный цвет.
     * @param {number} percent Процент затемнения
     */
    darken(percent) {
        return Color.fromRGB(
            Math.round(clamp(0, 255, this.red - this.red * percent)),
            Math.round(clamp(0, 255, this.green - this.green * percent)),
            Math.round(clamp(0, 255, this.blue - this.blue * percent))
        );
    }

    /**
     * Возвращает RGB строку цвета.
     */
    toString() {
        return `rgb(${this.red}, ${this.green}, ${this.blue})`;
    }
}
