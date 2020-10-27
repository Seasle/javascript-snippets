/**
 * Выполняет проверку, начинается ли строка со знака минуса.
 * @param {string} value Исходная строка.
 * @returns {boolean}
 */
const startsMinus = value => /^-(.+)?$/g.test(value);

/**
 * Выполняет проверку, является ли числовой разделитель первым в строке.
 * @param {string} value Исходная строка.
 * @returns {boolean}
 */
const firstDelimiter = value => /^\d+\.$/g.test(value);

/**
 * Удаляет из строки все символы не являющиеся числами.
 * @param {string} value Исходная строка.
 */
const removeChars = value => value.replace(/[^0-9]/g, '');

/**
 * Исправляет неверную последовательность нулей в числе.
 * @param {string} value Исходная строка.
 */
const fixNumber = value => {
    if (/[1-9]/g.test(value)) {
        return value.replace(/^0+/g, '');
    } else {
        return value.replace(/^0+$/g, '0');
    }
};

/**
 * Нормализует число.
 * @param {string} value Исходная строка.
 */
const normalize = value => {
    const delimiterPosition = value.indexOf('.');
    if (delimiterPosition !== -1) {
        const integer = removeChars(value.slice(0, delimiterPosition)) || '0';
        const decimal = removeChars(value.slice(delimiterPosition));

        if (startsMinus(value)) {
            return `-${fixNumber(integer)}.${decimal}`;
        } else {
            return `${fixNumber(integer)}.${decimal}`;
        }
    } else {
        if (startsMinus(value)) {
            return `-${fixNumber(removeChars(value))}`;
        } else {
            return fixNumber(removeChars(value));
        }
    }
};

/**
 * Формирует из исходной строки строку, содержащей положительное число с двумя цифрами после запятой.
 * @param {string} value Исходная строка.
 */
export const toNumeric = value => {
    const trimmedValue = value.trim();

    if (!firstDelimiter(value)) {
        const parsedValue = normalize(trimmedValue);

        return parsedValue
    } else {
        return trimmedValue;
    }
};
