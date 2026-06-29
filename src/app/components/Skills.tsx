import { useState, type ComponentType, type CSSProperties } from "react";
import { Code2 } from "lucide-react";
import { motion } from "motion/react";
import {
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiFastapi,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiGraphql,
  SiPrisma,
  SiRedis,
  SiMysql,
  SiSqlite,
  SiGithub,
  SiGithubactions,
  SiLinux,
} from "react-icons/si";
import { useMouseTrack } from "../hooks/useMouseTrack";
import "../../styles/TechOrbit.css";

type Tech = {
  label: string;
  icon: ComponentType<{ size?: number }>;
  color: string;
};

type Ring = {
  size: number;
  duration: string;
  direction: "normal" | "reverse";
  items: Tech[];
};

const FG = "var(--foreground)";

const RINGS: Ring[] = [
  {
    size: 40,
    duration: "28s",
    direction: "normal",
    items: [
      { label: "React", icon: SiReact, color: "#61DAFB" },
      { label: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { label: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { label: "Python", icon: SiPython, color: "#3776AB" },
    ],
  },
  {
    size: 66,
    duration: "40s",
    direction: "reverse",
    items: [
      { label: "Next.js", icon: SiNextdotjs, color: FG },
      { label: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
      { label: "Express", icon: SiExpress, color: FG },
      { label: "FastAPI", icon: SiFastapi, color: "#009688" },
      { label: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { label: "Docker", icon: SiDocker, color: "#2496ED" },
      { label: "Git", icon: SiGit, color: "#F05032" },
    ],
  },
  {
    size: 92,
    duration: "54s",
    direction: "normal",
    items: [
      { label: "GraphQL", icon: SiGraphql, color: "#E10098" },
      { label: "Prisma ORM", icon: SiPrisma, color: "#7C8AF5" },
      { label: "Redis", icon: SiRedis, color: "#FF4438" },
      { label: "MySQL", icon: SiMysql, color: "#4479A1" },
      { label: "SQLite", icon: SiSqlite, color: "#3DA8D8" },
      { label: "GitHub", icon: SiGithub, color: FG },
      { label: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
      { label: "Linux", icon: SiLinux, color: "#FCC624" },
    ],
  },
];

const ALL_TECHS = RINGS.flatMap((r) => r.items.map((t) => t.label)).join(", ");

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

function ringStyle(ring: Ring): CSSProperties {
  return {
    width: `${ring.size}%`,
    height: `${ring.size}%`,
    "--orbit-duration": ring.duration,
    "--orbit-direction": ring.direction,
  } as CSSProperties;
}

function spinStyle(ring: Ring): CSSProperties {
  return {
    "--orbit-duration": ring.duration,
    "--orbit-icon-direction": ring.direction === "normal" ? "reverse" : "normal",
  } as CSSProperties;
}

function TechOrbit() {
  return (
    <div className="tech-orbit" role="img" aria-label={`Technologies maîtrisées : ${ALL_TECHS}`}>
      {RINGS.map((ring, ri) => (
        <div key={ri} className="orbit-ring" style={ringStyle(ring)}>
          {ring.items.map((tech, i) => {
            const angle = (360 / ring.items.length) * i - 90;
            const rad = (angle * Math.PI) / 180;
            const left = 50 + 50 * Math.cos(rad);
            const top = 50 + 50 * Math.sin(rad);
            const Icon = tech.icon;
            return (
              <div
                key={tech.label}
                className="orbit-icon"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                <span className="orbit-spin" style={spinStyle(ring)}>
                  <span
                    className="orbit-glass liquid-glass-sm"
                    style={{ color: tech.color }}
                    aria-hidden
                  >
                    <Icon size={22} />
                  </span>
                  <span className="orbit-label">{tech.label}</span>
                </span>
              </div>
            );
          })}
        </div>
      ))}

      <div className="orbit-core">
        <Code2 size={22} className="text-primary" />
        <span
          className="font-display text-foreground"
          style={{ fontSize: "0.7rem", letterSpacing: "0.12em" }}
        >
          skills
        </span>
      </div>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  const { ref, mouse } = useMouseTrack();

  return (
    <div
      ref={ref}
      className="relative liquid-glass liquid-glass-interactive text-center p-5 rounded-xl overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 35%), color-mix(in oklch, var(--card) 42%, transparent)`,
      }}
    >
      <div
        className="font-display text-primary"
        style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.03em" }}
      >
        {value}
      </div>
      <div className="text-muted-foreground mt-1" style={{ fontSize: "0.82rem" }}>
        {label}
      </div>
    </div>
  );
}

export function Skills() {
  const [hint] = useState("Survolez une icône");

  return (
    <section id="skills" className="py-24 sm:py-32 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div {...fadeUp} className="mb-12">
          <span
            className="font-display text-primary"
            style={{ fontSize: "0.8rem", letterSpacing: "0.15em" }}
          >
            02. COMPÉTENCES
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
            Mon stack technique
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg" style={{ lineHeight: 1.7 }}>
            Un écosystème de technologies en orbite — celles que j'utilise pour concevoir,
            développer et déployer des applications robustes.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <TechOrbit />
          <span
            className="font-display text-muted-foreground mt-6"
            style={{ fontSize: "0.72rem", letterSpacing: "0.1em" }}
          >
            {hint}
          </span>
        </motion.div>

        {/* Stats row */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {[
            { value: "6+", label: "Projets réalisés" },
            { value: "4", label: "Langages maîtrisés" },
            { value: "2", label: "Années d'expérience" },
            { value: "3+", label: "Missions freelance" },
          ].map(({ value, label }) => (
            <StatCard key={label} value={value} label={label} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
