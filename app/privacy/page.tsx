import type { Metadata } from "next";
import { Logo } from "@/components/ui/Logo";
import { Footer } from "@/components/sections/Footer";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: `Privacy policy — ${site.name}`,
  description: `How ${site.name} collects, uses and protects your data, including submissions through the ${site.domain} contact form.`,
  robots: { index: true, follow: true },
};

const updated = "21 July 2026";

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-[1.03rem] leading-relaxed text-ink-soft">{children}</p>;
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="display mt-14 text-2xl sm:text-3xl">{children}</h2>;
}

function Li({ children }: { children: React.ReactNode }) {
  return <li className="mt-2 leading-relaxed text-ink-soft">{children}</li>;
}

export default function PrivacyPolicy() {
  return (
    <>
      <header className="flex justify-center px-4 pt-6">
        <a href="/" aria-label="Ember Studio — home">
          <Logo />
        </a>
      </header>

      <main className="mx-auto w-full max-w-[42rem] px-5 pb-24 pt-12 sm:px-8">
        <p className="mono-label">Privacy</p>
        <h1 className="display mt-4 text-[clamp(2.2rem,6vw,3.4rem)]">Privacy policy.</h1>
        <p className="mt-3 text-sm text-muted">Last updated {updated}.</p>

        <P>
          {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates {site.domain}. This policy
          explains what personal data we collect when you use this site or submit our contact
          form, why we collect it, who we share it with, and the rights you have over it. It&apos;s
          written to meet UK GDPR, EU GDPR and PECR (the UK/EU rules on cookies).
        </P>

        <H2>The short version</H2>
        <ul className="mt-2 list-disc pl-5">
          <Li>
            We only collect what you type into the contact form — name, email, and anything
            optional you add (company, project type, message).
          </Li>
          <Li>We use it to reply to you, and to keep a record that you got in touch.</Li>
          <Li>
            We don&apos;t run tracking or advertising cookies. If that ever changes, we&apos;ll
            ask first via the cookie bar, not assume consent.
          </Li>
          <Li>You can ask us to see, correct, or delete your data at any time — see below.</Li>
        </ul>

        <H2>What we collect, and why</H2>
        <P>
          <strong className="text-ink">Contact form submissions.</strong> When you submit the
          form, we collect your name, email address, and any of company, project type, or message
          you choose to include. We process this to respond to your enquiry and take any steps
          you ask us to before entering into a contract with you — our lawful bases are{" "}
          <em>contract</em> (UK GDPR Art. 6(1)(b)) and our <em>legitimate interest</em> in running
          a studio that replies to prospective clients (Art. 6(1)(f)). You&apos;re never required
          to submit more than your name and email.
        </P>
        <P>
          <strong className="text-ink">Technical data.</strong> Our hosting provider logs
          standard request data (such as IP address and browser type) for security and
          reliability. We don&apos;t use this to identify or track individuals across visits.
        </P>

        <H2>Cookies and similar technologies</H2>
        <P>
          This site does not set analytics, advertising, or tracking cookies by default. The only
          thing we store locally in your browser without asking is your cookie preference itself
          (so we don&apos;t ask twice) — that&apos;s strictly necessary and exempt from consent
          under PECR. If we ever add analytics, it will stay switched off until you opt in through
          the cookie bar at the bottom of the page, and you can withdraw that choice at any time
          via &ldquo;Manage cookies&rdquo; in the footer.
        </P>

        <H2>Who we share it with</H2>
        <P>We use a small number of processors to run the studio and this site:</P>
        <ul className="mt-2 list-disc pl-5">
          <Li>
            <strong className="text-ink">Supabase</strong> — stores contact form submissions in
            our project database.
          </Li>
          <Li>
            <strong className="text-ink">Resend</strong> — delivers the email notification that
            tells us you got in touch.
          </Li>
          <Li>
            <strong className="text-ink">Vercel</strong> — hosts this website.
          </Li>
        </ul>
        <P>
          These providers may process data on servers outside the UK/EEA (including the US).
          Where that happens, it&apos;s covered by their Standard Contractual Clauses or an
          equivalent, recognised safeguard. We don&apos;t sell your data or share it with anyone
          for marketing purposes.
        </P>

        <H2>How long we keep it</H2>
        <P>
          We keep contact form submissions for as long as needed to respond to you and for a
          reasonable period afterward as a business record — typically no more than 24 months from
          your last contact, unless we&apos;re actively working together or the law requires
          longer. You can ask us to delete your submission sooner at any time.
        </P>

        <H2>Your rights</H2>
        <P>Under UK/EU GDPR, you can ask us to:</P>
        <ul className="mt-2 list-disc pl-5">
          <Li>Confirm what personal data we hold about you, and get a copy of it.</Li>
          <Li>Correct data that&apos;s inaccurate or incomplete.</Li>
          <Li>Delete your data, or restrict how we use it.</Li>
          <Li>Object to processing based on our legitimate interest.</Li>
          <Li>Receive your data in a portable format.</Li>
        </ul>
        <P>
          To exercise any of these, email{" "}
          <a className="text-ink underline underline-offset-2" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          . If you&apos;re not satisfied with our response, you can complain to the UK
          Information Commissioner&apos;s Office (ico.org.uk) or your local EU data protection
          authority.
        </P>

        <H2>Changes to this policy</H2>
        <P>
          If we change what we collect or why — for example, adding analytics — we&apos;ll update
          this page and, where the change affects cookies, prompt you again via the cookie bar.
        </P>

        <H2>Contact</H2>
        <P>
          Questions about this policy or your data:{" "}
          <a className="text-ink underline underline-offset-2" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </P>
      </main>

      <Footer />
    </>
  );
}
