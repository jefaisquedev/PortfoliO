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

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      {project && (
      <DialogContent
        showCloseButton={false}
        className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-card border border-border"
      >
        <div className="flex flex-col">
          {/* Header image */}
          <div className="relative h-52 sm:h-56 w-full shrink-0 overflow-hidden rounded-t-lg">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              style={{ filter: "saturate(0.8)", objectPosition: project.imagePosition ?? "center" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full liquid-glass-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Fermer"
            >
              <X size={16} />
            </button>
          </div>

          <div className="p-6 flex flex-col gap-6">
          <DialogHeader className="gap-1.5">
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
          <div className="p-4 rounded-xl liquid-glass liquid-glass-tint">
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

          {/* Actions */}
          <div className="flex gap-3 pt-2 border-t border-border">
            {project.demo !== "#" ? (
              <Button asChild className="flex-1 gap-2">
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={15} />
                  Voir la démo
                </a>
              </Button>
            ) : (
              <Button className="flex-1 gap-2" disabled>
                <ExternalLink size={15} />
                Démo indisponible
              </Button>
            )}
            {project.github !== "#" ? (
              <Button variant="outline" asChild className="flex-1 gap-2">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github size={15} />
                  Code source
                </a>
              </Button>
            ) : (
              <Button variant="outline" className="flex-1 gap-2" disabled>
                <Github size={15} />
                Code privé
              </Button>
            )}
          </div>
        </div>
        </div>
      </DialogContent>
      )}
    </Dialog>
  );
}
