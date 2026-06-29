import { useState, Fragment } from "react";
import { motion, type Variants } from "motion/react";
import { GraduationCap, University, Code2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Terminal } from "./Terminal";
import monImage from "../assets/me.jpg";


const PARCOURS = [
  {
    year: "2021",
    icon: GraduationCap,
    title: "Baccalauréat Français",
    place: "Lycée Cours Lumière, Togo",
    desc: "Diplôme du secondaire avec spécialités scientifiques.",
  },
  {
    year: "2022",
    icon: Code2,
    title: "7ème année Mathématiques & Informatique",
    place: "Athénée Royale Charles Rogier, Liège",
    desc: "Déontologie scientifique, complexité algorithmique, revue de code.",
  },
  {
    year: "2023–2026",
    icon: University,
    title: "Bachelier Sciences Informatiques",
    place: "En cours — Université Libre de Bruxelles, Belgique",
    desc: "Architecture microservices, Kubernetes, projet de fin d'études.",
  },
];

const SOFT_SKILLS = [
  "Curieux", "Autonome", "Esprit d'équipe et critique", "Adaptable", "Ponctuel",
  "Rigoureux", "Problem solver", "Veille technologique", "Communication",
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

const contentVariants: Variants = {
  hidden: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
};

const titleVariants: Variants = {
  hidden: { transition: { staggerChildren: 0.012, staggerDirection: -1 } },
  visible: { transition: { staggerChildren: 0.022 } },
};

const charVariants: Variants = {
  hidden: { opacity: 0, x: -38, y: 6, scale: 0.4, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 440, damping: 26 },
  },
};

function AnimatedChars({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <motion.span
            variants={titleVariants}
            aria-hidden="true"
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {[...word].map((char, ci) => (
              <motion.span key={ci} variants={charVariants} style={{ display: "inline-block" }}>
                {char}
              </motion.span>
            ))}
          </motion.span>
          {wi < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </>
  );
}

type ParcoursItem = (typeof PARCOURS)[number];

function TimelineCard({ item, index, isLast }: { item: ParcoursItem; index: number; isLast: boolean }) {
  const [active, setActive] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      onHoverStart={() => setActive(true)}
      onHoverEnd={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onClick={() => setActive((a) => !a)}
      tabIndex={0}
      aria-label={`${item.year} — ${item.title}`}
      aria-expanded={active}
      animate={{
        borderColor: active ? "color-mix(in oklch, var(--primary) 45%, transparent)" : "color-mix(in oklch, white 13%, transparent)",
      }}
      className="relative liquid-glass liquid-glass-interactive rounded-2xl p-5 flex flex-col gap-3 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/50 overflow-hidden"
    >
      {/* connector into the gap (desktop) */}
      {!isLast && <div className="hidden sm:block absolute top-10 -right-4 w-4 h-px bg-border" />}

      <div className="flex items-center gap-3">
        <motion.span
          animate={{
            borderColor: active
              ? "color-mix(in oklch, var(--primary) 50%, transparent)"
              : "color-mix(in oklch, white 11%, transparent)",
          }}
          className="size-10 rounded-full liquid-glass-sm flex items-center justify-center text-primary shrink-0"
        >
          <Icon size={16} />
        </motion.span>
        <span
          className="font-display text-primary"
          style={{ fontSize: "0.8rem", letterSpacing: "0.05em" }}
        >
          {item.year}
        </span>
      </div>

      {/* details revealed on hover; mounted to reserve space (no reflow) */}
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate={active ? "visible" : "hidden"}
        style={{ pointerEvents: active ? "auto" : "none" }}
      >
        <motion.h4
          variants={titleVariants}
          aria-label={item.title}
          className="font-display"
          style={{ fontSize: "0.95rem", fontWeight: 600 }}
        >
          <AnimatedChars text={item.title} />
        </motion.h4>
        <motion.p
          variants={titleVariants}
          aria-label={item.place}
          className="text-muted-foreground mt-1"
          style={{ fontSize: "0.82rem" }}
        >
          <AnimatedChars text={item.place} />
        </motion.p>
        <motion.p
          variants={titleVariants}
          aria-label={item.desc}
          className="text-muted-foreground mt-1.5"
          style={{ fontSize: "0.82rem", lineHeight: 1.6 }}
        >
          <AnimatedChars text={item.desc} />
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div {...fadeUp} className="mb-16">
          <span
            className="font-display text-primary"
            style={{ fontSize: "0.8rem", letterSpacing: "0.15em" }}
          >
            01. À PROPOS
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
            Qui suis-je ?
          </h2>
        </motion.div>

        {/* Intro: photo + bio + soft skills */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-14 items-start">
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="relative max-w-xs">
              <div
                className="rounded-2xl overflow-hidden border border-border"
                style={{ aspectRatio: "4/5" }}
              >
                <img
                  src={monImage}
                  alt="Portrait de Malcom OGOUBY-D."
                  className="w-full h-full object-cover"
                  style={{ filter: "saturate(0.85)" }}
                />
              </div>
              {/* decorative offset border */}
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border-2 border-primary/30 -z-10" />
            </div>
          </motion.div>

          <div className="flex flex-col gap-6">
            <Terminal className="w-full" />

            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }}>
              <h3
                className="font-display mb-3"
                style={{ fontSize: "1rem", fontWeight: 600, letterSpacing: "-0.01em" }}
              >
                Soft skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {SOFT_SKILLS.map((s) => (
                  <Badge key={s} variant="secondary">
                    {s}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Parcours: horizontal timeline */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.25 }} className="mt-16">
          <div className="flex items-baseline justify-between gap-3 flex-wrap mb-6">
            <h3
              className="font-display"
              style={{ fontSize: "1rem", fontWeight: 600, letterSpacing: "-0.01em" }}
            >
              Parcours
            </h3>
            <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
              Pour en savoir plus, survolez chaque carte.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PARCOURS.map((item, i) => (
              <TimelineCard
                key={i}
                item={item}
                index={i}
                isLast={i === PARCOURS.length - 1}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
