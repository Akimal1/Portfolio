import { Reveal } from "./reveal";

export function About() {
  return (
    <section id="about" className="relative px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <span className="font-display text-xs uppercase tracking-[0.3em] text-green-strong">
            Обо мне
          </span>
          <h2 className="h2-fluid mt-3 text-balance font-display font-bold">Кто я</h2>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-6 text-lg leading-relaxed text-ink-dim lg:col-span-7 lg:col-start-6">
          <p>
            Я занимаюсь fullstack-разработкой — от интерфейса до серверной
            логики. Мне важно, чтобы продукт был понятным для пользователя и
            аккуратно устроен внутри: без лишней сложности и с вниманием к
            деталям, которые обычно остаются незамеченными, но определяют
            качество работы.
          </p>
          <p>
            В работе стараюсь разобраться в задаче до конца, писать код,
            который легко поддерживать, и доводить интерфейс до состояния,
            когда он не мешает пользователю, а помогает.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
