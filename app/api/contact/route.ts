import { NextResponse } from "next/server";

/**
 * Contact inquiry handler.
 *
 * Out of the box this validates + logs the submission and returns 200 so the
 * form works with zero configuration. To actually deliver mail, drop in a
 * provider below (Resend example commented) and set the env vars.
 */
export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  const name = String(data.name || "").trim();
  const email = String(data.email || "").trim();

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Missing name or email" }, { status: 422 });
  }

  const inquiry = {
    name,
    email,
    company: String(data.company || "").trim(),
    projectType: String(data.projectType || "").trim(),
    message: String(data.message || "").trim(),
    receivedAt: new Date().toISOString(),
  };

  // Visible in server logs during development.
  console.log("[contact] new inquiry:", inquiry);

  /* --- To send real email, install `resend` and uncomment: -------------
  import { Resend } from "resend";
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "Ember Studio <hello@studioember.ai>",
    to: "hello@studioember.ai",
    replyTo: email,
    subject: `New inquiry — ${name}${inquiry.company ? ` (${inquiry.company})` : ""}`,
    text: `${inquiry.projectType}\n\n${inquiry.message}\n\n${email}`,
  });
  ---------------------------------------------------------------------- */

  return NextResponse.json({ ok: true });
}
