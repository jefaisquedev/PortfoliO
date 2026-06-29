import { useMemo, useCallback, useRef, type MouseEvent, type PointerEvent } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import { projects, type Project } from "../data";
import { LogoLoop, type LogoItem } from "./LogoLoop";

type ProjectsProps = {
  onSelectProject: (p: Project) => void;
};

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

function projectUrl(project: Project): string | undefined {
  if (project.link && project.link !== "#") return project.link;
  if (project.demo && project.demo !== "#") return project.demo;
  return undefined;
}

function LoopProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const url = projectUrl(project);
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const springConfig = { stiffness: 220, damping: 22, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [0, 1], [9, -9]), springConfig);
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), springConfig);
  const glowOpacity = useSpring(0, { stiffness: 180, damping: 28 });

  const glowX = useTransform(px, (v) => `${v * 100}%`);
  const glowY = useTransform(py, (v) => `${v * 100}%`);
  const glowBackground = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, color-mix(in oklch, var(--primary) 18%, transparent), transparent 55%)`;

  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
    glowOpacity.set(1);
  };

  const handlePointerLeave = () => {
    px.set(0.5);
    py.set(0.5);
    glowOpacity.set(0);
  };

  const handleOpenDetails = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onOpen();
  };

  return (
    <div style={{ perspective: 900 }}>
    <motion.article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileHover={reduceMotion ? undefined : { scale: 1.03 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      style={reduceMotion ? undefined : { rotateX, rotateY }}
      className="group relative flex flex-col w-[300px] h-[340px] max-w-[82vw] liquid-glass liquid-glass-panel liquid-glass-interactive rounded-2xl overflow-hidden text-left will-change-transform"
    >
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2] rounded-2xl"
          style={{ background: glowBackground, opacity: glowOpacity }}
        />
      )}
      <div className="relative shrink-0 overflow-hidden border-b border-border" style={{ aspectRatio: "16/9" }}>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
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
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3 right-3 z-10 p-1.5 rounded-full liquid-glass-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label={`Ouvrir ${project.title} dans un nouvel onglet`}
          >
            <ExternalLink size={14} />
          </a>
        )}
      </div>

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

      <button
        type="button"
        onClick={handleOpenDetails}
        className="relative z-10 mt-auto flex items-center justify-between gap-2 px-5 py-4 w-full font-display text-primary hover:bg-primary/5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/50"
        style={{ fontSize: "0.82rem", letterSpacing: "0.04em" }}
      >
        <span>Lire plus</span>
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
      </button>
    </motion.article>
    </div>
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
