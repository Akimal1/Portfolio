"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";

const previewVariants = [
  "from-[#0f2a1a] via-[#123322] to-[#050805]",
  "from-[#123322] via-[#0b160e] to-[#050805]",
  "from-[#0b160e] via-[#16261a] to-[#0f2a1a]",
];

interface ProjectCardProps {
  project: Project;
  index: number;
  spanClassName: string;
  aspectClassName: string;
}

export function ProjectCard({
  project,
  index,
  spanClassName,
  aspectClassName,
}: ProjectCardProps) {
  const reducedMotion = useReducedMotion();
  const tilt = index % 2 === 0 ? -1.5 : 1.5;

  return (
    <motion.article
      className={cn(
        "group flex flex-col overflow-hidden rounded-3xl border border-surface-line/70 bg-surface/60",
        spanClassName
      )}
      whileHover={reducedMotion ? undefined : { y: -6, rotate: tilt }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
    >
      <div className={cn("relative w-full overflow-hidden", aspectClassName)}>
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 bg-gradient-to-br transition-transform duration-700 ease-out group-hover:scale-[1.06]",
              previewVariants[index % previewVariants.length]
            )}
          >
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(73,255,138,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(73,255,138,0.18)_1px,transparent_1px)] [background-size:28px_28px]" />
          </div>
        )}
        <span
          aria-hidden="true"
          className="absolute bottom-4 left-5 font-display text-6xl font-bold text-ink/10 sm:text-7xl"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
        <h3 className="font-display text-xl font-semibold sm:text-2xl">
          {project.title}
        </h3>

        <div className="flex flex-col gap-3 text-sm text-ink-dim sm:text-base">
          <p>
            <span className="font-semibold text-ink">Задача: </span>
            {project.problem}
          </p>
          <p>
            <span className="font-semibold text-ink">Решение: </span>
            {project.solution}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-surface-line px-3 py-1 text-xs text-ink-dim"
            >
              {tech}
            </span>
          ))}
        </div>

        {(project.githubUrl || project.liveUrl) && (
          <div className="flex flex-wrap gap-3 pt-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-green-strong underline-offset-4 hover:underline"
              >
                GitHub →
              </a>
            )}
            {project.liveUrl && (project.liveHighlight ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group/botlink relative inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-green-strong/50 bg-green-deep/70 px-5 py-2.5 text-sm font-semibold text-green-strong",
                  "transition-all duration-300 ease-out",
                  "hover:-translate-y-0.5 hover:scale-[1.03] hover:border-green-strong hover:bg-green-deep hover:text-green hover:shadow-[0_0_26px_rgba(73,255,138,0.5)]",
                  "active:translate-y-0 active:scale-[0.99]",
                  "motion-safe:animate-[botlink-pulse_2.8s_ease-in-out_infinite]"
                )}
              >
                {project.liveLabel ?? "Открыть сайт"}
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 ease-out group-hover/botlink:-translate-y-0.5 group-hover/botlink:translate-x-0.5"
                >
                  ↗
                </span>
              </a>
            ) : (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-green-strong underline-offset-4 hover:underline"
              >
                {project.liveLabel ?? "Открыть сайт →"}
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
