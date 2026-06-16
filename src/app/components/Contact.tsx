import { useState } from "react";
import { useForm } from "react-hook-form";
import { Send, Github, Linkedin, Mail, MapPin, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const SOCIALS = [
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/jefaisquedev",
    href: "https://github.com/jefaisquedev",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/malcomo",
    href: "https://linkedin.com/in/malcomo",
  },
  {
    icon: Mail,
    label: "Email",
    value: "owimomo27@gmail.com",
    href: "mailto:owimomo27@gmail.com",
  },
  {
    icon: MapPin,
    label: "Localisation",
    value: "Bruxelles, Belgique",
    href: null,
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" },
};

export function Contact() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1400));
    console.log("Contact form:", data);
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div {...fadeUp} className="mb-16">
          <span
            className="font-display text-primary"
            style={{ fontSize: "0.8rem", letterSpacing: "0.15em" }}
          >
            04. CONTACT
          </span>
          <h2
            className="font-display mt-2"
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Travaillons ensemble
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg" style={{ lineHeight: 1.7 }}>
            Vous avez un projet web, une mission freelance ou une opportunité de stage ?
            N'hésitez pas à me contacter, je réponds sous 24h.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-16 text-center"
              >
                <CheckCircle2 size={48} className="text-primary" />
                <h3 className="font-display" style={{ fontSize: "1.2rem", fontWeight: 600 }}>
                  Message envoyé !
                </h3>
                <p className="text-muted-foreground" style={{ fontSize: "0.9rem" }}>
                  Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input
                      id="name"
                      placeholder="jean Dupont"
                      aria-invalid={!!errors.name}
                      {...register("name", { required: "Nom requis" })}
                      className={errors.name ? "border-destructive focus-visible:ring-destructive/30" : ""}
                    />
                    {errors.name && (
                      <p className="text-destructive" style={{ fontSize: "0.78rem" }}>
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jean@exemple.com"
                      aria-invalid={!!errors.email}
                      {...register("email", {
                        required: "Email requis",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Email invalide",
                        },
                      })}
                      className={errors.email ? "border-destructive focus-visible:ring-destructive/30" : ""}
                    />
                    {errors.email && (
                      <p className="text-destructive" style={{ fontSize: "0.78rem" }}>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="subject">Sujet</Label>
                  <Input
                    id="subject"
                    placeholder="Mission freelance — Site e-commerce"
                    aria-invalid={!!errors.subject}
                    {...register("subject", { required: "Sujet requis" })}
                    className={errors.subject ? "border-destructive focus-visible:ring-destructive/30" : ""}
                  />
                  {errors.subject && (
                    <p className="text-destructive" style={{ fontSize: "0.78rem" }}>
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Décrivez votre projet, vos besoins, votre budget approximatif..."
                    rows={5}
                    aria-invalid={!!errors.message}
                    {...register("message", {
                      required: "Message requis",
                      minLength: { value: 20, message: "Message trop court (20 caractères min.)" },
                    })}
                    className={errors.message ? "border-destructive focus-visible:ring-destructive/30" : ""}
                  />
                  {errors.message && (
                    <p className="text-destructive" style={{ fontSize: "0.78rem" }}>
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="gap-2 self-start"
                >
                  {isSubmitting ? (
                    <>
                      <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div
              className="p-5 rounded-xl border border-border bg-card"
            >
              <h3
                className="font-display mb-5"
                style={{ fontSize: "1rem", fontWeight: 600, letterSpacing: "-0.01em" }}
              >
                Me retrouver
              </h3>
              <div className="flex flex-col gap-4">
                {SOCIALS.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="size-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <div>
                      <p
                        className="text-muted-foreground"
                        style={{ fontSize: "0.75rem", marginBottom: "2px" }}
                      >
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="text-foreground hover:text-primary transition-colors"
                          style={{ fontSize: "0.88rem", fontWeight: 500 }}
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="text-foreground" style={{ fontSize: "0.88rem", fontWeight: 500 }}>
                          {value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl border border-primary/20 bg-primary/5">
              <p
                className="font-display text-primary"
                style={{ fontSize: "0.8rem", letterSpacing: "0.05em", fontWeight: 600 }}
              >
                DISPONIBILITÉ
              </p>
              <p className="text-muted-foreground mt-2" style={{ fontSize: "0.85rem", lineHeight: 1.7 }}>
                Disponible pour des missions freelance dès maintenant, et ouvert à un
                stage ou une alternance à partir de <strong className="text-foreground">janvier 2027</strong>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
