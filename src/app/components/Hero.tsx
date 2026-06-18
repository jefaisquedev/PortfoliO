import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import LiquidEther from "./LiquidEther";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={["#5227FF", "#a855f7", "#c084fc"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-[1]" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 w-full py-16 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
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
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-muted-foreground mt-6 max-w-xl mx-auto"
          style={{ lineHeight: 1.7 }}
        >
          Étudiant en 3ème année de Bachelor en Sciences Informatique à l&apos;Université Libre de
          Bruxelles, je conçois des applications web et mobile robustes. Passionné par les
          architectures propres, le DevOps et l&apos;expérience utilisateur.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
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
          transition={{ duration: 0.4, delay: 0.55 }}
          className="flex items-center justify-center gap-4 mt-6"
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

      {/* scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
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
