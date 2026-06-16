import { motion } from "motion/react";
import { GraduationCap, University, Code2 } from "lucide-react";
import { Badge } from "./ui/badge";
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
  transition: { duration: 0.5, ease: "easeOut" },
};

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: photo + soft skills */}
          <div className="flex flex-col gap-8">
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
                <div
                  className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border-2 border-primary/30 -z-10"
                />
              </div>
            </motion.div>

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

          {/* Right: bio + parcours */}
          <div className="flex flex-col gap-10">
            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }}>
              <p className="text-muted-foreground" style={{ lineHeight: 1.8 }}>
                Passionné d'informatique depuis le lycée, je suis en 3ème année de Bachelier en Sciences Informatiques avec pour projets un master en Cybersécurité & Cloud/Management. 
                J'aime construire des produits utiles du back-end à l'interface, en passant par l'infrastructure.
              </p>
              <p className="text-muted-foreground mt-4" style={{ lineHeight: 1.8 }}>
                En dehors du code, je contribue à des projets open-source, je participe à des hackathons et je travaille sur des projets personnels.
                Je suis disponible pour des <strong className="text-foreground">missions freelance</strong> et
                un <strong className="text-foreground">stage de fin d'études</strong> à partir de janvier 2027.
              </p>
            </motion.div>

            {/* Timeline */}
            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.25 }}>
              <h3
                className="font-display mb-6"
                style={{ fontSize: "1rem", fontWeight: 600, letterSpacing: "-0.01em" }}
              >
                Parcours
              </h3>
              <div className="relative flex flex-col gap-0">
                {/* vertical line */}
                <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />
                {PARCOURS.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * i }}
                    className="relative pl-14 pb-8 last:pb-0"
                  >
                    {/* icon bubble */}
                    <div className="absolute left-0 top-0 size-10 rounded-full bg-secondary border border-border flex items-center justify-center text-primary">
                      <item.icon size={16} />
                    </div>
                    <div>
                      <span
                        className="font-display text-primary"
                        style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
                      >
                        {item.year}
                      </span>
                      <h4
                        className="font-display mt-0.5"
                        style={{ fontSize: "0.95rem", fontWeight: 600 }}
                      >
                        {item.title}
                      </h4>
                      <p
                        className="text-muted-foreground"
                        style={{ fontSize: "0.85rem", marginTop: "2px" }}
                      >
                        {item.place}
                      </p>
                      <p
                        className="text-muted-foreground mt-1.5"
                        style={{ fontSize: "0.85rem", lineHeight: 1.6 }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
