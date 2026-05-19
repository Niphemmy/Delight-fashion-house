import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { firstName, email, leadMagnet, source } = body || {};
  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "delightfashionhouseth@gmail.com";

  if (apiKey && audienceId) {
    try {
      const resend = new Resend(apiKey);
      await resend.contacts.create({
        audienceId,
        email,
        firstName: firstName || undefined,
        unsubscribed: false,
      });

      if (leadMagnet === "executive-style-guide") {
        await resend.emails.send({
          from: fromEmail,
          to: email,
          subject: "The Executive Style Guide is yours.",
          html: renderLeadMagnetEmail({ firstName }),
        });
      }
    } catch (err) {
      console.error("[subscribe] resend error:", err);
    }
  } else {
    console.info("[subscribe:dev]", { firstName, email, leadMagnet, source });
  }

  return NextResponse.json({ ok: true });
}

function renderLeadMagnetEmail({ firstName }: { firstName?: string }): string {
  const greeting = firstName ? `Hi ${escape(firstName)},` : "Hi there,";
  return `<!doctype html>
  <html lang="en"><head><meta charset="utf-8" />
  <style>
    body{margin:0;background:#f5ecd7;font-family:Georgia,serif;color:#1b1b1b;}
    .wrap{max-width:540px;margin:0 auto;padding:32px 24px;}
    .card{background:#fff;border-radius:6px;padding:32px;box-shadow:0 6px 24px rgba(26,45,95,0.12);}
    h1{font-family:'Cormorant Garamond',Georgia,serif;font-size:28px;color:#1a2d5f;margin:0 0 16px;}
    .btn{display:inline-block;background:#c9a961;color:#1a2d5f;padding:14px 24px;text-decoration:none;border-radius:4px;font-weight:600;letter-spacing:0.02em;margin:16px 0;}
  </style></head>
  <body>
    <div class="wrap"><div class="card">
      <p style="font-family:Inter,Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#b91d1d;font-weight:700;margin:0 0 12px;">Dé-light Fashion House</p>
      <h1>${greeting} The guide is attached.</h1>
      <p>The Executive Style Guide is yours. Read it, then come back to the site and pick the look you want to wear.</p>
      <a href="https://delightfashionhouse.com/fashion-inspo" class="btn">Browse Fashion Inspo</a>
      <p style="margin-top:24px;font-size:14px;">One styling letter per week, written by Beulah herself. Unsubscribe whenever.</p>
    </div></div>
  </body></html>`;
}

function escape(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
