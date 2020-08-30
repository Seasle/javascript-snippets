class EventEmitter {
    /**
     * Создает механизм вызова и добавления пользовательских событий.
     */
    constructor() {
        /**
         * @type Map<string, Set<function (...args): void>>
         * @private
         */
        this.handlers = new Map();
    }

    /**
     * Вызывает событие `name` с переданными аргументами.
     * @param {string} name Название события
     * @param {...any} args Аргументы
     */
    emit(name, ...args) {
        if (this.handlers.has(name)) {
            const handlers = this.handlers.get(name);

            for (let handler of handlers) {
                handler(...args);
            }
        }
    }

    /**
     * Добавляет прослушивание нового события.
     * @param {string} name Название события
     * @param {function (...args): void} handler Функция-обработчик
     */
    on(name, handler) {
        const handlers = this.handlers.has(name) ? this.handlers.get(name) : new Set();

        handlers.add(handler);

        this.handlers.set(name, handlers);
    }
}
