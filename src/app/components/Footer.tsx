import { Github, Linkedin, Mail, Terminal, ArrowUp } from "lucide-react";

const QUICK_LINKS = [
  { label: "Accueil", href: "#home" },
  { label: "À propos", href: "#about" },
  { label: "Compétences", href: "#skills" },
  { label: "Projets", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { icon: Github, label: "GitHub", href: "https://github.com/jefaisquedev" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/malcomo" },
  { icon: Mail, label: "Email", href: "mailto:owimomo27@gmail.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Terminal size={16} className="text-primary" />
              <span
                className="font-display text-foreground"
                style={{ fontSize: "1rem", fontWeight: 600 }}
              >
                Malcom<span className="text-primary">.</span>dev
              </span>
            </div>
            <p className="text-muted-foreground" style={{ fontSize: "0.85rem", lineHeight: 1.7 }}>
              Développeur Full-Stack — Bachelor Informatique 3ème année.
              Disponible pour missions freelance et stage.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p
              className="font-display text-foreground mb-4"
              style={{ fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.08em" }}
            >
              NAVIGATION
            </p>
            <ul className="flex flex-col gap-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p
              className="font-display text-foreground mb-4"
              style={{ fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.08em" }}
            >
              RÉSEAUX
            </p>
            <div className="flex flex-col gap-3">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors"
                  style={{ fontSize: "0.85rem" }}
                >
                  <Icon size={16} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p
            className="text-muted-foreground text-center sm:text-left"
            style={{ fontSize: "0.8rem" }}
          >
            © {new Date().getFullYear()} Malcom OGOUBY-D. — Tous droits réservés. Construit avec React & Tailwind CSS.
          </p>
          <a
            href="#home"
            aria-label="Retour en haut"
            className="p-2 rounded-lg border border-border bg-secondary text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-200"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
