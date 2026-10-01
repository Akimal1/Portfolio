import { projects } from "@/data/projects";
import { ProjectCard } from "./project-card";
import { Reveal } from "./reveal";

const layout = [
  { span: "lg:col-span-7", aspect: "aspect-[4/3]" },
  { span: "lg:col-span-5", aspect: "aspect-[3/4]" },
  { span: "lg:col-span-12", aspect: "aspect-[21/9]" },
];

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 flex flex-col gap-3 sm:mb-14">
          <span className="font-display text-xs uppercase tracking-[0.3em] text-green-strong">
            Проекты
          </span>
          <h2 className="h2-fluid text-balance font-display font-bold">Избранные проекты</h2>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-12">
          {projects.map((project, index) => {
            const { span, aspect } = layout[index % layout.length];
            return (
              <Reveal key={project.id} className={span} delay={index * 0.08}>
                <ProjectCard
                  project={project}
                  index={index}
                  spanClassName="h-full"
                  aspectClassName={aspect}
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
