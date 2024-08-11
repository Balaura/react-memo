# MVP Карточная игра "Мемо"

В этом репозитории реализован MVP карточкой игры "Мемо" по [тех.заданию](./docs/mvp-spec.md)

Проект задеплоен на gh pages:
https://skypro-web-developer.github.io/react-memo/

# Функционал

- Выбор уровня сложности (3 уровня: легкий, средний, сложный)
- Режим игры с 3 жизнями
- Таймер игры
- Лидерборд с отображением лучших результатов
- Адаптивный дизайн

## Разработка

Проект реализован на основе шаблона [Create React App](https://github.com/facebook/create-react-app).

### Как разрабатывать

- Установите зависимости командой `npm install`
- Запустите dev сервер `npm start`
- Откройте адрес в браузере

### Стек и инструменты

React
React Router для навигации
CSS modules для стилей
ESLint и Prettier для форматирования кода
Lefthook для pre-commit хуков

Настроены eslint и prettier. Корректность кода проверяется автоматически перед каждым коммитом с помощью lefthook (аналог husky). Закомитить код, который не проходит проверку eslint, не получится.

### Структура проекта

src/components - React компоненты
src/pages - Страницы приложения
src/utils - Вспомогательные функции
src/context - React контексты
public - Статические файлы

### Доступные команды

#### `npm start`

Запускает приложение в режиме разработки.

Откройте [http://localhost:3000](http://localhost:3000) чтобы посмотреть его в браузере.

#### `npm run build`

Собирает оптимизированный и минифицированный продакшен билд приложения в папку `build`.
После сборке, приложение готово к деплою.

#### `npm run deploy`

Деплоит приложение в github pages. По сути, запускает сборку и коммитит билд в ветку gh-pages.

(!) github pages должен быть включен в настройках репозитория и настроен на ветку gh-pages

#### `npm run lint`

Запускает eslint проверку кода, эта же команда запускается перед каждым коммитом.
Если не получается закоммитить, попробуйте запустить эту команду и исправить все ошибки и предупреждения.
Новые функции

Оценка времени работы:
Задача / Оценка времени / Фактическое время:

1. Создание страницы Лидерборда / 3 часа / 4.5 часа
2. Интеграция API для Лидерборда / 2 часа / 3 часов
3. Добавление ссылки на Лидерборд / 30 минут / 19 минут
4. Тестирование и отладка / 2 часа / 4 часа
5. Обновление документации / 1 час / 45 минут

Общее время: 18 часов 30 минут (оценка) / 12 часов 34 минуты (факт)
