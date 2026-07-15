export interface Project {
  id: string;
  name: string;
  tagline: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  techStack: string[];
  architecture: string;
  liveUrl?: string;
  githubUrl?: string;
  lessonsLearned: string;
  futureImprovements: string[];
  image: string;
}

export interface FileItem {
  name: string;
  path: string;
  type: "file" | "directory";
  content?: string;
  children?: FileItem[];
  language?: string;
}

export const WORKSPACE_NAME = "SABEER-WORKSPACE";

export const rawAboutCode = `/**
 * @file about.ts
 * @description Mustapha Abdulsalam (Sabeer) Profile & Core Values
 */

export const sabeer = {
  name: "Mustapha Abdulsalam",
  nickname: "Sabeer",
  role: "Senior Staff Frontend Developer & UI Engineer",
  location: "Dutse, Jigawa State, Nigeria",
  philosophy: "We don't build fake screenshots. We build premium, pixel-perfect digital craftsmanship.",
  experienceYears: 6,
  specialties: [
    "Next.js & React Ecosystem",
    "Creative Motion & Micro-interactions",
    "UI/UX Design Systems Engineering",
    "Performance Tuning & Accessibility (A11y)"
  ],
  bio: "Highly motivated and results-driven frontend engineer dedicated to creating high-performance, accessible, and breathtaking user interfaces. Specializing in bridging the gap between pixel-perfect designs and scalable backend systems."
};`;

export const rawExperienceCode = `/**
 * @file experience.ts
 * @description Work Experience & Professional Milestones
 */

export interface Job {
  company: string;
  role: string;
  duration: string;
  description: string;
  achievements: string[];
}

export const experiences: Job[] = [
  {
    company: "Freelance / Remote UI Engineer & Architect",
    role: "Senior Staff UI Engineer & Frontend Tech Lead",
    duration: "2021 - Present",
    description: "Designing and engineering highly fluid frontend applications, landing pages, and interactive client portals across borders.",
    achievements: [
      "Built and deployed custom UI systems resulting in up to 40% performance gains over legacy dashboards.",
      "Engineered comprehensive micro-frontend packages with full TypeScript safety, decreasing onboarding time by 30%.",
      "Pioneered accessible web designs, complying with WCAG 2.1 AA requirements across enterprise projects."
    ]
  },
  {
    company: "Tech Hub Dutse",
    role: "Lead Frontend Engineer & AI Builder",
    duration: "2019 - 2021",
    description: "Engineered robust local/regional software solutions, customized portals, and digital payment frameworks.",
    achievements: [
      "Led development of the FUD Health Management System, digitizing medical workflows for over 10,000+ patients.",
      "Implemented Aura Pay, a fintech application enabling secure digital transactions across Nigeria.",
      "Mentored 25+ junior developers and spearheaded adoption of modern React/Next.js frameworks."
    ]
  }
];`;

export const rawSkillsJson = `{
  "technicalSkills": {
    "languages": [
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "SQL",
      "Python"
    ],
    "frameworksAndLibraries": [
      "React 19",
      "Next.js 15 (App Router)",
      "Tailwind CSS v4",
      "Framer Motion",
      "Redux Toolkit",
      "Monaco Editor",
      "Shadcn/UI"
    ],
    "backendAndDatabases": [
      "Node.js",
      "Supabase",
      "Firebase",
      "PostgreSQL",
      "MongoDB"
    ],
    "toolsAndPlatforms": [
      "Git & GitHub",
      "Figma",
      "Vercel",
      "Docker",
      "Postman"
    ]
  }
}`;

export const rawTechStackCode = `/**
 * @file tech-stack.ts
 * @description The architectural toolkit and tooling matrix
 */

export const CoreTechStack = {
  frontend: {
    framework: "Next.js 15 (App Router)",
    viewLibrary: "React 19",
    styles: "Tailwind CSS v4",
    animation: "Framer Motion",
    editor: "Monaco Editor & custom fallbacks"
  },
  backend: {
    compute: "Node.js & Next Server Actions",
    database: "Supabase & PostgreSQL",
    auth: "Supabase Auth & Next Auth",
    realtime: "Supabase Realtime"
  },
  devops: {
    hosting: "Vercel & AWS",
    ci_cd: "GitHub Actions",
    analytics: "Vercel Web Analytics & Speed Insights"
  }
};`;

