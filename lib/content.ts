/* ------------------------------------------------------------------ *
 *  All site copy in one place — edit here, the page updates.
 * ------------------------------------------------------------------ */

export const site = {
  name: "Ember Studio",
  domain: "studioember.ai",
  email: "hello@studioember.ai",
  tagline: "Built with taste. Shipped at speed.",
};

export const nav = {
  links: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
  ],
  cta: { label: "Start a project", href: "#contact" },
};

export const hero = {
  eyebrow: "A web & AI studio for startups",
  lines: ["Look funded.", "Operate like it too."],
  emphasis: "funded",
  body: "We design premium startup websites and build AI agents that handle real work. One studio for strategy, design, code and AI.",
  primary: { label: "Start a project", href: "#contact" },
  secondary: { label: "See the work", href: "#work" },
  note: "Built with taste. Shipped at speed.",
};

export const whatWeBuild = {
  label: "What we build — 01",
  kicker: "Two things. One craft: building.",
  heading: "Premium web. Useful AI.",
  body: "We help startups become clearer on the outside and more capable on the inside.",
  columns: [
    {
      tag: "Websites",
      title: "Sites that look as strong as the product.",
      body: "Positioning, copy, design and development for startups that need to look as serious as what they're building.",
      points: ["Positioning & messaging", "Brand direction", "Design & development"],
    },
    {
      tag: "AI agents",
      title: "Agents that do real work.",
      body: "Support, onboarding and workflow agents that connect to your tools, take action, and remove repetitive work.",
      points: ["Connected to your stack", "Takes approved actions", "Not a bottom-right chatbot"],
    },
  ],
  outcomes: [
    { value: "1–2wk", label: "From kickoff to a shipped, premium site" },
    { value: "70%", label: "Fewer repetitive tickets once an agent is live" },
    { value: "0", label: "Handoffs between strategy, design and code" },
  ],
};

export const problem = {
  label: "The problem — 02",
  headingA: "Your product has moved on.",
  headingB: "Your website has not.",
  lead: "The product is good. The website still sounds like every other startup.",
  points: [
    "The visual identity feels temporary.",
    "The copy could belong to anyone.",
    "The team is manually doing work software should handle.",
  ],
  close: "That gap gets expensive when you're launching, raising, or trying to win serious customers.",
  resolve: "Ember closes it.",
};

export const work = {
  label: "Selected work — 03",
  heading: "Startups, made harder to ignore.",
  body: "A selection of websites, brands and AI systems built for early-stage technology companies.",
  projects: [
    {
      index: "01",
      title: "A clearer story for a complex product.",
      client: "Fintech infrastructure",
      tags: ["Positioning", "Website", "Development"],
      palette: ["#9640a8", "#9640a8", "#9640a8"],
      stat: { value: "+38%", label: "Demo requests after launch" },
      cover: "/work/card-01-cover.jpg",
    },
    {
      index: "02",
      title: "A premium launch for an early-stage startup.",
      client: "Developer tooling",
      tags: ["Brand direction", "Product story", "Launch site"],
      palette: ["#cb72b8", "#cb72b8", "#cb72b8"],
      stat: { value: "9 days", label: "Idea to public launch" },
      cover: "/work/card-02-cover.jpg",
    },
    {
      index: "03",
      title: "An AI workflow that gave the team its time back.",
      client: "B2B operations",
      tags: ["Agent design", "Integrations", "Automation"],
      palette: ["#e77a94", "#e77a94", "#e77a94"],
      stat: { value: "12hrs/wk", label: "Manual work removed" },
      cover: "/work/card-03-cover.jpg",
    },
  ],
};

export const waysToWork = {
  label: "Ways to work — 04",
  heading: "Two ways to look Series-A ready.",
  plans: [
    {
      name: "Launch Sprint",
      cadence: "ONE-TIME",
      includesLabel: "You get:",
      theme: "light",
      title: "Go from nearly ready to properly launched.",
      body: "A focused engagement for startups preparing to launch, raise, or upgrade their presence.",
      includes: [
        "Positioning and messaging",
        "Brand direction",
        "A premium marketing website",
        "Design and development",
        "One useful AI agent",
      ],
      meta: "Typical timeline: 1–2 weeks",
      price: "Projects from £4,000",
      cta: "Start a Launch Sprint",
    },
    {
      name: "The Continuum",
      cadence: "MONTHLY",
      includesLabel: "Use it for:",
      theme: "dark",
      title: "Your ongoing web and AI team.",
      body: "For startups that need regular design, development and AI work without building a full internal team.",
      includes: [
        "Landing & feature pages",
        "Product launches",
        "Website improvements",
        "AI agents & automations",
        "Internal tools & maintenance",
      ],
      meta: "One active request at a time. Pause or cancel anytime.",
      price: "From £2,500 / month",
      cta: "Join the Continuum",
    },
  ],
  fallback: {
    title: "Not sure which one fits?",
    body: "Tell us where the project stands and we'll point you to the right path — no pitch, just a straight answer.",
    cta: "Book a call",
    href: "#contact",
  },
};

export const aiPart = {
  label: "The AI part — 05",
  kicker: "What we mean by AI agents",
  heading: "Software that does something.",
  body: "We build agents around specific jobs inside your product or company.",
  cards: [
    {
      tag: "Support",
      body: "Resolve common issues, retrieve information, take approved actions, and escalate the cases that need a person.",
    },
    {
      tag: "Onboarding",
      body: "Guide users through setup, answer contextual questions, and help them reach value faster.",
    },
    {
      tag: "Workflows",
      body: "Move data between tools, qualify requests, update records, and complete repetitive internal tasks.",
    },
  ],
  ruleA: "If it only talks, it's probably a chatbot.",
  ruleB: "If it completes useful work, it's getting closer.",
  demo: {
    caption: "A support agent, mid-conversation",
    steps: [
      {
        status: "Received",
        from: "Customer",
        message: "My March invoice never came through — can you resend it?",
      },
      {
        status: "Working",
        from: "Agent",
        message: "Looking up the billing record and checking what failed…",
      },
      {
        status: "Resolved",
        from: "Agent",
        message: "Found it — resent invoice #4471 and applied a 3-day extension.",
      },
    ],
  },
};

export const process = {
  label: "How it works — 06",
  heading: "A simple process.",
  steps: [
    {
      no: "01",
      name: "Define",
      body: "We get clear on the product, audience, positioning, and what the project actually needs to achieve.",
    },
    {
      no: "02",
      name: "Build",
      body: "We design, write and develop the website or AI system as one connected piece of work.",
    },
    {
      no: "03",
      name: "Ship",
      body: "We test, refine and launch — before another meeting appears.",
    },
  ],
};

export const finalCta = {
  label: "Start — 07",
  heading: "Build the version people take seriously.",
  body: "Bring us the product, the temporary website, and the repetitive work your team shouldn't still be doing manually. We'll turn them into something sharper.",
  note: "Currently accepting a small number of new projects.",
  projectTypes: [
    "Premium website",
    "Brand & positioning",
    "AI agent",
    "Launch Sprint",
    "The Continuum",
    "Something else",
  ],
};

export const footer = {
  blurb: "Premium websites and AI agents for startups.",
  columns: [
    {
      title: "Studio",
      links: [
        { label: "Work", href: "#work" },
        { label: "Services", href: "#services" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Social",
      links: [
        { label: "Instagram", href: "https://instagram.com" },
        { label: "LinkedIn", href: "https://linkedin.com" },
        { label: "X", href: "https://x.com" },
      ],
    },
  ],
};
