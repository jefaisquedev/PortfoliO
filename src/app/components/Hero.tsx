import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, type Variants } from "motion/react";
import { Button } from "./ui/button";
import PixelSnow from "./PixelSnow";

const NAME = "Malcom OGOUBY-D.";
const ROLES = [
  "Développeur Full-Stack",
  "Étudiant en Informatique",
  "Passionné DevOps & UX",
];

const titleContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.035, delayChildren: 0.15 },
  },
};

const charVariant: Variants = {
  hidden: { opacity: 0, y: "0.55em", rotateX: -55 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", damping: 13, stiffness: 220 },
  },
};

function useTypewriter(words: string[], enabled: boolean) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const current = words[index % words.length];

    if (!deleting && sub === current.length) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (deleting && sub === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(() => {
      setSub((s) => s + (deleting ? -1 : 1));
    }, deleting ? 45 : 80);
    return () => clearTimeout(t);
  }, [sub, deleting, index, words, enabled]);

  return words[index % words.length].slice(0, sub);
}

function TypewriterRole({ reduceMotion }: { reduceMotion: boolean }) {
  const typed = useTypewriter(ROLES, !reduceMotion);
  const roleText = reduceMotion ? ROLES[0] : typed;

  return (
    <p
      className="font-display text-primary mt-3 min-h-[1.6em]"
      style={{
        fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
        fontWeight: 500,
        letterSpacing: "-0.01em",
      }}
    >
      <span className="sr-only">{ROLES[0]}</span>
      <span aria-hidden>
        {roleText}
        {!reduceMotion && <span className="hero-caret" />}
      </span>
    </p>
  );
}

export function Hero() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 z-0">
        <PixelSnow
          color="#ffffff"
          flakeSize={0.01}
          minFlakeSize={1.25}
          pixelResolution={200}
          speed={reduceMotion ? 0 : 1.25}
          density={0.3}
          direction={125}
          brightness={1}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 75% 55% at 50% 38%, color-mix(in oklch, var(--primary) 14%, transparent), transparent 68%)",
          }}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-[1]" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 w-full py-16 flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-muted-foreground mb-5 inline-flex items-center gap-2"
          style={{ fontSize: "0.8rem", letterSpacing: "0.08em" }}
        >
          <span className="text-primary">❯</span>
          bonjour, je suis
        </motion.span>

        {reduceMotion ? (
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
            {NAME}
          </h1>
        ) : (
          <motion.h1
            aria-label={NAME}
            variants={titleContainer}
            initial="hidden"
            animate="visible"
            className="font-display flex flex-wrap justify-center"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              perspective: 600,
              animation: "title-glow 4s ease-in-out infinite",
            }}
          >
            {NAME.split(" ").map((word, wordIndex, words) => (
              <span key={wordIndex} className="inline-flex whitespace-nowrap" aria-hidden>
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    variants={charVariant}
                    className="inline-block"
                    style={{ transformOrigin: "bottom" }}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordIndex < words.length - 1 && <span>&nbsp;</span>}
              </span>
            ))}
          </motion.h1>
        )}

        <TypewriterRole reduceMotion={reduceMotion} />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-muted-foreground mt-6 max-w-xl mx-auto"
          style={{ lineHeight: 1.7 }}
        >
          Étudiant en 3ème année de Bachelier en Sciences Informatique à l&apos;Université Libre de
          Bruxelles, je conçois des applications web et mobile robustes. Passionné par les
          architectures propres, le DevOps et l&apos;expérience utilisateur.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="flex flex-wrap gap-3 justify-center mt-8"
        >
          <Button size="lg" variant="ghost" asChild className="liquid-glass-btn">
            <a href="#projects">Voir mes projets</a>
          </Button>
          <Button size="lg" variant="ghost" asChild className="liquid-glass-btn liquid-glass-btn-outline">
            <a href="#contact">Me contacter</a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          className="flex items-center justify-center gap-4 mt-6"
        >
          {[
            { icon: Github, label: "GitHub", href: "https://github.com/jefaisquedev" },
            { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/malcomo" },
            { icon: Mail, label: "Email", href: "mailto:owimomo27@gmail.com" },
          ].map(({ icon: Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              whileHover={reduceMotion ? undefined : { y: -3, scale: 1.12 }}
              whileTap={reduceMotion ? undefined : { scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary transition-colors duration-200"
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
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
