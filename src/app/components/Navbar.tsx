import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";

const NAV_LINKS = [
  { label: "Accueil", href: "#home" },
  { label: "À propos", href: "#about" },
  { label: "Compétences", href: "#skills" },
  { label: "Projets", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

type NavbarProps = {
  isDark: boolean;
  onToggle: () => void;
};

export function Navbar({ isDark, onToggle }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a
          href="#home"
          className="flex items-center gap-2 group"
          aria-label="Accueil"
        >
          <Terminal
            size={18}
            className="text-primary transition-transform duration-200 group-hover:rotate-12"
          />
          <span
            className="font-display text-lg font-semibold text-foreground tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Malcom<span className="text-primary">.</span>dev
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            aria-label={isDark ? "Mode clair" : "Mode sombre"}
            className="text-muted-foreground hover:text-foreground"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-md border-b border-border"
          >
            <ul className="px-6 py-5 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={handleNavClick}
                    className="block px-3 py-2.5 rounded-md text-base text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
