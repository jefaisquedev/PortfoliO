import { ExternalLink, Github, X, ChevronRight } from "lucide-react";
import { type Project } from "../data";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

const CATEGORY_LABELS: Record<string, string> = {
  Web: "Application Web",
  API: "API / Backend",
  Mobile: "Application Mobile",
  CLI: "Outil CLI",
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        {/* Header image */}
        <div className="relative overflow-hidden rounded-t-lg" style={{ aspectRatio: "16/7" }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ filter: "saturate(0.8)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Fermer"
          >
            <X size={16} />
          </button>
          <div className="absolute bottom-4 left-6">
            <span
              className="font-display text-primary"
              style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}
            >
              {CATEGORY_LABELS[project.category]}
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-6">
          <DialogHeader className="gap-1">
            <DialogTitle
              className="font-display"
              style={{ fontSize: "1.4rem", fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              {project.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground" style={{ fontSize: "0.9rem" }}>
              {project.subtitle}
            </DialogDescription>
          </DialogHeader>

          {/* Problem */}
          <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
            <div className="flex items-center gap-2 mb-2">
              <ChevronRight size={14} className="text-primary" />
              <span
                className="font-display text-primary"
                style={{ fontSize: "0.78rem", letterSpacing: "0.08em", fontWeight: 600 }}
              >
                PROBLÉMATIQUE
              </span>
            </div>
            <p className="text-muted-foreground" style={{ fontSize: "0.88rem", lineHeight: 1.7 }}>
              {project.problem}
            </p>
          </div>

          {/* Full description */}
          <div>
            <h4
              className="font-display mb-2"
              style={{ fontSize: "0.9rem", fontWeight: 600 }}
            >
              À propos du projet
            </h4>
            <p className="text-muted-foreground" style={{ fontSize: "0.88rem", lineHeight: 1.75 }}>
              {project.fullDesc}
            </p>
          </div>

          {/* Tech stack */}
          <div>
            <h4
              className="font-display mb-3"
              style={{ fontSize: "0.9rem", fontWeight: 600 }}
            >
              Stack technique
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Badge key={t} variant="secondary" className="font-display" style={{ fontSize: "0.78rem" }}>
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="font-display" style={{ fontSize: "0.75rem" }}>
                {tag}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2 border-t border-border">
            <Button asChild className="flex-1 gap-2">
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={15} />
                Voir la démo
              </a>
            </Button>
            <Button variant="outline" asChild className="flex-1 gap-2">
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github size={15} />
                Code source
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
