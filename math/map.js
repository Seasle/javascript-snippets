import { clamp, lerp, normalize } from './math.js';

/**
 * @param {object} data
 * @param {object} data.from
 * @param {number} data.from.min
 * @param {number} data.from.max
 * @param {object} data.to
 * @param {number} data.to.min
 * @param {number} data.to.max
 * @param {number} data.value
 * @param {function (number): number} [data.easing]
 * @param {boolean} [data.clamping]
 */
export const map = ({ from, to, value, easing = value => value, clamping = true }) => {
    const mapped = lerp(to.min, to.max, easing(normalize(from.min, from.max, value)));

    if (clamping) {
        return clamp(to.min, to.max, mapped);
    } else {
        return mapped;
    }
};
