import { skillGroups } from "@/data/skills";
import { Reveal } from "./reveal";

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 flex flex-col gap-3 sm:mb-12">
          <span className="font-display text-xs uppercase tracking-[0.3em] text-green-strong">
            Навыки
          </span>
          <h2 className="h2-fluid text-balance font-display font-bold">С чем работаю</h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.08}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-surface-line/70 bg-surface/40 p-6">
                <h3 className="font-display text-lg font-semibold text-green-strong">
                  {group.title}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-surface-line px-3 py-1.5 text-sm text-ink-dim"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
