import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter (resets on server restart)
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // max submissions per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }

  record.count += 1;
  return false;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, subject, message, website } = body;

    // Honeypot check — if "website" field is filled, it's a bot
    if (website && website.trim().length > 0) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters." },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters." },
        { status: 400 }
      );
    }

    // Send email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL;
    const toEmail = process.env.CONTACT_EMAIL;

    if (!resendApiKey || !fromEmail || !toEmail) {
      console.error("Missing email environment variables");
      return NextResponse.json(
        { error: "Server configuration error. Please try again later." },
        { status: 500 }
      );
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: subject
          ? `Portfolio Contact: ${subject}`
          : `New message from ${name} via Portfolio`,
        reply_to: email,
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0A0E17; color: #F4F6F8; border-radius: 12px;">
            <h2 style="color: #2DE2E6; margin-top: 0;">New Portfolio Contact</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #9AA5B1; width: 80px;">Name:</td>
                <td style="padding: 8px 0; color: #F4F6F8;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #9AA5B1;">Email:</td>
                <td style="padding: 8px 0; color: #F4F6F8;">${escapeHtml(email)}</td>
              </tr>
              ${subject ? `<tr><td style="padding: 8px 0; color: #9AA5B1;">Subject:</td><td style="padding: 8px 0; color: #F4F6F8;">${escapeHtml(subject)}</td></tr>` : ""}
              <tr>
                <td style="padding: 8px 0; color: #9AA5B1; vertical-align: top;">Message:</td>
                <td style="padding: 8px 0; color: #F4F6F8; white-space: pre-wrap;">${escapeHtml(message)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #9AA5B1;">IP:</td>
                <td style="padding: 8px 0; color: #9AA5B1; font-size: 12px;">${ip}</td>
              </tr>
            </table>
          </div>
        `,
        text: `Name: ${name}\nEmail: ${email}\n${subject ? `Subject: ${subject}\n` : ""}Message: ${message}\n\nSent from IP: ${ip}`,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json().catch(() => ({}));
      console.error("Resend API error:", errorData);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

function escapeHtml(text: string): string {
  const div = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;" };
  return text.replace(/[&<>"']/g, (c) => div[c as keyof typeof div]);
}
