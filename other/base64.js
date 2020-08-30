class Base64 {
    static DICTIONARY = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    static PLACEHOLDER = '=';

    static encode(string) {
        const binary = string.replace(/./g, entry =>
            entry.charCodeAt(0).toString(2).padStart(8, 0)
        );
        const message = binary.replace(
            /.{1,6}/g,
            entry => Base64.DICTIONARY[parseInt(entry.padEnd(6, 0), 2)]
        );

        return message.concat(Base64.PLACEHOLDER.repeat(binary.length % 3));
    }

    static decode(string) {
        const expression = new RegExp(Base64.PLACEHOLDER, 'g');
        const binary = string
            .replace(expression, '')
            .replace(/./g, entry => Base64.DICTIONARY.indexOf(entry).toString(2).padStart(6, 0));
        const message = binary
            .match(/.{8}/g)
            .map(entry => String.fromCharCode(parseInt(entry, 2)))
            .join('');

        return message;
    }
}
