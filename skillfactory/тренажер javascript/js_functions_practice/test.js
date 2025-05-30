// test.js

// Импортируем функцию print из main.js
// Это предполагает, что 'main.js' находится в той же папке и экспортирует функцию.
// В Node.js, чтобы экспортировать, в main.js вам нужно будет добавить в конце:
// module.exports = { print };
// А здесь тогда: const { print } = require('./main.js');

// Для упрощения, пока что, продублируем функцию здесь

function print(iterable) {
    if (iterable instanceof Map) {
        for (let [key, value] of iterable) {
            console.log(`key: ${key}, value: ${value}`);
        }
    } else if (iterable instanceof Set) {
        for (let value of iterable) {
            console.log(`value: ${value}`);
        }
    } else {
        console.warn("Функция print ожидает Set или Map.");
    }
}


// --- Вспомогательные функции для тестирования (Mocking console) ---
function captureConsoleOutput(callback) {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const logs = [];
    const warns = [];

    // Переопределяем console.log и console.warn, чтобы они записывали вывод
    console.log = (...args) => logs.push(args.join(' '));
    console.warn = (...args) => warns.push(args.join(' '));

    try {
        callback(); // Выполняем функцию, которую хотим протестировать
    } finally {
        // Восстанавливаем оригинальные console.log и console.warn
        console.log = originalLog;
        console.warn = originalWarn;
    }
    return { logs, warns }; // Возвращаем собранный вывод
}

// --- Упрощенный тестовый фреймворк ---
let testCount = 0;
let failCount = 0;

function test(name, testFunction) {
    testCount++;
    try {
        testFunction();
        console.log(`✅ Test PASSED: ${name}`);
    } catch (error) {
        failCount++;
        console.error(`❌ Test FAILED: ${name}`);
        console.error(`  Ошибка: ${error.message}`);
    }
}

// Функция для сравнения двух массивов (например, ожидаемого и реального вывода)
function assertArrayEquals(actual, expected, message) {
    if (actual.length !== expected.length) {
        throw new Error(`${message}: Разная длина массивов. Ожидалось ${expected.length}, получено ${actual.length}.`);
    }
    for (let i = 0; i < actual.length; i++) {
        if (actual[i] !== expected[i]) {
            throw new Error(`${message}: Несоответствие на индексе <span class="math-inline">\{i\}\. Ожидалось '</span>{expected[i]}', получено '${actual[i]}'.`);
        }
    }
}

// --- Запуск всех юнит-тестов ---
console.log('--- Запуск юнит-тестов для функции print ---');

// Тест 1: Проверка вывода для Map (успешный случай)
test('Map: должен корректно выводить пары ключ-значение', () => {
    const testMap = new Map([
        ['a', 1],
        ['b', 'hello'],
        [3, true]
    ]);
    const { logs } = captureConsoleOutput(() => print(testMap));
    assertArrayEquals(logs, [
        'key: a, value: 1',
        'key: b, value: hello',
        'key: 3, value: true'
    ], 'Map output is incorrect');
});

// Тест 2: Проверка вывода для Set (успешный случай)
test('Set: должен корректно выводить значения', () => {
    const testSet = new Set(['x', 10, false]);
    const { logs } = captureConsoleOutput(() => print(testSet));
    assertArrayEquals(logs, [
        'value: x',
        'value: 10',
        'value: false'
    ], 'Set output is incorrect');
});

// Тест 3: Обработка пустого Map (граничный случай)
test('Empty Map: должен корректно обрабатывать пустой Map (без вывода в консоль.log)', () => {
    const emptyMap = new Map();
    const { logs, warns } = captureConsoleOutput(() => print(emptyMap));
    assertArrayEquals(logs, [], 'Empty Map should not log anything');
    assertArrayEquals(warns, [], 'Empty Map should not warn');
});

// Тест 4: Обработка некорректного типа (массив - неуспешный случай)
test('Invalid type (Array): должен выводить предупреждение', () => {
    const testArray = [1, 2, 3];
    const { logs, warns } = captureConsoleOutput(() => print(testArray));
    assertArrayEquals(logs, [], 'Array input should not log anything');
    assertArrayEquals(warns, ['Функция print ожидает Set или Map.'], 'Array input should warn');
});

// Тест 5: Обработка некорректного типа (null - граничный случай)
test('Invalid type (null): должен выводить предупреждение', () => {
    const { logs, warns } = captureConsoleOutput(() => print(null));
    assertArrayEquals(logs, [], 'Null input should not log anything');
    assertArrayEquals(warns, ['Функция print ожидает Set или Map.'], 'Null input should warn');
});


// --- Итоги тестирования ---
console.log('\n--- Итоги тестирования ---');
console.log(`Всего тестов запущено: ${testCount}`);
console.log(`Тестов провалено: ${failCount}`);

if (failCount === 0) {
    console.log('🎉 Все тесты прошли успешно!');
} else {
    console.error('❌ Есть проваленные тесты. Проверьте ошибки выше.');
}