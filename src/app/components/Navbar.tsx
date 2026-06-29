import { useState, useEffect } from "react";
import { Terminal } from "lucide-react";
import { motion, AnimatePresence, useAnimationControls, type Variants } from "motion/react";

const NAV_LINKS = [
  { label: "Accueil", href: "#home" },
  { label: "À propos", href: "#about" },
  { label: "Compétences", href: "#skills" },
  { label: "Projets", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const listVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: { when: "afterChildren", staggerChildren: 0.04, staggerDirection: -1 },
  },
  visible: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.06 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 320, damping: 26 } },
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const shakeControls = useAnimationControls();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) return;
    const interval = setInterval(() => {
      shakeControls.start({
        rotate: [0, -14, 14, -10, 10, -5, 5, 0],
        transition: { duration: 0.6, ease: "easeInOut" },
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [open, shakeControls]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <motion.button
            type="button"
            onClick={() => setOpen((o) => !o)}
            animate={{ rotate: open ? 135 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            whileTap={{ scale: 0.9 }}
            aria-label={open ? "Masquer le menu" : "Afficher le menu"}
            aria-expanded={open}
            className="flex items-center justify-center p-1.5 -ml-1.5 rounded-md text-primary hover:bg-secondary transition-colors"
          >
            <motion.span animate={shakeControls} className="flex items-center justify-center">
              <Terminal size={18} />
            </motion.span>
          </motion.button>
          <a
            href="#home"
            className="flex items-center gap-2 group"
            aria-label="Accueil"
          >
            <span
              className="font-display text-lg font-semibold text-foreground tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Malcom<span className="text-primary">.</span>dev
            </span>
          </a>
        </div>

        <AnimatePresence>
          {open && (
            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex items-center gap-1 flex-wrap justify-end"
            >
              {NAV_LINKS.map((link) => (
                <motion.li key={link.label} variants={itemVariants}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
