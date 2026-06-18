import { useMemo, useCallback, type MouseEvent } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { projects, type Project } from "../data";
import { LogoLoop, type LogoItem } from "./LogoLoop";

type ProjectsProps = {
  onSelectProject: (p: Project) => void;
};

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" },
};

const CATEGORY_COLORS: Record<string, string> = {
  Web: "text-blue-400 border-blue-400/35",
  API: "text-emerald-400 border-emerald-400/35",
  Mobile: "text-purple-400 border-purple-400/35",
  CLI: "text-orange-400 border-orange-400/35",
  Application: "text-amber-400 border-amber-400/35",
};

function projectUrl(project: Project): string | undefined {
  if (project.link && project.link !== "#") return project.link;
  if (project.demo && project.demo !== "#") return project.demo;
  return undefined;
}

function LoopProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const url = projectUrl(project);

  const handleOpenDetails = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onOpen();
  };

  return (
    <article
      className="group relative flex flex-col w-[300px] h-[340px] max-w-[82vw] liquid-glass liquid-glass-panel liquid-glass-interactive rounded-2xl overflow-hidden text-left"
    >
      {/* ── Visuel ── */}
      <div className="relative shrink-0 overflow-hidden border-b border-border" style={{ aspectRatio: "16/9" }}>
        <img
          src={project.image}
          alt={project.title}
          className="transition-transform duration-500 group-hover:scale-105"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: project.imagePosition ?? "center",
            filter: "saturate(0.85)",
          }}
          draggable={false}
        />
        <div className="absolute top-3 left-3">
          <span
            className={`liquid-glass-sm inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-display font-medium ${CATEGORY_COLORS[project.category] ?? CATEGORY_COLORS.Web}`}
          >
            {project.category}
          </span>
        </div>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3 right-3 p-1.5 rounded-full liquid-glass-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label={`Ouvrir ${project.title} dans un nouvel onglet`}
          >
            <ExternalLink size={14} />
          </a>
        )}
      </div>

      {/* ── Identité ── */}
      <div className="flex flex-col gap-1 px-5 pt-4 pb-3 border-b border-border min-h-[5.5rem]">
        <h3
          className="font-display line-clamp-1"
          style={{ fontSize: "1.05rem", fontWeight: 600, letterSpacing: "-0.01em" }}
        >
          {project.title}
        </h3>
        <p
          className="text-muted-foreground line-clamp-2"
          style={{ fontSize: "0.82rem", lineHeight: 1.5 }}
        >
          {project.subtitle}
        </p>
      </div>

      {/* ── Action ── */}
      <button
        type="button"
        onClick={handleOpenDetails}
        className="mt-auto flex items-center justify-between gap-2 px-5 py-4 w-full font-display text-primary hover:bg-primary/5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/50"
        style={{ fontSize: "0.82rem", letterSpacing: "0.04em" }}
      >
        <span>Lire plus</span>
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
      </button>
    </article>
  );
}

export function Projects({ onSelectProject }: ProjectsProps) {
  const logos = useMemo<LogoItem[]>(
    () => projects.map((p) => ({ project: p })),
    [],
  );

  const renderItem = useCallback(
    (item: LogoItem) => {
      const project = item.project as Project;
      return <LoopProjectCard project={project} onOpen={() => onSelectProject(project)} />;
    },
    [onSelectProject],
  );

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div {...fadeUp} className="mb-10">
          <span
            className="font-display text-primary"
            style={{ fontSize: "0.8rem", letterSpacing: "0.15em" }}
          >
            03. PROJETS
          </span>
          <h2
            className="font-display mt-2"
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              animation: "title-glow 4s ease-in-out infinite",
            }}
          >
            Ce que j'ai construit
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg" style={{ lineHeight: 1.7 }}>
            Un aperçu de mes projets personnels, académiques et freelance.
          </p>
        </motion.div>
      </div>

      {/* Looping carousel — full-bleed so cards scroll edge to edge */}
      <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }}>
        <LogoLoop
          logos={logos}
          renderItem={renderItem}
          speed={45}
          direction="left"
          gap={24}
          logoHeight={28}
          hoverSpeed={0}
          fadeOut
          fadeOutColor="var(--background)"
          ariaLabel="Carrousel des projets"
          className="py-3"
          style={{ overflow: "hidden" }}
        />
      </motion.div>
    </section>
  );
}
