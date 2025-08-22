import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const { to, subject, html } = await req.json();

    if (!to || !EMAIL_RE.test(to)) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const fromEmail = process.env.FROM_EMAIL || "hello@emerlya.com";
    const fromName = process.env.FROM_NAME || "Cosmin @ Emerlya";

    if (!host || !user || !pass) {
      return NextResponse.json(
        { error: "Email service not configured." },
        { status: 503 }
      );
    }

    // Allow only our site + localhost
    const origin = req.headers.get("origin") || "";
    if (!origin.includes("emerlya.com") && !origin.includes("localhost")) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const transporter = nodemailer.createTransporter({
      host,
      port,
      secure: false,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `${fromName} <${fromEmail}>`,
      to,
      subject: subject || "Your Emerlya Demo",
      html: html || "<p>Here's your demo output.</p>",
      replyTo: fromEmail,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Mail failed." }, { status: 500 });
  }
}
