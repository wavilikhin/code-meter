[x] - Перенести searhCriteria в searchFiles
[x] - Создать репорт с количеством типов
[x] - Объем кода в копоненте
[x] - добавить формулу рассчета медианы
[x] - Триммить search patterns или не тримить контент (2)
[x] - добавить работу с аргументами (https://github.com/terkelg/prompts)
[x] - Вынести функцию под каждый репорт в отдельный файл (Scenarios)
[] - Добавить описание функциям а то уже непонятно (проработать названия)
[] - Разобраться с dirname

---

[] - Количество переиспользований компонентов
[] - Количество it() cases в test файле
[] - Покрытие тестами

---

[] - выбираю какой сценарий сравнения запустить
[] - передаю путь до папки и 2 хеша коммитов которые нужно сравнить
[] - пролучаю по ним отчеты
[] - репозиотрий возвращается к первичному состоянию
как пример - https://github.com/JPeer264/node-git-commit-info/blob/master/index.ts

<!-- repos/pre-refactoring/src/pages/PDP/components/ProductImageModel/types.tsx: -->
<!-- repos/pre-refactoring/src/routes/types.ts -->
<!-- repos/pre-refactoring/src/test-utils/Wrapper.tsx -->

---

1. Запускаю скрипт
2. Выбираем папку до и после (потом добавить по хешам коммитов)
3. Выбираем какие сценарии запустить
4. Для каждого спрашиваем нужные данные и запускаем синхронно (а если они совпадают?)
5. Собираем данные нужные для всех и запускаем параллельно(а если они совпадают?) <--

---

// const start = performance.now();
// const stop = performance.now();
// const inSeconds = (stop - start) / 1000;
// const rounded = Number(inSeconds).toFixed(3);
// console.log(`Finded ${Object.keys(matches).length} matches in ${rounded}s`);