export const rawServicesCode = `/**
 * @file services.ts
 * @description Premium architectural services offered
 */

export const services = [
  {
    title: "Tailored Frontend Engineering",
    description: "Creating blazing-fast, accessible single page and server-rendered web applications using Next.js, React, and robust state management."
  },
  {
    title: "Premium Design Systems",
    description: "Crafting beautiful, customizable, type-safe Tailwind UI kits, dark/light theme systems, and component libraries with pixel-perfection."
  },
  {
    title: "Motion and UX Engineering",
    description: "Designing high-fidelity, smooth interactive layouts and scroll-based motion that increases engagement without sacrificing performance."
  },
  {
    title: "AI Integration & Dev Tooling",
    description: "Building developer portfolios, LLM-powered interfaces, customizable editors, and code playground workspaces."
  }
];`;

export const rawContactCode = `/**
 * @file contact.ts
 * @description Let's construct something legendary together!
 */

export const ContactInfo = {
  email: "masabeer60@gmail.com",
  phone: "+234 814 624 0938",
  location: "Dutse, Jigawa State, Nigeria",
  socials: {
    github: "https://github.com/sabeerhub",
    linkedin: "https://linkedin.com/in/masabeer",
    twitter: "https://x.com/msabeer",
    instagram: "https://instagram.com/m.sabeer"
  },
  status: "Open for Full-time Roles, Staff Consultancies, and Enterprise Contracts."
};`;

export const rawTerminalSh = `#!/bin/bash
# Welcome to Mustapha Abdulsalam (Sabeer)'s Portfolio Terminal!
# Type 'help' to see a list of commands, or try 'npm run portfolio' to launch.

echo "=========================================================="
echo "   ____       _                      _    _       _       "
echo "  / ___| __ _| |__   ___  ___ _ __  | |  | |     | |      "
echo "  \\___ \\ / _\` | '_ \\ / _ \\/ _ \\ '__| | |  | |     | |      "
echo "   ___) | (_| | |_) |  __/  __/ |    | |__| |___  | |___   "
echo "  |____/ \\__,_|_.__/ \\___|\\___|_|     \\____/_____| |_____| "
echo "=========================================================="
echo "Sabeer Interactive Shell — Type 'help' to get started."
echo ""
`;

export const rawReadmeMd = `# Mustapha Abdulsalam — Sabeer Portfolio

> Senior Staff Frontend Engineer • UI Designer • AI Builder • Motion Designer

---

## ⚡ Welcome to my VS Code Digital Workspace

This is not an ordinary screenshot; it is a live, custom-engineered workspace matching the exact design and interactions of the **Visual Studio Code Dark+ Theme**.

### Run CLI Script to Begin:
\`\`\`bash
npm run portfolio
\`\`\`

---

## 🛠️ Essential Skills

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion
- **Tooling:** Monaco Editor, Command Palette, Interactive Terminal Panel, Git Panel, Custom Search Indexer
- **Core Principles:** Performance Optimized (95+ Lighthouse), WCAG Accessibility standards, Responsive design

---

## 🚀 Navigation Quick Start

1. Use the **Explorer Panel** on the left to navigate files.
2. Open files in multiple editor **Tabs** or close them.
3. Access the **Interactive Terminal** at the bottom to execute custom shell commands.
4. Open the **Command Palette** by pressing \`Ctrl + Shift + P\` (or click the status bar shortcut) to browse all workspace operations.
`;

