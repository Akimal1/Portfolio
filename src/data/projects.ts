export interface Project {
  id: string;
  title: string;
  problem: string;
  solution: string;
  stack: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  liveLabel?: string;
  liveHighlight?: boolean;
}

export const projects: Project[] = [
  {
    id: "asia-vpn",
    title: "Asia VPN",
    problem:
      "Создать удобный VPN-сервис, где пользователь может прямо через Telegram выбрать тариф, оплатить подписку и автоматически получить доступ к VPN.",
    solution:
      "Разработал Telegram-бота с системой подписок, пробным периодом, оплатой и автоматической выдачей VPN-конфигураций. Настроил VPN-сервер на AmneziaWG, управление пользователями и хранение данных в PostgreSQL.",
    stack: [
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Telegraf",
      "AmneziaWG",
      "Linux / VPS",
    ],
    image: "/vpn.jpg",
    liveUrl: "https://t.me/VPN_ASIA_bot",
    liveLabel: "Открыть бота",
    liveHighlight: true,
  },
  {
    id: "goscontrol",
    title: "ГосКонтроль",
    problem:
      "Цифровая платформа обращений граждан для отправки городских проблем, отслеживания их статуса и взаимодействия с ответственными организациями.",
    solution:
      "Реализовал создание обращений, карту проблем, статусы обращений, распределение обращений между организациями и сотрудниками, кабинет диспетчера, Telegram-бота и контроль выполнения обращений.",
    stack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Docker",
    ],
    image: "/gosControl2.png",
  },
];
