import { useEffect, useState } from "react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";

const TERMINAL_LINES = [
  { prompt: true, text: "whoami" },
  { prompt: false, text: "Malcom OGOUBY-D. — développeur full-stack" },
  { prompt: true, text: "cat about.json" },
  { prompt: false, text: '{ "année": "Bachelor 3", "école": "IUT Informatique",' },
  { prompt: false, text: '  "dispo": "missions freelance & stage" }' },
  { prompt: true, text: "ls projets/" },
  { prompt: false, text: "TaskFlow/  DevBlog-API/  DataViz/  WeatherCLI/" },
  { prompt: true, text: 'echo "Disponible pour collaborer 🚀"' },
  { prompt: false, text: "Disponible pour collaborer 🚀" },
];

export function Hero() {
  const [visibleCount, setVisibleCount] = useState(1);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (visibleCount >= TERMINAL_LINES.length) return;
    const delay = TERMINAL_LINES[visibleCount - 1].prompt ? 900 : 500;
    const timer = setTimeout(() => setVisibleCount((v) => v + 1), delay);
    return () => clearTimeout(timer);
  }, [visibleCount]);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* dot grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in oklch, var(--primary) 18%, transparent) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: text */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-sm font-display text-primary mb-4"
              style={{ fontSize: "0.8rem" }}
            >
              <span
                className="size-2 rounded-full bg-green-500 animate-pulse"
                style={{ boxShadow: "0 0 6px 2px rgba(34,197,94,0.5)" }}
              />
              Disponible — Freelance & Stage
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                animation: "title-glow 4s ease-in-out infinite",
              }}
            >
              Malcom OGOUBY-D.
            </h1>
            <p
              className="font-display text-primary mt-2"
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
                fontWeight: 500,
                letterSpacing: "-0.01em",
              }}
            >
              Développeur Full-Stack
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-muted-foreground max-w-md"
            style={{ lineHeight: 1.7 }}
          >
            Étudiant en 3ème année de Bachelor en Sciences Informatique à l'Univeristé Libre de Bruxelles, je conçois des
            applications web et mobile robustes. Passionné par les architectures
            propres, le DevOps et l'expérience utilisateur.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <Button size="lg" asChild>
              <a href="#projects">Voir mes projets</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#contact">Me contacter</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="flex items-center gap-4"
          >
            {[
              { icon: Github, label: "GitHub", href: "https://github.com/jefaisquedev" },
              { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/malcomo" },
              { icon: Mail, label: "Email", href: "mailto:owimomo27@gmail.com" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
              >
                <Icon size={20} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right: terminal */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden lg:block"
        >
          <div
            className="rounded-xl border border-border bg-card shadow-2xl overflow-hidden"
            style={{
              boxShadow:
                "0 0 0 1px var(--border), 0 24px 64px -12px color-mix(in oklch, var(--primary) 20%, transparent)",
            }}
          >
            {/* terminal title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
              <span className="size-3 rounded-full bg-red-400/80" />
              <span className="size-3 rounded-full bg-yellow-400/80" />
              <span className="size-3 rounded-full bg-green-400/80" />
              <span
                className="ml-auto font-display text-muted-foreground"
                style={{ fontSize: "0.75rem" }}
              >
                terminal — zsh
              </span>
            </div>
            {/* terminal body */}
            <div
              className="p-5 font-display"
              style={{
                fontSize: "0.82rem",
                lineHeight: 1.7,
                minHeight: "280px",
              }}
            >
              {TERMINAL_LINES.slice(0, visibleCount).map((line, i) => (
                <div key={i} className="flex gap-2">
                  {line.prompt ? (
                    <>
                      <span className="text-primary select-none">❯</span>
                      <span className="text-foreground">{line.text}</span>
                    </>
                  ) : (
                    <>
                      <span className="select-none opacity-0">❯</span>
                      <span className="text-muted-foreground">{line.text}</span>
                    </>
                  )}
                </div>
              ))}
              {visibleCount <= TERMINAL_LINES.length && (
                <div className="flex gap-2">
                  <span className="text-primary select-none">❯</span>
                  <span
                    className="inline-block w-2 h-4 bg-primary relative top-0.5"
                    style={{
                      animation: "cursor-blink 1.2s steps(2, start) infinite, cursor-glow 2.4s ease-in-out infinite",
                      transformOrigin: "center",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Défiler vers le bas"
      >
        <span className="font-display" style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  );
}