export const projectsData: Project[] = [
  {
    id: "zero-bank",
    name: "Zero Bank",
    tagline: "Ultra-secure digitized banking solution optimized for rural financial coverage.",
    overview: "Zero Bank is a premium web application developed to handle safe, transaction-intensive banking workflows while providing an incredibly fast and fluid client experience.",
    problem: "Existing regional baking portals suffer from extreme network latency and heavy bundle sizes, isolating users in rural areas with poor connectivity.",
    solution: "We designed a lightweight next-generation React platform backed by edge server rendering and localized offline caching.",
    features: [
      "Real-time wallet and transaction history",
      "Instant transfer with 2-factor authentication validation",
      "Dynamic charts for income vs. expenses",
      "Comprehensive downloadable PDF statements"
    ],
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS v4", "Supabase", "Framer Motion"],
    architecture: "Edge server caching with PostgreSQL state management.",
    liveUrl: "https://sabeer-ai.vercel.app",
    githubUrl: "https://github.com/sabeerhub",
    lessonsLearned: "Implementing dynamic rendering over slow network thresholds proved that pre-fetching static layouts holds extreme importance.",
    futureImprovements: ["Biometric verification integration via WebAuthn", "Off-grid SMS transaction triggers"],
    image: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "fud-health-management-system",
    name: "FUD Health Management System",
    tagline: "The premier healthcare digitization suite for medical records, patient checkups, and triage.",
    overview: "An enterprise-grade health management portal designed to streamline hospital activities, secure electronic health records (EHR), and manage real-time appointments.",
    problem: "Over-reliance on paper charts led to clinical delays, lost patient history, and long queues at the university clinic.",
    solution: "Replaced legacy record-keeping with a real-time reactive patient portal and internal staff triage dashboard.",
    features: [
      "Secured digital EHR storage and lookups",
      "Dynamic triage queue tracker for nurses",
      "E-Prescription automation and pharmacy inventory",
      "Medical staff analytics dashboard"
    ],
    techStack: ["React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"],
    architecture: "RESTful API client with microservices for authentication, patient records, and pharmacy queues.",
    liveUrl: "https://sabeer-ai.vercel.app",
    githubUrl: "https://github.com/sabeerhub",
    lessonsLearned: "Ensuring HIPPA-like privacy standards in client application states requires robust token refresh behaviors and automated session timeouts.",
    futureImprovements: ["AI-based diagnosis suggestion assistant", "SMS triage alerts for emergency rooms"],
    image: "https://images.unsplash.com/photo-1538108176447-280586497dee?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "timelux",
    name: "TimeLux",
    tagline: "Elite interactive timekeeping, task synchronization, and high-productivity planner.",
    overview: "An interactive workspace tracker that blends beautiful high-performance micro-interactions with advanced Pomodoro, project milestones, and developer metrics logging.",
    problem: "Most time-tracking tools are distracting, overly cluttered, and lack native integration with code editor focus schedules.",
    solution: "An immersive, minimalist hub with visual code integrations and interactive progress wheels.",
    features: [
      "Custom task timers with automated focus settings",
      "Real-time visual reports of daily focus milestones",
      "Keyboard shortcut layouts matching core editor commands",
      "Offline database local storage sync"
    ],
    techStack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS v4"],
    architecture: "State driven localized store with background worker persistence.",
    liveUrl: "https://sabeer-ai.vercel.app",
    githubUrl: "https://github.com/sabeerhub",
    lessonsLearned: "Custom timer loops in JS can drift; syncing with high-precision requestAnimationFrame is essential for microsecond timing.",
    futureImprovements: ["Native VS Code plugin companion", "Team focus dashboard syncing"],
    image: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "spark-chat",
    name: "Spark Chat",
    tagline: "Blazing fast real-time messaging application.",
    overview: "A highly collaborative and lightweight instant messaging tool featuring private channels, file attachments, and customizable workspaces.",
    problem: "Standard web-based chat apps suffer from slow WebSockets re-connection logic and high battery drain on mobile browsers.",
    solution: "Engineered ultra-lean state synchronization with aggressive local caches.",
    features: [
      "Instant group messaging channels",
      "Rich text formatting, emoji picker, and markdown parsing",
      "Drag-and-drop attachment file sharing",
      "Global presence indicators"
    ],
    techStack: ["React", "TypeScript", "Supabase Realtime", "Tailwind CSS"],
    architecture: "Subscription-based publish/subscribe socket architecture with a secure JWT authentication layer.",
    liveUrl: "https://sabeer-ai.vercel.app",
    githubUrl: "https://github.com/sabeerhub",
    lessonsLearned: "Handling massive list renders on chat scroll requires lightweight DOM virtualization.",
    futureImprovements: ["Fully end-to-end encrypted chats (E2EE)", "Automated AI conversational summary bots"],
    image: "https://images.unsplash.com/photo-1611605698335-8b15d27e03f3?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "connect-call",
    name: "Connect Call",
    tagline: "Premium video-conferencing tool with direct file integrations and live chat.",
    overview: "An in-browser peer-to-peer audio/video conferencing platform optimized for slow connections and immediate screen-sharing.",
    problem: "Standard heavy conferencing software requires installations or breaks on mobile safari/chrome.",
    solution: "Rebuilt standard WebRTC pipelines inside a responsive React app with adaptive video bitrates.",
    features: [
      "High-definition video and clean audio streaming",
      "Instant multi-user screen sharing",
      "Embedded code-snippet collaborative editor during calls",
      "In-call real-time file repository"
    ],
    techStack: ["Next.js", "WebRTC", "TypeScript", "Tailwind CSS", "Socket.io"],
    architecture: "Mesh video networking utilizing WebRTC with an adaptive signaling server.",
    liveUrl: "https://sabeer-ai.vercel.app",
    githubUrl: "https://github.com/sabeerhub",
    lessonsLearned: "Video resolution scaling during network drops must be automated via client-side bandwidth estimation.",
    futureImprovements: ["SFU integration to handle 50+ callers seamlessly", "Automated transcribing services"],
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "weatherview",
    name: "WeatherView",
    tagline: "Gorgeous weather forecasting app featuring animated canvas visuals and maps.",
    overview: "A beautiful weather tracking system with immersive, particle-rendered dynamic canvas effects matching the target city's weather.",
    problem: "Static weather listings look dull and fail to give users immediate environmental awareness.",
    solution: "Used HTML5 Canvas integrated directly with state machines to render snow, rain, thunder, and wind speed in real-time.",
    features: [
      "Dynamic geographic weather lookup with live GPS integration",
      "HTML5 Canvas particle physics matching the weather status",
      "Detailed 7-day atmospheric pressure and humidity timelines",
      "Offline cache support for viewed cities"
    ],
    techStack: ["React 19", "HTML5 Canvas", "Tailwind CSS v4", "OpenWeather API"],
    architecture: "Static layout with server-side API proxy caching to prevent key exposure.",
    liveUrl: "https://sabeer-ai.vercel.app",
    githubUrl: "https://github.com/sabeerhub",
    lessonsLearned: "Canvas painting requires careful management of animation frame loops to maintain 60FPS on low-end mobile devices.",
    futureImprovements: ["Tornado & major storm warning audio alerts", "Climate change historical graphs"],
    image: "https://images.unsplash.com/photo-1530908268418-ec1f0dbdbb28?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "aura-pay",
    name: "Aura Pay",
    tagline: "Sleek and robust African fintech platform supporting utility payments, wallets, and scans.",
    overview: "A comprehensive e-wallet and money transfer framework designed specifically for seamless payment processing within Nigerian markets.",
    problem: "Local payment methods are fragmented, unreliable, and frequently fail during bank server bottlenecks.",
    solution: "Designed a multi-provider payment route selector that automatically retries transactions via different banking pipelines.",
    features: [
      "Secure instant deposits and peer-to-peer wallet transfers",
      "Utility bills automated scheduling",
      "QR code scanning for quick local physical checkout",
      "Automated fraud and transaction-pattern anomaly checks"
    ],
    techStack: ["Next.js 15", "TypeScript", "Supabase", "Paystack API", "Framer Motion"],
    architecture: "Microservices routing to distinct local PSP aggregators with webhook retry architectures.",
    liveUrl: "https://sabeer-ai.vercel.app",
    githubUrl: "https://github.com/sabeerhub",
    lessonsLearned: "Handling asynchronous webhooks requires idempotency tokens in PostgreSQL databases to avoid double payouts.",
    futureImprovements: ["USSD payment integration for non-internet mobile networks", "Automated crypto payouts"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1d704d3?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "virtual-topup",
    name: "Virtual Topup",
    tagline: "Automated telecom airtime and data recharging platform.",
    overview: "A rapid-checkout web platform for users to buy airtime, internet data, and cable TV subscriptions at bulk wholesale rates with automated instant deliveries.",
    problem: "Airtime loading from banking apps is slow, expensive, and fails to give discounts for enterprise reloaders.",
    solution: "An API-driven reloading framework connected directly to telecommunication gateways in real-time.",
    features: [
      "Bulk spreadsheet user uploads for group network top-ups",
      "Direct API integrations for external reseller stores",
      "Real-time wallet auto-refilling system",
      "Automated WhatsApp status notification for success confirmation"
    ],
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    architecture: "Stateful task runner scheduling concurrent socket calls to major mobile networks.",
    liveUrl: "https://sabeer-ai.vercel.app",
    githubUrl: "https://github.com/sabeerhub",
    lessonsLearned: "Managing high concurrency on API keys requires local token-bucket rate limiters.",
    futureImprovements: ["Automatic data plan renewal matching consumption speed", "Voice-prompt offline recharges"],
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "icall-pro",
    name: "iCall Pro",
    tagline: "Corporate VoIP and virtual assistance telephony portal.",
    overview: "A highly unified customer support caller interface linking SIP call agents directly to in-browser active customer metrics.",
    problem: "Call center operators waste time tabbing between their software phone and database systems.",
    solution: "Unified them into a beautiful, reactive, zero-install WebRTC browser interface.",
    features: [
      "Automated predictive outbound calling list dialer",
      "High fidelity VoIP call engine built directly with Twilio SDK",
      "Interactive agent scratchpad and customer details sidebar",
      "Live supervisor performance analytics charts"
    ],
    techStack: ["Next.js 15", "TypeScript", "Twilio SDK", "Tailwind CSS", "Recharts"],
    architecture: "WebSocket state container syncing active telephony status between Twilio signaling and the DB layout.",
    liveUrl: "https://sabeer-ai.vercel.app",
    githubUrl: "https://github.com/sabeerhub",
    lessonsLearned: "SIP network delay requires immediate optimism indicators to assure the agent the click registered.",
    futureImprovements: ["Real-time customer voice sentiment parsing", "Auto AI transcript summaries"],
    image: "https://images.unsplash.com/photo-1521791136368-1a46827d0adf?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "sabeer-xpress",
    name: "Sabeer Xpress",
    tagline: "On-demand hyperlocal logistics, tracking, and delivery system.",
    overview: "A rapid logistics engine optimized for scheduling, assigning, and routing local package dispatch riders across Dutse metropolis.",
    problem: "Sellers struggle to find reliable courier agents, and manual dispatcher assignments lead to routing conflicts.",
    solution: "We designed a automated route-matching system matching distance clusters and traffic conditions.",
    features: [
      "Real-time dispatch maps with live package location markers",
      "Automatic closest-dispatcher dispatch notification",
      "Proof of delivery via secure mobile scanner uploads",
      "Dynamic pricing matching weight, weather, and traffic"
    ],
    techStack: ["React Native", "TypeScript", "Google Maps API", "Supabase PostgreSQL"],
    architecture: "Serverless geospatial queries utilizing PostGIS for lightning-fast matching calculations.",
    liveUrl: "https://sabeer-ai.vercel.app",
    githubUrl: "https://github.com/sabeerhub",
    lessonsLearned: "Geographical polling must be intelligently throttled to preserve delivery agent mobile phone batteries.",
    futureImprovements: ["Autonomous drone delivery interfaces", "Inter-city automated cargo coordination"],
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "schlverse",
    name: "Schlverse",
    tagline: "High-grade immersive e-learning environment and classroom software.",
    overview: "A immersive digital academy portal that organizes remote video classrooms, grade books, quizzes, and live assignments in one beautiful web interface.",
    problem: "Most virtual classrooms are dull, disconnected, and difficult for non-technical instructors to operate.",
    solution: "Crafted an extremely tactile, simplified portal focusing heavily on high-fidelity dashboard animations and widgets.",
    features: [
      "Interactive live blackboard with real-time multi-student draws",
      "Highly structured curriculum path visual tracking maps",
      "Auto-graded quizzes with progress metric graphs",
      "Embedded text/code sandboxes for collaborative group tasks"
    ],
    techStack: ["Next.js", "TypeScript", "Socket.io", "Framer Motion", "Tailwind CSS"],
    architecture: "Redux-coordinated web sockets with persistent PostgreSQL database layers.",
    liveUrl: "https://sabeer-ai.vercel.app",
    githubUrl: "https://github.com/sabeerhub",
    lessonsLearned: "Syncing collaborative drawing paths on high-density displays requires vector path smoothing algorithms.",
    futureImprovements: ["AI study guides personalized to student weaknesses", "Immersive VR classrooms integration"],
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "submitiv",
    name: "SubmitIV",
    tagline: "Streamlined modern paper submission and expert peer review management tool.",
    overview: "A sophisticated portal designed for academic journals to securely intake research papers, assign blind reviewers, and monitor revision timelines.",
    problem: "Legacy peer-review software has confusing, outdated tabular structures that discourage academic participation.",
    solution: "An elegant, status-based kanban system tracking papers from submission to publication.",
    features: [
      "Automated duplicate and plagiarism check hooks",
      "Dynamic editor kanban tracking review pipelines",
      "Secure double-blind reviewer assignment modules",
      "High-fidelity responsive PDF previewer in-app"
    ],
    techStack: ["React 19", "TypeScript", "Tailwind CSS v4", "Node.js", "PostgreSQL"],
    architecture: "Dynamic workflow state-machine representing sequential stages of editorial reviews.",
    liveUrl: "https://sabeer-ai.vercel.app",
    githubUrl: "https://github.com/sabeerhub",
    lessonsLearned: "File parsing pipelines must isolate metadata thoroughly to guarantee the double-blind status of academic files.",
    futureImprovements: ["AI abstract parser to recommend ideal reviewers", "Blockchain-backed verification of academic credentials"],
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "eventverse",
    name: "EventVerse",
    tagline: "Dynamic ticketing, seat bookings, and localized social gathering hub.",
    overview: "A high-fidelity social event system where users can organize, purchase tickets, and view physical 3D-simulated venue seating maps in-browser.",
    problem: "Ticket purchase workflows are slow, and selecting exact venue seats is impossible on standard mobile ticketing sites.",
    solution: "Created an interactive SVG-based dynamic seat picker that updates live reservations instantly via client listeners.",
    features: [
      "Real-time ticketing with automated secure barcode generation",
      "SVG Seat Booking visual mapping tool",
      "Dynamic user RSVP profiles with proximity event alerts",
      "Organizer dashboard with real-time gross revenue tracking"
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase Realtime"],
    architecture: "Interactive layout map SVG canvas linked to dynamic database status indexes.",
    liveUrl: "https://sabeer-ai.vercel.app",
    githubUrl: "https://github.com/sabeerhub",
    lessonsLearned: "SVG manipulations inside React perform faster when state is isolated to independent room grids rather than the entire venue.",
    futureImprovements: ["WebXR 3D VR seat walkthroughs", "Cryptographic NFT proof of entry badges"],
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "time-ng",
    name: "TIME-NG",
    tagline: "Comprehensive analytical tracking tool for national development markers and investments.",
    overview: "An intelligence and analytics portal tracking federal developmental indicators, healthcare project expenditures, and school building timelines in Nigeria.",
    problem: "Public project metrics are scattered, confusingly formatted, and not open to analytical civic evaluation.",
    solution: "Organized massive government-source databases into structured dashboards, clean charts, and interactive maps.",
    features: [
      "Interactive geographical map of federal infrastructure projects",
      "Dynamic analytical charts sorting projects by budget vs. completion",
      "Public feedback reporting tool and photo uploader",
      "Comprehensive CSV datasets exporter"
    ],
    techStack: ["React", "TypeScript", "Recharts", "Mapbox GL", "Tailwind CSS"],
    architecture: "Fast static site generation (SSG) with revalidation schedules to feed live datasets without loading delays.",
    liveUrl: "https://sabeer-ai.vercel.app",
    githubUrl: "https://github.com/sabeerhub",
    lessonsLearned: "Rendering high-volume geographical data requires cluster-mapping algorithms on Leaflet/Mapbox states.",
    futureImprovements: ["Automatic budget anomalies AI flag system", "SMS alert subscriptions for regional projects"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=60"
  }
];

export const galleryImages = [
  {
    id: "img-1",
    title: "Sabeer Workspace Setup",
    category: "Office",
    url: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=1000&auto=format&fit=crop&q=80",
    description: "Mustapha Abdulsalam's developer workplace, featuring minimalist peripherals and visual editor environments."
  },
  {
    id: "img-2",
    title: "Premium Component Mockup",
    category: "Design",
    url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1000&auto=format&fit=crop&q=80",
    description: "Designing the custom editor theme with detailed pixel matching specifications."
  },
  {
    id: "img-3",
    title: "Dynamic Analytics Interface",
    category: "Development",
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80",
    description: "Complex charts and layout statistics engineered for tracking performance."
  }
];

export const blogPosts = [
  {
    id: "blog-1",
    title: "Building the Ultimate VS Code Experience in the Browser",
    date: "July 12, 2026",
    excerpt: "How I engineered a fully interactive IDE portfolio from scratch with React 19, custom terminal parser, and Monaco editor.",
    content: `## Designing a Real Editor Workspace in a Browser

When standard portfolios became predictable, I set out to build a fully immersive developer workspace. The result is Sabeer Workspace: a fully functioning replica of **VS Code**.

### Core Technical Hurdles:
1. **Dynamic Tab States:** Rebuilding how buffers open, switch, and persist across user reloads.
2. **Real-time Terminal parser:** Creating a synthetic shell parsing custom flags, supporting an active command history index, and rendering ASCII banners on execution.
3. **Optimized Render Pipeline:** Ensuring zero layout shift while rendering heavy plugins like the Monaco code editor.

### Designing the Shell
Using absolute pixel coordinates, we structured the traditional layout:
- **Activity Bar:** 48px wide, housing icons for Explorer, Search, Source Control, and Settings.
- **Sidebar:** 260px wide, supporting expandable tree-view folders.
- **Editor Panel:** The focal container handling tabs and text workspaces.
- **Status Bar:** Bottom footer capturing git branches, file details, and notification banners.

The beauty of this is that the entire portfolio feels alive. It transforms a passive resume reading into an immersive interactive playground.`
  },
  {
    id: "blog-2",
    title: "How Tailwind CSS v4 Transforms UI Systems Engineering",
    date: "June 28, 2026",
    excerpt: "Deep diving into the next-generation engine features of Tailwind and how to leverage custom CSS-only variables.",
    content: `## The Next Frontier in CSS: Tailwind CSS v4

The release of Tailwind CSS v4 marks a massive milestone in frontend utility engineering. With native CSS variables orchestration, compile times have dropped, and customizations are cleaner than ever.

### Major Enhancements Explored:
- **Zero-Config CSS Engine:** No more bloated configurations. Your CSS files dictate the theme variables natively.
- **Automatic Light/Dark Variables:** Using native media-query mappings without repeating color strings in your classlists.
- **Sub-grid and Grid Enhancements:** Building complex IDE layouts is much simpler with out-of-the-box grid-layout variables.

By utilizing CSS variables like \`--sidebar-bg\` and \`--accent-blue\` directly within the global stylesheet, our VS Code theme updates automatically and integrates seamlessly into Framer Motion animations.`
  }
];

export const WORKSPACE_FILES: FileItem[] = [
  { name: "README.md", path: "README.md", type: "file", content: rawReadmeMd, language: "markdown" },
  { name: "about.ts", path: "about.ts", type: "file", content: rawAboutCode, language: "typescript" },
  { name: "experience.ts", path: "experience.ts", type: "file", content: rawExperienceCode, language: "typescript" },
  { name: "skills.json", path: "skills.json", type: "file", content: rawSkillsJson, language: "json" },
  { name: "tech-stack.ts", path: "tech-stack.ts", type: "file", content: rawTechStackCode, language: "typescript" },
  { name: "services.ts", path: "services.ts", type: "file", content: rawServicesCode, language: "typescript" },
  {
    name: "projects",
    path: "projects",
    type: "directory",
    children: projectsData.map(p => ({
      name: `${p.id}.json`,
      path: `projects/${p.id}.json`,
      type: "file",
      content: JSON.stringify(p, null, 2),
      language: "json"
    }))
  },
  {
    name: "gallery",
    path: "gallery",
    type: "directory",
    children: galleryImages.map(img => ({
      name: `${img.id}.png`,
      path: `gallery/${img.id}.png`,
      type: "file",
      content: img.url,
      language: "image"
    }))
  },
  {
    name: "blogs",
    path: "blogs",
    type: "directory",
    children: blogPosts.map(post => ({
      name: `${post.id}.md`,
      path: `blogs/${post.id}.md`,
      type: "file",
      content: post.content,
      language: "markdown"
    }))
  },
  { name: "contact.ts", path: "contact.ts", type: "file", content: rawContactCode, language: "typescript" },
  { name: "terminal.sh", path: "terminal.sh", type: "file", content: rawTerminalSh, language: "shell" }
];
