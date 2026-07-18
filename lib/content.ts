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
  lines: ["Look funded.", "Operate like it too."],
  emphasis: "funded",
  body: "We build the premium website and the AI agents you don't have time for — before your raise, your launch, or your next big hire.",
  primary: { label: "Start a project", href: "#contact" },
  secondary: { label: "See the work", href: "#work" },
  note: "Built with taste. Shipped at speed.",
};

export const whatWeBuild = {
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
      title: "Agents that take real actions, not just answer questions.",
      body: "Support, onboarding and workflow agents that connect to your tools, take action, and remove repetitive work.",
      points: [
        "Qualifies leads before they hit your calendar",
        "Handles customer enquiries end-to-end",
        "Follows up prospects automatically",
        "Automates the repetitive ops your team is still doing by hand",
        "Lets a three-person team operate like a fifteen-person one",
      ],
    },
  ],
  outcomes: [
    { value: "1–2wk", label: "From kickoff to a shipped, premium site" },
    { value: "70%", label: "Less manual busywork once your first agent ships" },
    { value: "0", label: "Handoffs between strategy, design, code and AI" },
  ],
};

export const problem = {
  headingA: "Your product has moved on.",
  headingB: "Your website has not.",
  lead: "The product is good. The website still sounds like every other startup.",
  points: [
    "The visual identity feels temporary.",
    "The copy could belong to anyone.",
    "The team is manually doing work software should handle.",
  ],
  close: "That gap gets expensive when you're closing a round, launching publicly, or trying to convince someone good to join a three-person team.",
  resolve: "Ember closes it.",
};

export const work = {
  heading: "Startups, made harder to ignore.",
  body: "A selection of websites, brands and AI systems built for pre-seed and seed founders who've outgrown how they look.",
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
  heading: "Two ways to look like you've already raised the round.",
  plans: [
    {
      name: "Launch Sprint",
      cadence: "ONE-TIME",
      includesLabel: "You get:",
      theme: "light",
      title: "Go from nearly ready to properly launched.",
      body: "A focused sprint to get your website, brand and story in front of investors and customers — before your round closes, not after.",
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
  kicker: "What we mean by AI agents",
  heading: "Software that does something.",
  body: "We build agents around the specific, repetitive work your team is already doing manually — qualifying a lead, resolving a support ticket, onboarding a new user.",
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
  ruleA: "If it only talks, it's a chatbot.",
  ruleB: "If it finishes the task, it's an agent.",
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
  heading: "A simple process.",
  steps: [
    {
      no: "01",
      name: "Define",
      body: "Week 0. Positioning, brand direction, what the site and agent need to do.",
    },
    {
      no: "02",
      name: "Build",
      body: "Week 1. Designed and built, AI-accelerated — not handed between departments.",
    },
    {
      no: "03",
      name: "Ship",
      body: "Week 2. Live, deployed, ready for investors and customers to see.",
    },
  ],
};

export const finalCta = {
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
