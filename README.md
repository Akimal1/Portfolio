# Akim.dev — Portfolio

Личный сайт-портфолио fullstack-разработчика: проекты, навыки и контакты.

## Стек

- [Next.js](https://nextjs.org) 16 (App Router) + React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Three.js / React Three Fiber — анимированная 3D-сцена в hero-блоке

## Запуск

```bash
npm install
npm run dev
```

Сайт откроется на [http://localhost:3000](http://localhost:3000).

## Скрипты

| Команда         | Описание                    |
| --------------- | --------------------------- |
| `npm run dev`   | Dev-сервер                  |
| `npm run build` | Production-сборка           |
| `npm start`     | Запуск production-сборки    |
| `npm run lint`  | Проверка ESLint             |

## Структура

```
src/
  app/          # layout, страница, глобальные стили
  components/   # секции сайта и UI-компоненты
    scene/      # 3D-сцена (React Three Fiber)
  data/         # контент: проекты, навыки, контакты, соцсети
  lib/          # хуки и утилиты
public/         # изображения проектов
```

Контент сайта редактируется в `src/data/`.

## Контакты

- GitHub: [Akimal1](https://github.com/Akimal1)
- Telegram: [@Akima1i](https://t.me/Akima1i)
