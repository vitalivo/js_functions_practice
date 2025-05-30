// main.js
function print(iterable) {
    if (iterable instanceof Map) {
        for (let [key, value] of iterable) {
            // Для Map используем console.log
            console.log(`key: ${key}, value: ${value}`);
        }
    } else if (iterable instanceof Set) {
        for (let value of iterable) {
            // Для Set используем console.log
            console.log(`value: ${value}`);
        }
    } else {
        // Для других типов используем console.warn
        console.warn("Функция print ожидает Set или Map.");
    }
}