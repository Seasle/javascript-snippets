(() => {
    /********************************
     * Core
     ********************************/
    class Tabs {
        constructor(element) {
            this.element = element;
            this.list = element.querySelector('[data-list]');
            this.buttons = new Map(
                [...element.querySelectorAll('[data-target]')].map(entry => [
                    entry.dataset.target,
                    entry,
                ])
            );
            this.containers = new Map(
                [...element.querySelectorAll('[data-tab]')].map(entry => [entry.dataset.tab, entry])
            );
            this.salt = Math.random().toString(36).slice(2);
            this.current = null;
            this.active = null;

            this.init();
        }

        select(name) {
            const keys = [...this.buttons.keys()];

            for (let [key, button] of this.buttons.entries()) {
                button.setAttribute('aria-selected', key === name);
            }

            for (let [key, container] of this.containers.entries()) {
                if (key === name) {
                    container.removeAttribute('hidden');
                } else {
                    container.setAttribute('hidden', true);
                }
            }

            this.active = keys.indexOf(name);
        }

        init() {
            const keys = [...this.buttons.keys()];

            this.list.setAttribute('role', 'tablist');

            this.list.addEventListener('keydown', event => {
                if (event.code === 'Home') {
                    event.preventDefault();

                    this.buttons.get(keys[0]).focus();
                }

                if (event.code === 'End') {
                    event.preventDefault();

                    this.buttons.get(keys[keys.length - 1]).focus();
                }

                if (event.code === 'ArrowLeft') {
                    event.preventDefault();

                    this.buttons.get(keys[Math.max(0, this.current - 1)]).focus();
                }

                if (event.code === 'ArrowRight') {
                    event.preventDefault();

                    this.buttons.get(keys[Math.min(keys.length - 1, this.current + 1)]).focus();
                }
            });

            for (let [key, button] of this.buttons.entries()) {
                button.setAttribute('tabindex', '0');
                button.setAttribute('id', `button_${this.salt}_${key}`);
                button.setAttribute('role', 'tab');
                button.setAttribute('aria-controls', `container_${this.salt}_${key}`);

                button.addEventListener('click', event => {
                    event.preventDefault();

                    this.select(key);
                });

                button.addEventListener('focus', event => {
                    this.current = keys.indexOf(key);
                });

                button.addEventListener('keypress', event => {
                    if (event.code === 'Enter' || event.code === 'Space') {
                        event.preventDefault();

                        this.select(key);
                    }
                });
            }

            for (let [key, container] of this.containers.entries()) {
                container.setAttribute('id', `container_${this.salt}_${key}`);
                container.setAttribute('role', 'tabpanel');
                container.setAttribute('aria-labelledby', `button_${this.salt}_${key}`);
            }

            this.select(keys[0]);
        }

        static create(element) {
            return new Tabs(element);
        }
    }

    /********************************
     * Initialization
     ********************************/
    const containers = document.querySelectorAll('[data-tabs]');

    for (let container of containers) {
        Tabs.create(container);
    }
})();
