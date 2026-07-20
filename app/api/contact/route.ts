import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

/**
 * Contact inquiry handler.
 *
 * Stores every submission in Supabase (`contact_submissions`) and emails a
 * notification via Resend so we can follow up. Requires SUPABASE_URL,
 * SUPABASE_ANON_KEY, and RESEND_API_KEY to be set (see .env.example).
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
    company: String(data.company || "").trim() || null,
    project_type: String(data.projectType || "").trim() || null,
    message: String(data.message || "").trim() || null,
  };

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey) {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { error } = await supabase.from("contact_submissions").insert(inquiry);
    if (error) console.error("[contact] supabase insert failed:", error.message);
  } else {
    console.warn("[contact] Supabase env vars missing; skipping storage. Inquiry:", inquiry);
  }

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
      await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL || "Ember Studio <onboarding@resend.dev>",
        to: process.env.CONTACT_TO_EMAIL || "hello@studioember.ai",
        replyTo: email,
        subject: `New inquiry — ${name}${inquiry.company ? ` (${inquiry.company})` : ""}`,
        text: `${inquiry.project_type || ""}\n\n${inquiry.message || ""}\n\n${email}`,
      });
    } catch (err) {
      console.error("[contact] resend send failed:", err);
    }
  } else {
    console.warn("[contact] RESEND_API_KEY missing; skipping email. Inquiry:", inquiry);
  }

  return NextResponse.json({ ok: true });
}
