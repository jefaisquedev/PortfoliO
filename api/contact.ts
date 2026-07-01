import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  requestType?: string;
  subject?: string;
  message?: string;
  budget?: string;
  _honeypot?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function validate(body: ContactPayload): string | null {
  if (body._honeypot) return null;

  const firstName = body.firstName?.trim();
  const lastName = body.lastName?.trim();
  const email = body.email?.trim();
  const requestType = body.requestType?.trim();
  const subject = body.subject?.trim();
  const message = body.message?.trim();

  if (!firstName) return "Prénom requis";
  if (!lastName) return "Nom requis";
  if (!email || !EMAIL_RE.test(email)) return "Email invalide";
  if (!requestType) return "Type de demande requis";
  if (!subject || subject.length > 80) return "Sujet invalide";
  if (!message || message.length < 20 || message.length > 600) return "Message invalide";

  return null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !toEmail) {
    return res.status(503).json({
      error: "Service email non configuré. Ajoutez RESEND_API_KEY et CONTACT_TO_EMAIL sur Vercel.",
    });
  }

  const body = (req.body ?? {}) as ContactPayload;

  if (body._honeypot) {
    return res.status(200).json({ success: true });
  }

  const validationError = validate(body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const firstName = body.firstName!.trim();
  const lastName = body.lastName!.trim();
  const email = body.email!.trim();
  const requestType = body.requestType!.trim();
  const subject = body.subject!.trim();
  const message = body.message!.trim();
  const budget = body.budget?.trim();

  const resend = new Resend(apiKey);
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  const budgetRow = budget
    ? `<tr><td style="padding:8px 0;color:#8b8ba6;">Budget</td><td style="padding:8px 0;">${escapeHtml(budget)}</td></tr>`
    : "";

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;color:#f4f4f8;background:#14141c;padding:24px;border-radius:12px;">
      <h2 style="margin:0 0 16px;color:#a855f7;font-size:18px;">Nouvelle demande — Portfolio</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 0;color:#8b8ba6;width:140px;">Nom</td><td style="padding:8px 0;">${escapeHtml(firstName)} ${escapeHtml(lastName)}</td></tr>
        <tr><td style="padding:8px 0;color:#8b8ba6;">Email</td><td style="padding:8px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#a855f7;">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:8px 0;color:#8b8ba6;">Type</td><td style="padding:8px 0;">${escapeHtml(requestType)}</td></tr>
        <tr><td style="padding:8px 0;color:#8b8ba6;">Sujet</td><td style="padding:8px 0;">${escapeHtml(subject)}</td></tr>
        ${budgetRow}
      </table>
      <hr style="border:none;border-top:1px solid rgba(255,255,255,0.09);margin:20px 0;" />
      <p style="margin:0 0 8px;color:#8b8ba6;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
      <p style="margin:0;white-space:pre-wrap;line-height:1.6;font-size:14px;">${escapeHtml(message)}</p>
    </div>
  `;

  const text = [
    "Nouvelle demande — Portfolio",
    "",
    `Nom : ${firstName} ${lastName}`,
    `Email : ${email}`,
    `Type : ${requestType}`,
    `Sujet : ${subject}`,
    budget ? `Budget : ${budget}` : "",
    "",
    "Message :",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo: email,
    subject: `[Portfolio] ${requestType} — ${subject}`,
    html,
    text,
  });

  if (error) {
    console.error("Resend error:", error);
    return res.status(500).json({ error: "L'envoi a échoué. Réessayez plus tard." });
  }

  return res.status(200).json({ success: true });
}
