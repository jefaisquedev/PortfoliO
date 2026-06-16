import { useState } from "react";
import { ExternalLink, Github, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { projects, ALL_CATEGORIES, type Project, type ProjectCategory } from "../data";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useMouseTrack } from "../hooks/useMouseTrack";

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
  Web: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  API: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Mobile: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  CLI: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
};

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const { ref, mouse } = useMouseTrack();

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300"
      style={{
        background: `linear-gradient(135deg, var(--card) 0%, var(--card) 100%), radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 35%)`,
        backgroundBlendMode: "overlay",
      }}
    >
      {/* image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ filter: "saturate(0.85)", objectPosition: project.imagePosition ?? "center" }}
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-all duration-300 flex items-center justify-center gap-3">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileHover={{ y: 0 }}
            className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-200"
          >
            <Button
              size="sm"
              variant="secondary"
              onClick={onOpen}
              className="gap-1.5"
            >
              <Eye size={14} />
              Détails
            </Button>
            <Button
              size="sm"
              variant="secondary"
              asChild
              className="gap-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={14} />
                Demo
              </a>
            </Button>
            <Button
              size="sm"
              variant="secondary"
              asChild
              className="gap-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github size={14} />
                Code
              </a>
            </Button>
          </motion.div>
        </div>
        {/* category badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-display font-medium ${CATEGORY_COLORS[project.category]}`}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <div>
          <h3
            className="font-display"
            style={{ fontSize: "1.05rem", fontWeight: 600, letterSpacing: "-0.01em" }}
          >
            {project.title}
          </h3>
          <p
            className="text-muted-foreground mt-0.5"
            style={{ fontSize: "0.82rem" }}
          >
            {project.subtitle}
          </p>
        </div>
        <p
          className="text-muted-foreground"
          style={{ fontSize: "0.85rem", lineHeight: 1.65 }}
        >
          {project.shortDesc}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="font-display" style={{ fontSize: "0.72rem" }}>
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function Projects({ onSelectProject }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<"Tous" | ProjectCategory>("Tous");

  const filtered =
    activeFilter === "Tous"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

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
            Un aperçu de mes projets personnels, académiques et freelance. Cliquez sur
            une carte pour voir les détails complets.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat as "Tous" | ProjectCategory)}
              className={`px-4 py-2 rounded-full border font-display transition-all duration-200 ${
                activeFilter === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
              style={{ fontSize: "0.82rem" }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={() => onSelectProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            Aucun projet dans cette catégorie.
          </div>
        )}
      </div>
    </section>
  );
}
