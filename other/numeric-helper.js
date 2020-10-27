const STARTS_MINUS = /^-(.+)?$/g;
const STARTS_ZERO = /^0+/g;
const ENDS_DELIMITER = /^\d+\.$/g;
const ONLY_ZERO = /^0+$/g;
const NON_NUMBERS = /[^0-9]/g;
const NUMBERS_WITHOUT_ZERO = /[1-9]/g;

/**
 * Выполняет проверку, начинается ли строка со знака минуса.
 * @param {string} value Исходная строка.
 * @returns {boolean}
 */
const startsMinus = value => STARTS_MINUS.test(value);

/**
 * Выполняет проверку, является ли числовой разделитель первым в строке.
 * @param {string} value Исходная строка.
 * @returns {boolean}
 */
const firstDelimiter = value => ENDS_DELIMITER.test(value);

/**
 * Удаляет из строки все символы не являющиеся числами.
 * @param {string} value Исходная строка.
 */
const removeChars = value => value.replace(NON_NUMBERS, '');

/**
 * Исправляет неверную последовательность нулей в числе.
 * @param {string} value Исходная строка.
 */
const fixNumber = value => {
    if (NUMBERS_WITHOUT_ZERO.test(value)) {
        return value.replace(STARTS_ZERO, '');
    } else {
        return value.replace(ONLY_ZERO, '0');
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
