import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Two step CTA backend.
 * Spec: docs/06-conversion-mechanics.md
 *
 * Behaviour:
 * - Validate email and first name.
 * - If RESEND_API_KEY is set, add the contact and send the saved-look email.
 * - Always return ok: true so the frontend can continue to WhatsApp; we do not
 *   block Beulah's close on a flaky email service.
 *
 * Server-side Pixel CAPI is left as a TODO until META_CAPI_TOKEN is provided.
 */
export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { firstName, email, pinName, pinUrl, archetype, source } = body || {};

  if (!email || !firstName) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "hello@delightfashionhouse.com";

  if (apiKey) {
    try {
      const resend = new Resend(apiKey);

      if (audienceId) {
        await resend.contacts.create({
          audienceId,
          email,
          firstName,
          unsubscribed: false,
        });
      }

      await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: pinName
          ? `Your saved look from Dé-light: ${pinName}`
          : "Hello from Dé-light Fashion House",
        html: renderSavedLookEmail({ firstName, pinName, pinUrl }),
      });
    } catch (err) {
      console.error("[save-look] resend error:", err);
      // do not fail the user-facing flow
    }
  } else {
    console.info("[save-look:dev]", { firstName, email, pinName, archetype, source });
  }

  return NextResponse.json({ ok: true });
}

function renderSavedLookEmail({
  firstName,
  pinName,
  pinUrl,
}: {
  firstName: string;
  pinName?: string | null;
  pinUrl?: string | null;
}): string {
  const waLink =
    "https://wa.me/2347069542891?text=" +
    encodeURIComponent(
      `Hi Beulah, I want this look from Fashion Inspo: ${pinName || "(not specified)"}. My name is ${firstName}.`
    );

  return `<!doctype html>
  <html lang="en"><head><meta charset="utf-8" />
  <style>
    body{margin:0;background:#f5ecd7;font-family:Georgia,serif;color:#1b1b1b;}
    .wrap{max-width:540px;margin:0 auto;padding:32px 24px;}
    .card{background:#fff;border-radius:6px;padding:32px;box-shadow:0 6px 24px rgba(26,45,95,0.12);}
    h1{font-family:'Cormorant Garamond',Georgia,serif;font-size:28px;color:#1a2d5f;margin:0 0 16px;}
    p{line-height:1.6;color:#1b1b1bcc;}
    .btn{display:inline-block;background:#b91d1d;color:#fff;padding:14px 24px;text-decoration:none;border-radius:4px;font-weight:600;letter-spacing:0.02em;margin:16px 0;}
    .footer{font-size:12px;color:#1b1b1b80;margin-top:24px;text-align:center;}
  </style></head>
  <body>
    <div class="wrap">
      <div class="card">
        <p style="font-family:Inter,Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#b91d1d;font-weight:700;margin:0 0 12px;">Dé-light Fashion House</p>
        <h1>Hi ${escape(firstName)}, here is the look you saved.</h1>
        ${
          pinName
            ? `<p><strong>${escape(pinName)}</strong> is now in your inbox so you do not lose it.</p>`
            : `<p>Your saved look is now in your inbox so you do not lose it.</p>`
        }
        <p>When you are ready to commission, tap below. Beulah responds in less than an hour during Lagos working hours.</p>
        <a href="${waLink}" class="btn">Continue on WhatsApp</a>
        ${pinUrl ? `<p style="font-size:13px;"><a href="${pinUrl}" style="color:#1a2d5f;">View the full look on the site</a></p>` : ""}
        <p style="margin-top:24px;font-size:14px;">Beulah will also send you one styling letter per week. Unsubscribe whenever.</p>
      </div>
      <div class="footer">© Dé-light Fashion House · Lagos, Nigeria</div>
    </div>
  </body></html>`;
}

function escape(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
