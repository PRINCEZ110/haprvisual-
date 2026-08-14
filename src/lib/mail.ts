import { Resend } from "resend";
import type { ContactInput } from "@/lib/validation";

export async function sendContactEmail(data: ContactInput) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log(
      "[mail] RESEND_API_KEY not set — skipping email, submission stored in DB."
    );
    return;
  }

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_TO_EMAIL ?? "haprvisual@gmail.com";
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "HAPR Visual <onboarding@resend.dev>";

  await resend.emails.send({
    from,
    to,
    subject: `New project inquiry from ${data.name}`,
    html: `
      <div style="font-family:Helvetica,Arial,sans-serif;background:#F5F0E8;padding:32px;">
        <h2 style="color:#171410;margin:0 0 16px;">Let's collaborate! — new submission</h2>
        <table style="border-collapse:collapse;width:100%;max-width:520px;background:#fff;">
          <tr><td style="padding:12px 16px;border-bottom:1px solid #E0D8CA;color:#7A7066;">Name</td>
              <td style="padding:12px 16px;border-bottom:1px solid #E0D8CA;color:#171410;"><strong>${escapeHtml(data.name)}</strong></td></tr>
          <tr><td style="padding:12px 16px;border-bottom:1px solid #E0D8CA;color:#7A7066;">Email</td>
              <td style="padding:12px 16px;border-bottom:1px solid #E0D8CA;color:#171410;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
          <tr><td style="padding:12px 16px;border-bottom:1px solid #E0D8CA;color:#7A7066;">Service</td>
              <td style="padding:12px 16px;border-bottom:1px solid #E0D8CA;color:#171410;">${escapeHtml(data.service)}</td></tr>
          <tr><td style="padding:12px 16px;border-bottom:1px solid #E0D8CA;color:#7A7066;">Budget in USD</td>
              <td style="padding:12px 16px;border-bottom:1px solid #E0D8CA;color:#171410;">${escapeHtml(data.budget)}</td></tr>
          <tr><td style="padding:12px 16px;color:#7A7066;">Project description</td>
              <td style="padding:12px 16px;color:#171410;">${escapeHtml(data.message || "—")}</td></tr>
        </table>
      </div>
    `,
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}