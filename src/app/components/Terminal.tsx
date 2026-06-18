import { useEffect, useState } from "react";
import { motion } from "motion/react";

const TERMINAL_LINES = [
  { prompt: true, text: "whoami" },
  { prompt: false, text: "Malcom OGOUBY-D. — développeur full-stack" },
  { prompt: true, text: "cat about.json" },
  { prompt: false, text: '{ "études": "Ba3 - Sciences Informatiques", ' },
  { prompt: false, text: '  "école": "Université Libre de Bruxelles, Belgique", ' },
  { prompt: false, text: '  "dispo": "missions freelance & stage" }' },
  { prompt: true, text: "ls projets/" },
  { prompt: false, text: "LoveTap/  Site e-commerce/  Bugémon/" },
  { prompt: true, text: 'echo "Disponible pour collaborer 🚀"' },
  { prompt: false, text: "Disponible pour collaborer 🚀" },
];

type TerminalProps = {
  title?: string;
  className?: string;
  minHeight?: string;
};

export function Terminal({
  title = "terminal — zsh",
  className = "",
  minHeight = "280px",
}: TerminalProps) {
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    if (visibleCount >= TERMINAL_LINES.length) return;
    const delay = TERMINAL_LINES[visibleCount - 1].prompt ? 900 : 500;
    const timer = setTimeout(() => setVisibleCount((v) => v + 1), delay);
    return () => clearTimeout(timer);
  }, [visibleCount]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <div className="liquid-glass liquid-glass-panel rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 liquid-glass-bar">
          <span className="size-3 rounded-full bg-red-400/80" />
          <span className="size-3 rounded-full bg-yellow-400/80" />
          <span className="size-3 rounded-full bg-green-400/80" />
          <span
            className="ml-auto font-display text-muted-foreground"
            style={{ fontSize: "0.75rem" }}
          >
            {title}
          </span>
        </div>
        <div
          className="p-5 font-display"
          style={{ fontSize: "0.82rem", lineHeight: 1.7, minHeight }}
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
                  animation: "cursor-blink 1.2s steps(2, start) infinite",
                  transformOrigin: "center",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
