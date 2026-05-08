import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { firstName, email, message } = body || {};
  if (!firstName || !email || !message) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const beulahEmail = process.env.BEULAH_BUSINESS_EMAIL || "hello@delightfashionhouse.com";
  const fromEmail = process.env.RESEND_FROM_EMAIL || beulahEmail;

  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: fromEmail,
        to: beulahEmail,
        replyTo: email,
        subject: `Site contact: ${firstName}`,
        text: `From: ${firstName} <${email}>\n\n${message}`,
      });
    } catch (err) {
      console.error("[contact] resend error:", err);
    }
  } else {
    console.info("[contact:dev]", { firstName, email, message });
  }

  return NextResponse.json({ ok: true });
}
