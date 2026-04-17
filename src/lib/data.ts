export type Project = {
  title: string;
  year: string;
  url: string;
  image: string;
  tags: string[];
  badge?: string;

  slug?: string;
  tagline?: string;
  client?: string;
  story?: string[];
};

export type PublishedProject = Project &
  Required<Pick<Project, "slug" | "tagline" | "client" | "story">>;

export const projects: Project[] = [
  {
    title: "arOS",
    badge: "+20,000 users",
    tags: ["Bubble", "Supabase", "n8n"],
    year: "2025",
    url: "https://aros.app",
    image: "/images/projects/aros.webp",
    slug: "aros",
    tagline: "AI-powered marketing operating system",
    client: "arOS",
    story: [
      "arOS is a powerful AI-driven platform designed to orchestrate marketing agents in a fully visual and automated way. Built entirely on Bubble, Supabase, and n8n, it lets creators, agencies, and SaaS companies design intelligent workflows that plan, write, and execute marketing strategies at scale — all without code. From campaign generation to dynamic website publishing, every part of the system was built to make marketing smarter, faster, and infinitely customizable.",
      "The vision behind arOS is to redefine how digital marketing is created and executed. Instead of static automation, arOS introduces a multi-agent ecosystem where each agent handles a specific part of the marketing process — from generating a brief to writing content or deploying landing pages. Flows are visually orchestrated through a ReactFlow-based builder, bringing the AI pipeline to life.",
      "Under the hood, arOS combines a modular architecture: Bubble powers the user interface, partner portals, and dashboards; Supabase provides JSON-based storage for nodes, DNA schemas, and user data; and n8n handles agent orchestration and event coordination. The platform also supports white-label partner ecosystems, letting agencies brand the entire experience with their own domains, colors, and AI agents through a dynamic domain-detection engine that loads partner-specific themes and content automatically.",
    ],
  },
  {
    title: "Hello Maia",
    tags: ["Bubble", "Supabase", "n8n"],
    year: "2025",
    url: "https://hellomaia.com.br",
    image: "/images/projects/hello-maia.png",
    slug: "hello-maia",
    tagline: "No-code AI agent builder",
    client: "Hello Maia",
    story: [
      "Hello Maia enables non-technical teams to build fully custom AI assistants without writing a single line of code. Users define intents, ingest their own documents, connect channels like chat, calendar, and social platforms, and launch a working agent in hours rather than weeks — all while keeping full human-override controls in place.",
      "The platform is organized around a no-code agent designer where teams upload knowledge files and shape behavior through custom prompt templates. Channel integrations cover a web chat widget, Google Calendar, and the WhatsApp and Instagram APIs, making it straightforward to deploy the same assistant across the surfaces where customers actually are.",
      "Operations stay grounded in a team dashboard that lets humans monitor live chats, intervene when needed, and annotate conversations to improve future training. Multi-step workflows and in-app subscription management round out the product, turning Hello Maia from a chatbot builder into an end-to-end automation platform with billing built in.",
    ],
  },
  {
    title: "Fynance",
    tags: ["Bubble"],
    year: "2025",
    url: "https://fynance.com.br",
    image: "/images/projects/fynance.png",
    slug: "fynance",
    tagline: "Personal finance dashboard",
    client: "Fynance",
    story: [
      "Fynance centralizes your entire financial life in a single dashboard: link bank accounts and cards, log expenses and income as one-off or installment entries, transfer funds between accounts, and visualize cashflow without switching between tools. The goal was to replace spreadsheets and scattered banking apps with a unified, trustworthy source of truth.",
      "Account and card management supports multiple bank accounts and credit or debit cards, connected either through secure OAuth or via manual entry with encrypted storage. On top of that foundation, expense and income tracking handles one-time, installment and recurring transactions, letting users mark items as paid or unpaid and filter by status, category or date for a clear picture of where money is going.",
      "Inter-account transfers move funds instantly between the user's own accounts, with automatic reconciliation on both sides of the transaction so balances always stay consistent. A Stripe integration powers user subscription plans, with automated billing workflows, proration and retry logic for failed payments — turning recurring, installment and subscription flows into a reliable part of the product rather than an operational burden.",
    ],
  },
  {
    title: "Eu Na Europa",
    tags: ["Bubble", "Supabase"],
    year: "2024",
    url: "https://eunaeuropa.com",
    image: "/images/projects/eu-na-europa.png",
    slug: "eu-na-europa",
    tagline: "Italian citizenship platform for families",
    client: "EuNaEuropa",
    story: [
      "EuNaEuropa digitizes the decade-long Italian citizenship journey, replacing scattered spreadsheets, email threads, and paper archives with a single enterprise SaaS portal. Families build a live family tree, upload ancestor documents, track progress, chat with caseworkers, and manage payments all from one place.",
      "At the heart of the product is a visual Family Tree module where clients chart their ancestry, invite relatives, and assign document upload tasks so every branch of the case moves forward in parallel. A companion client dashboard consolidates document checklists, chat support, and the payment schedule with installments, giving families a clear view of what is pending, what has been validated, and what is due next.",
      "Behind the scenes, an admin workspace powers the firm's operations with distinct roles for researchers, managers, and support staff, each with workflows tailored to how a research case actually progresses. Reporting and contracts are handled through dynamic PDF generation, producing legal contracts and progress summaries on demand so the back office can stay in sync with every family's milestones.",
    ],
  },
  {
    title: "FixaAí",
    tags: ["Bubble", "OpenAI"],
    year: "2024",
    url: "https://fixaai.com",
    image: "/images/projects/fixaai.png",
    slug: "fixaai",
    tagline: "AI-powered flashcard creator with spaced-repetition engine",
    client: "FixaAí Educação",
    story: [
      "FixaAí removes the friction of manual flashcard creation by leveraging AI-powered prompts. Students paste notes or keywords, select a question type — MCQ, true/false, or open-ended — and a difficulty level, then generate a complete deck in one click. An instant preview step lets them edit cards before saving, so the AI output becomes a starting draft rather than a fixed artifact.",
      "Study sessions run on a native spaced-repetition engine. Learners rate each card as Again, Hard, or Easy, and that feedback drives the next review interval through adaptive scheduling that keeps focus on weaker cards. The loop turns scattered notes into a structured, long-term retention practice without asking students to design their own review plan.",
      "Around the core study flow sits a social library where users can share or remix public decks, follow creators, and rate content. Monetization is layered on top with a free tier capped at 50 cards per month and a Pro subscription that unlocks unlimited cards, AI hints, and analytics.",
    ],
  },
  {
    title: "Vetzco",
    tags: ["Bubble", "MongoDB"],
    year: "2024",
    url: "https://vetzco.com",
    image: "/images/projects/vetzco.png",
    slug: "vetzco",
    tagline: "Pet-care marketplace connecting owners to vetted veterinarians",
    client: "Vetzco",
    story: [
      "Vetzco connects pet owners to vetted veterinarians, giving families a trusted way to find the right professional for their animals. The project needed to validate a full marketplace experience before committing to custom development, so the focus was on shaping the product end to end through design and a working prototype.",
      "I led the Figma design and translated the high-fidelity screens into a responsive Bubble prototype, covering vet search, detailed vet profiles with reviews, and an integrated booking widget. The no-code build made it possible to test the core journeys with realistic data and interactions, turning static mockups into flows that users could actually navigate.",
      "The result is a pet-care marketplace that validates the search, profile and booking experience in a single connected product. By moving from Figma to Bubble, the team could refine the interface, pressure-test the booking flow and de-risk decisions ahead of full development.",
    ],
  },
  {
    title: "Mult Resorts",
    tags: ["Bubble"],
    year: "2023",
    url: "https://multresorts.com.br",
    image: "/images/projects/mult-resorts.png",
    slug: "mult-resorts",
    tagline: "Secure timeshare marketplace",
    client: "Mult Resorts",
    story: [
      "Mult Resorts solves rampant fraud and low owner yields in informal timeshare resale markets. The platform formalizes what used to happen in WhatsApp groups and unsafe classifieds — turning it into a verified, end-to-end marketplace.",
      "Owners upload ID and property deed in a single workflow, with real-time verification status and calendar management built in. A two-step verification covers both the owner and the property before anything goes live.",
      "On the guest side, the booking flow mirrors Airbnb: search by resort, dates, and amenities, then pay in full or split via credit card or Pix at checkout. Funds are captured into an Asaas (Stripe) escrow and released to the owner only after guest check-in is confirmed — which is what kills the fraud problem.",
    ],
  },
];

