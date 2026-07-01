import { useState, useEffect, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { motion, useAnimationControls } from "motion/react";
import emailjs from "@emailjs/browser";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import "../../styles/Contact.css";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  requestType: string;
  subject: string;
  message: string;
  budget?: string;
  _honeypot?: string;
};

const REQUEST_TYPES = [
  "Mission freelance",
  "Stage / Alternance",
  "Collaboration",
  "Autre",
];

const BUDGETS = ["< 1 000 €", "1 000 – 5 000 €", "> 5 000 €", "À discuter"];

const SUBJECT_MAX = 80;
const MESSAGE_MAX = 600;

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const SOCIALS = [
  {
    label: "GitHub",
    value: "github.com/jefaisquedev",
    href: "https://github.com/jefaisquedev",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/malcomo",
    href: "https://linkedin.com/in/malcomo",
  },
  {
    label: "Email",
    value: "owimomo27@gmail.com",
    href: "mailto:owimomo27@gmail.com",
  },
  {
    label: "Localisation",
    value: "Bruxelles, Belgique",
    href: null,
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

const fieldError = "text-destructive text-xs mt-1";

function TerminalShell({
  title = "contact — zsh",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="contact-terminal">
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
        <div className="terminal-body">{children}</div>
      </div>
    </div>
  );
}

function FormField({
  label,
  htmlFor,
  required,
  optional,
  error,
  counter,
  children,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  counter?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="contact-form-field">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={htmlFor} className="contact-form-label">
          {label}
          {required && <span className="text-primary"> *</span>}
          {optional && (
            <span className="text-muted-foreground font-normal"> (optionnel)</span>
          )}
        </Label>
        {counter}
      </div>
      {children}
      {error && <p className={fieldError}>{error}</p>}
    </div>
  );
}

function TerminalInfoSidebar() {
  return (
    <TerminalShell title="info — zsh">
      <div className="terminal-output-line mb-2">
        <span className="terminal-chevron">❯</span>
        <span className="text-foreground">./whoami --links</span>
      </div>

      <div className="flex flex-col gap-1.5">
        {SOCIALS.map(({ label, value, href }) => (
          <div key={label} className="terminal-info-row">
            <span className="terminal-chevron">❯</span>
            <span className="terminal-info-key">{label.toLowerCase()}</span>
            {href ? (
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="terminal-link"
              >
                {value}
              </a>
            ) : (
              <span className="terminal-output-text">{value}</span>
            )}
          </div>
        ))}
      </div>

      <div className="terminal-divider" />

      <p className="terminal-comment"># disponibilité</p>
      <div className="terminal-output-line mt-2">
        <span className="terminal-chevron select-none opacity-0">❯</span>
        <span className="terminal-output-text text-xs" style={{ lineHeight: 1.6 }}>
          Toujours prêt à apprendre et à s'exercer !
        </span>
      </div>
    </TerminalShell>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { requestType: "", budget: "" },
  });

  const requestType = watch("requestType");
  const budget = watch("budget");
  const subjectValue = watch("subject") ?? "";
  const messageValue = watch("message") ?? "";

  const subjectRemaining = SUBJECT_MAX - subjectValue.length;
  const subjectWarning = subjectRemaining <= 20;
  const subjectControls = useAnimationControls();

  const messageRemaining = MESSAGE_MAX - messageValue.length;
  const messageWarning = messageRemaining <= 20;
  const messageControls = useAnimationControls();

  useEffect(() => {
    if (!subjectWarning) return;
    subjectControls.start({
      x: [0, -4, 4, -3, 3, 0],
      transition: { duration: 0.3, ease: "easeInOut" },
    });
  }, [subjectValue, subjectWarning, subjectControls]);

  useEffect(() => {
    if (!messageWarning) return;
    messageControls.start({
      x: [0, -4, 4, -3, 3, 0],
      transition: { duration: 0.3, ease: "easeInOut" },
    });
  }, [messageValue, messageWarning, messageControls]);

  const onSubmit = async (data: FormData) => {
    if (data._honeypot) return;

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setError("root.serverError", {
        type: "config",
        message:
          "Formulaire non configuré. Ajoutez les variables VITE_EMAILJS_* (voir .env.example).",
      });
      return;
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: `${data.firstName} ${data.lastName}`,
          from_email: data.email,
          reply_to: data.email,
          request_type: data.requestType,
          subject: data.subject,
          message: data.message,
          budget: data.budget?.trim() || "Non précisé",
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );

      setSent(true);
    } catch {
      setError("root.serverError", {
        type: "submit",
        message:
          "L'envoi a échoué. Réessayez ou contactez-moi directement par email.",
      });
    }
  };

  const resetForm = () => {
    reset({ requestType: "", budget: "" });
    setSent(false);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div {...fadeUp} className="mb-8">
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
          <p className="text-muted-foreground mt-2 max-w-lg text-sm" style={{ lineHeight: 1.6 }}>
            Décrivez votre demande — réponse sous 24h.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {sent ? (
              <TerminalShell title="message — contact">
                <p className="text-foreground font-medium mb-2">Message envoyé !</p>
                <p className="text-muted-foreground" style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                  Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-5 text-sm text-primary hover:underline"
                >
                  Envoyer un autre message
                </button>
              </TerminalShell>
            ) : (
              <TerminalShell title="message — contact">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="contact-form-simple flex flex-col gap-3"
                  noValidate
                >
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    className="sr-only"
                    aria-hidden
                    {...register("_honeypot")}
                  />
                  {errors.root?.serverError && (
                    <p role="alert" className={fieldError}>
                      {errors.root.serverError.message}
                    </p>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FormField
                      label="Prénom"
                      htmlFor="firstName"
                      required
                      error={errors.firstName?.message}
                    >
                      <Input
                        id="firstName"
                        placeholder="Jean"
                        aria-invalid={!!errors.firstName}
                        {...register("firstName", { required: "Prénom requis" })}
                        className={errors.firstName ? "border-destructive" : ""}
                      />
                    </FormField>
                    <FormField
                      label="Nom"
                      htmlFor="lastName"
                      required
                      error={errors.lastName?.message}
                    >
                      <Input
                        id="lastName"
                        placeholder="Dupont"
                        aria-invalid={!!errors.lastName}
                        {...register("lastName", { required: "Nom requis" })}
                        className={errors.lastName ? "border-destructive" : ""}
                      />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FormField
                    label="Email"
                    htmlFor="email"
                    required
                    error={errors.email?.message}
                  >
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
                      className={errors.email ? "border-destructive" : ""}
                    />
                  </FormField>

                  <FormField
                    label="Sujet"
                    htmlFor="subject"
                    required
                    error={errors.subject?.message}
                    counter={
                      <motion.span
                        animate={subjectControls}
                        className={`text-xs tabular-nums ${
                          subjectWarning ? "text-destructive font-medium" : "text-muted-foreground"
                        }`}
                      >
                        {subjectRemaining}
                      </motion.span>
                    }
                  >
                    <Input
                      id="subject"
                      placeholder="Site e-commerce, API REST..."
                      maxLength={SUBJECT_MAX}
                      aria-invalid={!!errors.subject}
                      {...register("subject", {
                        required: "Sujet requis",
                        maxLength: {
                          value: SUBJECT_MAX,
                          message: `Sujet trop long (${SUBJECT_MAX} caractères max.)`,
                        },
                      })}
                      className={errors.subject ? "border-destructive" : ""}
                    />
                  </FormField>
                  </div>

                  <FormField label="Type de demande" required error={errors.requestType?.message}>
                    <input
                      type="hidden"
                      {...register("requestType", { required: "Sélectionnez un type de demande" })}
                    />
                    <div className="contact-form-options">
                      {REQUEST_TYPES.map((type) => {
                        const active = requestType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setValue("requestType", type, { shouldValidate: true })}
                            className={`contact-form-option liquid-glass-sm${active ? " contact-form-option--active" : ""}`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </FormField>

                  <FormField
                    label="Message"
                    htmlFor="message"
                    required
                    error={errors.message?.message}
                    counter={
                      <motion.span
                        animate={messageControls}
                        className={`text-xs tabular-nums ${
                          messageWarning ? "text-destructive font-medium" : "text-muted-foreground"
                        }`}
                      >
                        {messageRemaining}
                      </motion.span>
                    }
                  >
                    <Textarea
                      id="message"
                      placeholder="Votre projet, besoins, délais..."
                      rows={3}
                      maxLength={MESSAGE_MAX}
                      aria-invalid={!!errors.message}
                      {...register("message", {
                        required: "Message requis",
                        minLength: {
                          value: 20,
                          message: "Message trop court (20 caractères min.)",
                        },
                        maxLength: {
                          value: MESSAGE_MAX,
                          message: `Message trop long (${MESSAGE_MAX} caractères max.)`,
                        },
                      })}
                      className={errors.message ? "border-destructive" : ""}
                    />
                  </FormField>

                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-end">
                  <FormField label="Budget estimé" optional>
                    <input type="hidden" {...register("budget")} />
                    <div className="contact-form-options">
                      {BUDGETS.map((b) => {
                        const active = budget === b;
                        return (
                          <button
                            key={b}
                            type="button"
                            onClick={() =>
                              setValue("budget", active ? "" : b, { shouldValidate: false })
                            }
                            className={`contact-form-option liquid-glass-sm contact-form-option--chip${
                              active ? " contact-form-option--active" : ""
                            }`}
                          >
                            {b}
                          </button>
                        );
                      })}
                    </div>
                  </FormField>

                  <Button type="submit" className="w-full sm:w-auto shrink-0" disabled={isSubmitting}>
                    {isSubmitting ? "Envoi..." : "Envoyer"}
                  </Button>
                  </div>
                </form>
              </TerminalShell>
            )}
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <TerminalInfoSidebar />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
