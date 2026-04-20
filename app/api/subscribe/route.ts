import { Resend } from "resend";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { email, type = "weekly" } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Graceful degradation — log and accept even without API key set
    console.log(`[subscribe] no RESEND_API_KEY — would have subscribed: ${email} (${type})`);
    return Response.json({ ok: true, message: "Subscribed!" });
  }

  try {
    const resend = new Resend(apiKey);

    // Add contact to Resend audience
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (audienceId) {
      await resend.contacts.create({
        email,
        audienceId,
        unsubscribed: false,
      });
    }

    // Send welcome email
    await resend.emails.send({
      from: "Prob Terminal <noreply@probterminal.in>",
      to: email,
      subject: "You're in — NIFTY 500 Weekly Regime Alerts",
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;background:#07070e;color:#e8e8f2;padding:40px 32px;border-radius:12px">
          <div style="font-weight:800;font-size:20px;margin-bottom:24px">
            <span style="color:#14d9c4">PROB</span> TERMINAL
          </div>
          <h1 style="font-size:22px;font-weight:700;margin-bottom:12px;letter-spacing:-0.02em">You're on the list 🎯</h1>
          <p style="color:#a0a0b8;line-height:1.7;margin-bottom:20px">
            Every week you'll get the NIFTY 500 regime update — breadth ratio R, active sector cascades, and F7 signal count — straight to your inbox.
          </p>
          <p style="color:#a0a0b8;line-height:1.7;margin-bottom:28px">
            Based on 845,000+ observations across 7.5 years. No noise. Just signal.
          </p>
          <a href="https://prob-terminal.vercel.app" style="display:inline-block;background:#14d9c4;color:#07070e;font-weight:700;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:14px">
            View Live Dashboard →
          </a>
          <p style="color:#555;font-size:12px;margin-top:32px">
            Prob Terminal - NIFTY 500 Probability Intelligence<br>
            <a href="https://prob-terminal.vercel.app" style="color:#555">prob-terminal.vercel.app</a>
          </p>
        </div>
      `,
    });

    return Response.json({ ok: true, message: "Subscribed! Check your inbox." });
  } catch (err) {
    console.error("[subscribe] error:", err);
    return Response.json({ error: "Subscription failed. Try again." }, { status: 500 });
  }
}