export const expertise = [
  {
    number: "01",
    title: "Workflows",
    description: "Designing and optimizing workflows",
  },
  {
    number: "02",
    title: "Plugin Development",
    description: "Plugin development and integration",
  },
  {
    number: "03",
    title: "API",
    description: "API connections (REST)",
  },
  {
    number: "04",
    title: "UI & UX Design",
    description: "Responsive UI/UX design",
  },
  {
    number: "05",
    title: "Database",
    description: "Database structuring and management (Supabase integration)",
  },
];

export const experience = [
  {
    company: "arOS",
    role: "Senior Bubble Developer",
    period: "2025 — Present",
    description:
      "Software that helps people sell more easily with simple marketing using professional AI agents.",
  },
  {
    company: "Hamurabi Apps",
    role: "Pleno Bubble Developer",
    period: "2023 — 2025",
    description:
      "Designing end-to-end Bubble.io apps backed by Supabase—with Stripe/Pix payments and n8n automations.",
  },
  {
    company: "FixaAí",
    role: "Founder",
    period: "2023 — 2025",
    description:
      "Built an AI-powered flashcard platform with instant question generation, spaced-repetition engine and shareable decks.",
  },
  {
    company: "Self-employed",
    role: "E-commerce Entrepreneur",
    period: "2021 — 2022",
    description:
      "Managed branding, catalogs, fulfillment and Meta/Google Ads—driving R$150K+ in annual revenue at a 12% conversion rate.",
  },
  {
    company: "Self-employed",
    role: "Infoproducer",
    period: "2020 — 2021",
    description:
      "Produced video courses and interactive learning modules, leveraging no-code tools to streamline content delivery.",
  },
  {
    company: "Self-employed",
    role: "Freelance Video Editor",
    period: "2018 — 2020",
    description:
      "Delivered 100+ projects—gameplay montages, motion graphics and branded promos—with fast turnaround and high client satisfaction.",
  },
];

export const stack = [
  {
    name: "Bubble",
    category: "Software",
    description:
      "No-code platform for building responsive web & SaaS applications visually.",
  },
  {
    name: "Supabase",
    category: "Database Integration",
    description:
      "Open-source Postgres BaaS offering auth, real-time, storage and SQL.",
  },
  {
    name: "n8n",
    category: "Automations",
    description:
      "Open-source workflow automation tool to connect apps, services, and APIs flexibly.",
  },
  {
    name: "Javascript",
    category: "Front End Development",
    description:
      "JavaScript, often abbreviated as JS, is a programming language and technology alongside HTML and CSS.",
  },
];
