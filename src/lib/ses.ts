import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const region = process.env.AWS_REGION ?? "us-east-1";

export const ses = new SESClient({ region });

export async function sendEmail({
  to,
  subject,
  html,
  text,
  replyTo,
}: {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string;
}) {
  const from = process.env.SES_FROM_EMAIL ?? "no-reply@binjimz.com";
  const ToAddresses = Array.isArray(to) ? to : [to];

  if (!process.env.AWS_ACCESS_KEY_ID) {
    console.warn("[ses] AWS creds not set, skipping send", { to, subject });
    return { skipped: true } as const;
  }

  const command = new SendEmailCommand({
    Source: from,
    Destination: { ToAddresses },
    ReplyToAddresses: replyTo ? [replyTo] : undefined,
    Message: {
      Subject: { Data: subject, Charset: "UTF-8" },
      Body: {
        Html: html ? { Data: html, Charset: "UTF-8" } : undefined,
        Text: text ? { Data: text, Charset: "UTF-8" } : undefined,
      },
    },
  });

  return ses.send(command);
}

export function leadEmailHtml(lead: {
  name: string;
  email?: string | null;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  message?: string | null;
  source: string;
}) {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#0b0b0c;color:#f5f6fa;padding:32px;">
    <h2 style="font-family:'Cinzel',serif;color:#c8a96a;margin:0 0 16px;">New lead — Bin Jimz</h2>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:6px 0;color:#b9babf;">Source</td><td>${lead.source}</td></tr>
      <tr><td style="padding:6px 0;color:#b9babf;">Name</td><td>${lead.name}</td></tr>
      <tr><td style="padding:6px 0;color:#b9babf;">Email</td><td>${lead.email ?? "—"}</td></tr>
      <tr><td style="padding:6px 0;color:#b9babf;">Phone</td><td>${lead.phone ?? "—"}</td></tr>
      <tr><td style="padding:6px 0;color:#b9babf;">Company</td><td>${lead.company ?? "—"}</td></tr>
      <tr><td style="padding:6px 0;color:#b9babf;">Service</td><td>${lead.service ?? "—"}</td></tr>
    </table>
    <p style="margin-top:16px;white-space:pre-wrap;border-left:2px solid #c8a96a;padding-left:12px;">${lead.message ?? ""}</p>
  </div>`;
}
