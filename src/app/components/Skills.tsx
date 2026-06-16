import { Monitor, Server, Database, Cpu } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { skillCategories } from "../data";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { useMouseTrack } from "../hooks/useMouseTrack";

const ICONS = { Monitor, Server, Database, Cpu } as const;

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" },
};

function SkillCard({ skill, index }: { skill: string; index: number }) {
  const { ref, mouse } = useMouseTrack();

  return (
    <motion.div
      key={skill}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      ref={ref}
      className="group relative flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-200 cursor-default"
      style={{
        background: `linear-gradient(135deg, var(--card) 0%, var(--card) 100%), radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 30%)`,
        backgroundBlendMode: "overlay",
      }}
    >
      {/* colored dot */}
      <span className="size-2 rounded-full bg-primary shrink-0 group-hover:scale-125 transition-transform duration-200" />
      <span
        className="font-display text-foreground"
        style={{ fontSize: "0.82rem", fontWeight: 500 }}
      >
        {skill}
      </span>
    </motion.div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  const { ref, mouse } = useMouseTrack();

  return (
    <div
      ref={ref}
      className="text-center p-5 rounded-xl border border-border bg-card"
      style={{
        background: `linear-gradient(135deg, var(--card) 0%, var(--card) 100%), radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 30%)`,
        backgroundBlendMode: "overlay",
      }}
    >
      <div
        className="font-display text-primary"
        style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.03em" }}
      >
        {value}
      </div>
      <div
        className="text-muted-foreground mt-1"
        style={{ fontSize: "0.82rem" }}
      >
        {label}
      </div>
    </div>
  );
}

export function Skills() {
  const [active, setActive] = useState(skillCategories[0].name);

  return (
    <section id="skills" className="py-24 sm:py-32 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div {...fadeUp} className="mb-16">
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
            Technologies que j'utilise au quotidien pour concevoir, développer et déployer
            des applications robustes.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Tabs
            value={active}
            onValueChange={setActive}
            className="gap-8"
          >
            <TabsList className="flex-wrap h-auto gap-2 bg-transparent p-0">
              {skillCategories.map((cat) => {
                const Icon = ICONS[cat.icon];
                return (
                  <TabsTrigger
                    key={cat.name}
                    value={cat.name}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <Icon size={15} />
                    {cat.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {skillCategories.map((cat) => (
              <TabsContent key={cat.name} value={cat.name}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                  {cat.skills.map((skill, i) => (
                    <SkillCard key={skill} skill={skill} index={i} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Stats row */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.3 }}
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
