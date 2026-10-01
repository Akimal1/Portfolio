export interface SkillGroup {
  title: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    items: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "SCSS",
      "Zustand",
      "Redux Toolkit",
      "RTK Query",
      "TanStack Query",
    ],
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "REST API",
      "WebSockets",
      "Авторизация: JWT, Cookies",
    ],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Docker"],
  },
];
