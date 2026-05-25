export type WorkflowStatus = "Active" | "Paused" | "Draft";

// A "workflow" in PromptOps is a captured Workflow DNA pattern: an expert prompt chain
// fingerprinted by the platform and reusable across the team.
export interface Workflow {
  id: string;
  name: string;
  department: string;
  status: WorkflowStatus;
  efficiency: number; // composite Logic Score (0-100)
  lastRun: string;
  runs: number;
  owner: string;
  description: string;
  dnaScore: number; // PromptOps DNA fingerprint strength
  clones: number; // times reused across the team
  model: "GPT-4o" | "Claude Sonnet 4.6" | "Gemini 2.5" | "Llama 4";
  hallucinationRate: number; // % of recent runs flagged by PFFE
}

export interface Automation {
  id: string;
  name: string;
  icon: string;
  trigger: string;
  action: string;
  runs: number;
  status: WorkflowStatus;
  category: string;
  enabled: boolean;
}

export interface ReportItem {
  id: string;
  title: string;
  type: "Forensics" | "Compliance" | "Performance" | "DNA Library" | "Financial";
  generated: string;
  size: string;
  author: string;
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  connected: boolean;
  color: string;
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  plan: string;
  status: "Paid" | "Pending" | "Failed";
}

export interface TeamPerformer {
  id: string;
  name: string;
  role: string;
  team: string;
  score: number;
  workflowsOwned: number;
  trend: number;
}

export interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  category: "email" | "push" | "in-app";
}

export type ForensicSeverity = "Low" | "Medium" | "High" | "Critical";
export type ForensicType =
  | "Hallucination"
  | "Context Drift"
  | "Logic Error"
  | "Tone Mismatch"
  | "Compliance Risk";

export interface ForensicEvent {
  id: string;
  workflow: string;
  type: ForensicType;
  severity: ForensicSeverity;
  detectedAt: string;
  model: Workflow["model"];
  summary: string;
  resolved: boolean;
}

export interface ComplianceCheck {
  id: string;
  principle: string; // e.g. "Transparency", "Fairness"
  framework: "ICO" | "UK GDPR" | "DSIT AI Principles" | "Cyber Essentials";
  status: "Pass" | "Review" | "Fail";
  coverage: number; // 0-100
  lastAudit: string;
  notes: string;
}

export interface CommunityNode {
  id: string;
  firm: string; // anonymised peer firm name
  region: string;
  sector: string;
  sharedDNA: number;
  contributions: number;
  reliability: number; // 0-100
}

export interface SharedDNA {
  id: string;
  name: string;
  sector: string;
  contributor: string; // anonymised
  uses: number;
  rating: number; // 0-5
  hallucinationReduction: number; // %
  imported: boolean;
}

export interface PlanTier {
  id: "logic-core" | "dna-architect" | "logic-sovereign";
  name: string;
  price: number; // £ / month
  cadence: "month" | "month-volume";
  audience: string;
  highlights: string[];
  popular?: boolean;
}

// Sparkline data shape
export const sparkData = (seed: number) =>
  Array.from({ length: 14 }, (_, i) => ({
    x: i,
    y: Math.round(40 + Math.sin(i * 0.6 + seed) * 14 + i * (seed % 3) * 1.4 + (seed * 3) % 10),
  }));

/**
 * Centralized chart palette — Stripe-inspired:
 * primary indigo + complementary navy / sky / coral / emerald / amber / slate.
 */
export const chartPalette = {
  indigo: "#635BFF",
  indigoDeep: "#4F46E5",
  navy: "#0A2540",
  sky: "#0EA5E9",
  emerald: "#10B981",
  amber: "#F59E0B",
  coral: "#FB7185",
  slate: "#64748B",
  cloud: "#CBD5E1",
};

export const chartSeries = [
  chartPalette.indigo,
  chartPalette.sky,
  chartPalette.emerald,
  chartPalette.amber,
  chartPalette.coral,
  chartPalette.slate,
];

// Top-line metrics on the Overview page — mirror the 8-week pilot results
// reported on the marketing site: +28% speed, -18% hallucinations, 4.3/5 Logic Score, 14d proficiency.
export const metrics = [
  {
    key: "logic-score",
    label: "Avg Logic Score",
    value: "4.3 / 5",
    delta: 12,
    deltaLabel: "+12% vs pilot baseline",
    accent: chartPalette.indigo,
    sparkSeed: 1,
  },
  {
    key: "hallucination-rate",
    label: "Hallucinations Caught",
    value: "-18%",
    delta: -18,
    deltaLabel: "PFFE vs unguarded LLM",
    accent: chartPalette.coral,
    sparkSeed: 2,
  },
  {
    key: "task-speed",
    label: "Task Speed Gain",
    value: "+28%",
    delta: 28,
    deltaLabel: "across 5 UK firms",
    accent: chartPalette.sky,
    sparkSeed: 3,
  },
  {
    key: "time-to-proficiency",
    label: "Time-to-Proficiency",
    value: "14 days",
    delta: -68,
    deltaLabel: "down from 45-day avg",
    accent: chartPalette.emerald,
    sparkSeed: 4,
  },
];

// Areas where PFFE + DNA cloning suggest the biggest next wins
export const improvementAreas = [
  { name: "Client engagement drafting", percent: 88 },
  { name: "Discovery & research synthesis", percent: 79 },
  { name: "Regulatory & ICO reporting", percent: 71 },
  { name: "Pitch & proposal generation", percent: 64 },
  { name: "Knowledge handoff to juniors", percent: 58 },
];

// Bars on the Overview "Logic Cloning Impact" card — shows DNA reuse trend
export const automationImpactBars = [
  { name: "Jan", high: 22, med: 14, low: 8 },
  { name: "Feb", high: 28, med: 18, low: 10 },
  { name: "Mar", high: 36, med: 22, low: 12 },
  { name: "Apr", high: 44, med: 24, low: 14 },
  { name: "May", high: 58, med: 30, low: 16 },
  { name: "Jun", high: 76, med: 34, low: 18 },
];

// Firm types: IT Services, Consulting, SaaS/Product Company, Research & Development.
export const workflows: Workflow[] = [
  { id: "wf-001", name: "Client Engagement Letter Draft", department: "Client Communication", status: "Active", efficiency: 94, lastRun: "2026-05-24T08:14:00Z", runs: 1284, owner: "Maya Patel", description: "Generate compliant engagement letters from intake form input.", dnaScore: 96, clones: 14, model: "Claude Sonnet 4.6", hallucinationRate: 1.2 },
  { id: "wf-002", name: "Discovery Document Synthesis", department: "Research / Analysis", status: "Active", efficiency: 89, lastRun: "2026-05-24T07:32:00Z", runs: 612, owner: "Daniel Cho", description: "Summarise 200-page bundles into client-ready briefs with cited references.", dnaScore: 92, clones: 9, model: "Claude Sonnet 4.6", hallucinationRate: 2.1 },
  { id: "wf-003", name: "Tax Advisory Note Generator", department: "Consulting / Delivery", status: "Active", efficiency: 87, lastRun: "2026-05-24T06:55:00Z", runs: 4124, owner: "Sofia Reyes", description: "Advisory note from client position, aligned to regulatory requirements.", dnaScore: 90, clones: 22, model: "GPT-4o", hallucinationRate: 1.8 },
  { id: "wf-004", name: "Bid Response Composer", department: "Consulting / Delivery", status: "Paused", efficiency: 78, lastRun: "2026-05-22T15:11:00Z", runs: 304, owner: "Liam Wright", description: "Assemble tender responses from past-win library + new RFP.", dnaScore: 81, clones: 6, model: "GPT-4o", hallucinationRate: 3.4 },
  { id: "wf-005", name: "IT Audit Risk Brief", department: "Coding / Development", status: "Active", efficiency: 95, lastRun: "2026-05-24T10:02:00Z", runs: 821, owner: "Aisha Khan", description: "Convert scan output into a client-readable risk brief with remediation steps.", dnaScore: 94, clones: 11, model: "Claude Sonnet 4.6", hallucinationRate: 0.9 },
  { id: "wf-006", name: "Contract Renewal Reminders", department: "Client Communication", status: "Active", efficiency: 82, lastRun: "2026-05-24T06:00:00Z", runs: 142, owner: "Noah Bennett", description: "Auto-notify owners 60 / 30 / 7 days pre-renewal with redline summary.", dnaScore: 78, clones: 4, model: "Gemini 2.5", hallucinationRate: 2.8 },
  { id: "wf-007", name: "Brand Guidelines Generator", department: "Strategic Insights", status: "Active", efficiency: 86, lastRun: "2026-05-23T16:42:00Z", runs: 78, owner: "Priya Shah", description: "Turn brand voice notes into a full style guide.", dnaScore: 84, clones: 3, model: "Claude Sonnet 4.6", hallucinationRate: 1.4 },
  { id: "wf-008", name: "Vendor Due Diligence Check", department: "Workflow Automation", status: "Draft", efficiency: 64, lastRun: "2026-05-19T10:30:00Z", runs: 22, owner: "Marco Bianchi", description: "Validate vendor docs and produce GDPR risk score.", dnaScore: 67, clones: 0, model: "GPT-4o", hallucinationRate: 5.2 },
  { id: "wf-009", name: "Campaign Performance Roll-up", department: "Strategic Insights", status: "Active", efficiency: 83, lastRun: "2026-05-24T05:00:00Z", runs: 412, owner: "Hannah Lee", description: "Daily multi-channel performance brief for agency clients.", dnaScore: 80, clones: 7, model: "Gemini 2.5", hallucinationRate: 2.4 },
  { id: "wf-010", name: "Quarterly Close Narrative", department: "Reporting / Documentation", status: "Paused", efficiency: 71, lastRun: "2026-04-30T22:00:00Z", runs: 4, owner: "Maya Patel", description: "Generate the board narrative around quarter-end financials.", dnaScore: 72, clones: 1, model: "Claude Sonnet 4.6", hallucinationRate: 4.0 },
  { id: "wf-011", name: "Refund Decision Letter", department: "Client Communication", status: "Active", efficiency: 89, lastRun: "2026-05-24T09:50:00Z", runs: 932, owner: "Aisha Khan", description: "Draft refund verdict with policy citations & fraud screen.", dnaScore: 88, clones: 8, model: "GPT-4o", hallucinationRate: 1.6 },
  { id: "wf-012", name: "ICO Evidence Collection", department: "Workflow Automation", status: "Active", efficiency: 91, lastRun: "2026-05-23T11:15:00Z", runs: 36, owner: "Ethan Park", description: "Pull evidence packs aligned to UK ICO/DSIT principles weekly.", dnaScore: 93, clones: 2, model: "Claude Sonnet 4.6", hallucinationRate: 0.7 },
  { id: "wf-013", name: "Pitch Deck Outline", department: "Strategic Insights", status: "Active", efficiency: 84, lastRun: "2026-05-24T04:30:00Z", runs: 218, owner: "Olivia Martin", description: "Sector-aware pitch deck outline + slide notes.", dnaScore: 79, clones: 5, model: "Gemini 2.5", hallucinationRate: 2.9 },
  { id: "wf-014", name: "Sales Forecast Sync", department: "Consulting / Delivery", status: "Draft", efficiency: 58, lastRun: "2026-05-18T13:20:00Z", runs: 11, owner: "Sofia Reyes", description: "Sync CRM forecasts to data warehouse with anomaly notes.", dnaScore: 62, clones: 0, model: "GPT-4o", hallucinationRate: 4.8 },
  { id: "wf-015", name: "Help Centre Re-indexer", department: "Client Communication", status: "Active", efficiency: 92, lastRun: "2026-05-24T03:00:00Z", runs: 156, owner: "Noah Bennett", description: "Re-index help centre after edits and grade article clarity.", dnaScore: 90, clones: 4, model: "Claude Sonnet 4.6", hallucinationRate: 1.1 },
  { id: "wf-016", name: "Payroll Anomaly Detector", department: "Reporting / Documentation", status: "Active", efficiency: 82, lastRun: "2026-05-22T19:00:00Z", runs: 24, owner: "Priya Shah", description: "Flag outliers and draft manager review notes before payroll run.", dnaScore: 85, clones: 2, model: "GPT-4o", hallucinationRate: 1.9 },
  { id: "wf-017", name: "Client NPS Follow-up", department: "Client Communication", status: "Paused", efficiency: 67, lastRun: "2026-05-20T14:45:00Z", runs: 188, owner: "Daniel Cho", description: "Loop in account lead on detractor responses with talking points.", dnaScore: 70, clones: 3, model: "Gemini 2.5", hallucinationRate: 3.6 },
  { id: "wf-018", name: "DPIA Draft (UK GDPR)", department: "Workflow Automation", status: "Active", efficiency: 93, lastRun: "2026-05-24T08:00:00Z", runs: 64, owner: "Yuki Tanaka", description: "Draft Data Protection Impact Assessments aligned to UK GDPR.", dnaScore: 95, clones: 6, model: "Claude Sonnet 4.6", hallucinationRate: 0.6 },
];

export const departments = Array.from(new Set(workflows.map((w) => w.department))).sort();

// "Automations" are now Logic Triggers — small rules that fire DNA workflows on events.
export const automations: Automation[] = [
  { id: "auto-001", name: "Slack New RFP Alert", icon: "Bell", trigger: "New RFP in HubSpot", action: "Post brief to #bid-team", runs: 1248, status: "Active", category: "Consulting / Delivery", enabled: true },
  { id: "auto-002", name: "Invoice → SharePoint", icon: "FileText", trigger: "New invoice email", action: "Archive PDF to SharePoint", runs: 842, status: "Active", category: "Reporting / Documentation", enabled: true },
  { id: "auto-003", name: "Daily Digest", icon: "MessageSquare", trigger: "Weekday 9:00am", action: "DM team yesterday's activity notes", runs: 312, status: "Active", category: "Client Communication", enabled: true },
  { id: "auto-004", name: "Bug Report → Linear", icon: "Bug", trigger: "Form submission", action: "Create Linear ticket with DNA tag", runs: 96, status: "Paused", category: "Coding / Development", enabled: false },
  { id: "auto-005", name: "Calendar → Notion Minutes", icon: "Calendar", trigger: "Meeting ends", action: "Synthesise notes via DNA pattern", runs: 624, status: "Active", category: "Workflow Automation", enabled: true },
  { id: "auto-006", name: "Stripe → Sheets", icon: "DollarSign", trigger: "Stripe payment", action: "Log row in Sheets (GBP)", runs: 1980, status: "Active", category: "Reporting / Documentation", enabled: true },
  { id: "auto-007", name: "GitHub PR Reviewer", icon: "GitPullRequest", trigger: "PR opened", action: "Run review DNA + assign reviewer", runs: 514, status: "Active", category: "Coding / Development", enabled: true },
  { id: "auto-008", name: "NPS Survey Send", icon: "Star", trigger: "Client 30d active", action: "Send survey via Intercom", runs: 207, status: "Paused", category: "Client Communication", enabled: false },
  { id: "auto-009", name: "Expense Slack Approval", icon: "CheckCircle", trigger: "Expense > £500", action: "Slack approval to partner", runs: 88, status: "Active", category: "Reporting / Documentation", enabled: true },
  { id: "auto-010", name: "Onboarding Email Drip", icon: "Mail", trigger: "Signup complete", action: "Trigger 7-step Mailchimp drip", runs: 1432, status: "Active", category: "Strategic Insights", enabled: true },
  { id: "auto-011", name: "Server Alert → PagerDuty", icon: "AlertTriangle", trigger: "CPU > 90% for 5m", action: "Page on-call engineer", runs: 41, status: "Active", category: "Coding / Development", enabled: true },
  { id: "auto-012", name: "Contract Expiry Reminder", icon: "FileSignature", trigger: "30d before renewal", action: "Email account owner + draft note", runs: 62, status: "Draft", category: "Client Communication", enabled: false },
];

export const reports: ReportItem[] = [
  { id: "r-001", title: "Q2 Workflow DNA Performance", type: "Performance", generated: "2026-05-22T10:00:00Z", size: "2.4 MB", author: "Maya Patel" },
  { id: "r-002", title: "Monthly Cost Savings Breakdown", type: "Financial", generated: "2026-05-21T08:30:00Z", size: "1.1 MB", author: "Daniel Cho" },
  { id: "r-003", title: "ICO Audit Evidence Pack — May", type: "Compliance", generated: "2026-05-20T16:45:00Z", size: "5.8 MB", author: "Ethan Park" },
  { id: "r-004", title: "PFFE Hallucination Forensics", type: "Forensics", generated: "2026-05-19T12:15:00Z", size: "3.2 MB", author: "Hannah Lee" },
  { id: "r-005", title: "Workflow DNA Library Index", type: "DNA Library", generated: "2026-05-18T07:00:00Z", size: "920 KB", author: "Olivia Martin" },
  { id: "r-006", title: "Top 10 Logic Drift Patterns", type: "Forensics", generated: "2026-05-17T14:20:00Z", size: "1.8 MB", author: "Sofia Reyes" },
  { id: "r-007", title: "UK GDPR DPIA Bundle", type: "Compliance", generated: "2026-05-02T18:00:00Z", size: "4.7 MB", author: "Maya Patel" },
  { id: "r-008", title: "Logic Cloning ROI Analysis", type: "Performance", generated: "2026-05-15T11:00:00Z", size: "2.0 MB", author: "Yuki Tanaka" },
];

// Integrations match the website's listed connectors: HubSpot, Slack, Microsoft 365, Salesforce, plus a few common UK SME tools.
export const integrations: Integration[] = [
  { id: "slack", name: "Slack", description: "Send DNA outputs, alerts, and approvals to channels.", category: "Communication", connected: true, color: "bg-[#4A154B]" },
  { id: "ms365", name: "Microsoft 365", description: "Trigger DNA from Outlook, Word, Teams.", category: "Productivity", connected: true, color: "bg-sky-700" },
  { id: "hubspot", name: "HubSpot", description: "Push lead scores and trigger DNA sequences from CRM.", category: "CRM", connected: true, color: "bg-amber-500" },
  { id: "salesforce", name: "Salesforce", description: "Bidirectional sync for CRM records and DNA outcomes.", category: "CRM", connected: false, color: "bg-sky-500" },
  { id: "sharepoint", name: "SharePoint", description: "Archive forensic logs and compliance evidence packs.", category: "Storage", connected: true, color: "bg-blue-700" },
  { id: "notion", name: "Notion", description: "Auto-create matter notes and brief pages from DNA.", category: "Docs", connected: false, color: "bg-neutral-800" },
  { id: "claude", name: "Claude", description: "Run DNA workflows through Claude for advanced AI reasoning and analysis.", category: "AI", connected: false, color: "bg-[#D97757]" },
  { id: "chatgpt", name: "ChatGPT", description: "Connect DNA sequences to ChatGPT for generative outputs and automation.", category: "AI", connected: false, color: "bg-emerald-600" },
];

export const invoices: Invoice[] = [
  { id: "INV-1241", date: "2026-05-01", amount: 380, plan: "DNA Architect", status: "Paid" },
  { id: "INV-1212", date: "2026-04-01", amount: 380, plan: "DNA Architect", status: "Paid" },
  { id: "INV-1183", date: "2026-03-01", amount: 380, plan: "DNA Architect", status: "Paid" },
  { id: "INV-1154", date: "2026-02-01", amount: 100, plan: "Logic Core", status: "Paid" },
  { id: "INV-1125", date: "2026-01-01", amount: 100, plan: "Logic Core", status: "Paid" },
  { id: "INV-1096", date: "2025-12-01", amount: 100, plan: "Logic Core", status: "Failed" },
];

export const teamPerformers: TeamPerformer[] = [
  { id: "p1", name: "Maya Patel", role: "DNA Architect", team: "Coding / Development", score: 98, workflowsOwned: 12, trend: 6 },
  { id: "p2", name: "Aisha Khan", role: "Support Lead", team: "Client Communication", score: 95, workflowsOwned: 9, trend: 4 },
  { id: "p3", name: "Sofia Reyes", role: "Consulting Lead", team: "Consulting / Delivery", score: 92, workflowsOwned: 7, trend: 8 },
  { id: "p4", name: "Yuki Tanaka", role: "Automation Engineer", team: "Workflow Automation", score: 91, workflowsOwned: 6, trend: 3 },
  { id: "p5", name: "Daniel Cho", role: "Client Success Manager", team: "Client Communication", score: 87, workflowsOwned: 5, trend: -2 },
  { id: "p6", name: "Priya Shah", role: "Insights Strategist", team: "Strategic Insights", score: 84, workflowsOwned: 4, trend: 5 },
  { id: "p7", name: "Noah Bennett", role: "Senior Dev Lead", team: "Coding / Development", score: 80, workflowsOwned: 3, trend: 1 },
];

export const performanceByTeam = [
  { team: "Coding / Development", score: 94 },
  { team: "Workflow Automation", score: 92 },
  { team: "Consulting / Delivery", score: 87 },
  { team: "Client Communication", score: 84 },
  { team: "IT Services", score: 90 },
  { team: "Strategic Insights", score: 81 },
  { team: "Reporting / Documentation", score: 78 },
  { team: "Research / Analysis", score: 72 },
];

export const performanceOverTime = [
  { month: "Dec", seniorDevs: 82, consulting: 70, itServices: 75 },
  { month: "Jan", seniorDevs: 84, consulting: 73, itServices: 78 },
  { month: "Feb", seniorDevs: 86, consulting: 76, itServices: 81 },
  { month: "Mar", seniorDevs: 88, consulting: 79, itServices: 84 },
  { month: "Apr", seniorDevs: 91, consulting: 83, itServices: 88 },
  { month: "May", seniorDevs: 94, consulting: 87, itServices: 90 },
];

export const efficiencyTrend30d = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  efficiency: Math.round(58 + Math.sin(i * 0.3) * 6 + i * 0.5 + (i % 5)),
  baseline: Math.round(50 + i * 0.3),
}));

export const efficiencyTrend7d = Array.from({ length: 7 }, (_, i) => ({
  day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
  efficiency: Math.round(72 + Math.sin(i * 0.8) * 5 + i * 0.6),
  baseline: Math.round(60 + i * 0.5),
}));

export const efficiencyTrend90d = Array.from({ length: 12 }, (_, i) => ({
  day: `Wk ${i + 1}`,
  efficiency: Math.round(55 + Math.sin(i * 0.4) * 8 + i * 1.4),
  baseline: Math.round(48 + i * 0.9),
}));

export const departmentDistribution = [
  { name: "Coding / Development", value: 38, color: chartPalette.indigo },
  { name: "Consulting / Delivery", value: 32, color: chartPalette.sky },
  { name: "IT Services", value: 24, color: chartPalette.emerald },
  { name: "Workflow Automation", value: 18, color: chartPalette.amber },
  { name: "Strategic Insights", value: 14, color: chartPalette.coral },
  { name: "Other", value: 22, color: chartPalette.slate },
];

export const weekOverWeek = [
  { area: "Client Comms", thisWeek: 94, lastWeek: 86 },
  { area: "Workflow Auto", thisWeek: 92, lastWeek: 84 },
  { area: "Consulting", thisWeek: 87, lastWeek: 81 },
  { area: "IT Services", thisWeek: 90, lastWeek: 84 },
  { area: "Research", thisWeek: 81, lastWeek: 76 },
];

export const keyInsights = [
  { icon: "TrendingUp", title: "Logic Score climbed 12% this month", stat: "+12%", tone: "good" as const, body: "Average Workflow DNA Logic Score rose from 3.84 to 4.30 — driven by Consulting / Delivery and Coding & Development teams adopting new patterns." },
  { icon: "AlertTriangle", title: "PFFE flagged a context-drift spike", stat: "+38%", tone: "warn" as const, body: "Drift events on Bid Response and Sales Forecast workflows jumped Tue–Thu. Likely a model regression on long contexts." },
  { icon: "Clock", title: "Time-to-proficiency down to 14 days", stat: "14d", tone: "good" as const, body: "New joiners across IT Services and SaaS firms reach founder-level output in 14 days using cloned DNA — vs. 45 days on raw prompting." },
  { icon: "Sparkles", title: "3 new DNA patterns imported from CLN", stat: "3 new", tone: "good" as const, body: "Peer firms in Manchester and Bristol contributed a Research & Analysis, a Workflow Automation, and a Bid Response pattern this week." },
];

export const notificationSettings: NotificationSetting[] = [
  { id: "n1", category: "email", label: "PFFE high-severity alerts", description: "Email me when PFFE detects a Critical or High forensic event.", enabled: true },
  { id: "n2", category: "email", label: "Weekly Logic Score digest", description: "A Monday-morning summary of DNA performance.", enabled: true },
  { id: "n3", category: "email", label: "Cost savings milestones", description: "Notify on every £10k of attributed savings.", enabled: false },
  { id: "n4", category: "push", label: "Critical compliance alerts", description: "Push to mobile for ICO/GDPR risk events.", enabled: true },
  { id: "n5", category: "push", label: "Mentions and DNA assignments", description: "When someone @mentions you on a workflow.", enabled: true },
  { id: "n6", category: "in-app", label: "New DNA from CLN", description: "Banner when peer firms publish DNA matching your sector.", enabled: true },
  { id: "n7", category: "in-app", label: "Onboarding tips", description: "Show contextual tips while exploring.", enabled: false },
];

export const recentRuns = (workflowId: string) =>
  Array.from({ length: 8 }, (_, i) => {
    const seed = parseInt(workflowId.replace(/\D/g, ""), 10) || 1;
    const ok = (i + seed) % 7 !== 0;
    return {
      id: `${workflowId}-run-${i}`,
      startedAt: new Date(Date.now() - i * 3600_000 * (1 + (seed % 3))).toISOString(),
      duration: `${(2 + ((i * seed) % 9))}.${(i * 7) % 10}s`,
      status: ok ? "Success" : "Failed",
      output: ok ? "Completed" : "PFFE blocked output",
    };
  });

export const runEfficiency = (seed: number) =>
  Array.from({ length: 14 }, (_, i) => ({
    day: `D-${14 - i}`,
    value: Math.round(60 + Math.sin(i * 0.5 + seed) * 8 + i * 1.2),
  }));

export const currentUser = {
  name: "Alex Rivera",
  email: "alex@promptops.ai",
  role: "Workspace Admin",
  team: "Workflow Automation",
  joined: "2025-09-14",
};

export const planUsage = {
  plan: "DNA Architect",
  price: 380,
  cycle: "monthly",
  workflowsUsed: 248,
  workflowsLimit: 500,
  runsUsed: 18420,
  runsLimit: 40000,
  seatsUsed: 14,
  seatsLimit: 25,
};

// ----- Forensics (PFFE) -----

export const forensicEvents: ForensicEvent[] = [
  { id: "f-001", workflow: "Bid Response Composer", type: "Hallucination", severity: "High", detectedAt: "2026-05-24T09:42:00Z", model: "GPT-4o", summary: "Fabricated case-win figure (£4.2M) not present in source library.", resolved: false },
  { id: "f-002", workflow: "Sales Forecast Sync", type: "Context Drift", severity: "Critical", detectedAt: "2026-05-24T08:11:00Z", model: "GPT-4o", summary: "Forecast spans drifted from FY26 to FY25 mid-chain.", resolved: false },
  { id: "f-003", workflow: "Tax Advisory Note Generator", type: "Compliance Risk", severity: "Medium", detectedAt: "2026-05-23T17:30:00Z", model: "GPT-4o", summary: "Cited HMRC manual section that has been superseded since 2024.", resolved: true },
  { id: "f-004", workflow: "Discovery Document Synthesis", type: "Logic Error", severity: "Medium", detectedAt: "2026-05-23T14:08:00Z", model: "Claude Sonnet 4.6", summary: "Inverted plaintiff/defendant on two of six referenced bundles.", resolved: true },
  { id: "f-005", workflow: "Pitch Deck Outline", type: "Tone Mismatch", severity: "Low", detectedAt: "2026-05-23T10:55:00Z", model: "Gemini 2.5", summary: "Casual register on a slide intended for institutional investor.", resolved: true },
  { id: "f-006", workflow: "Vendor Due Diligence Check", type: "Hallucination", severity: "High", detectedAt: "2026-05-22T16:21:00Z", model: "GPT-4o", summary: "Cited ICO enforcement action that does not exist in public register.", resolved: false },
  { id: "f-007", workflow: "Quarterly Close Narrative", type: "Logic Error", severity: "Medium", detectedAt: "2026-05-21T09:00:00Z", model: "Claude Sonnet 4.6", summary: "Variance attributed to wrong cost centre.", resolved: true },
  { id: "f-008", workflow: "Refund Decision Letter", type: "Tone Mismatch", severity: "Low", detectedAt: "2026-05-20T12:33:00Z", model: "GPT-4o", summary: "Apology paragraph omitted on policy-mandated refund.", resolved: true },
];

export const forensicTrend30d = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  caught: Math.round(12 + Math.sin(i * 0.4) * 4 + (i % 4)),
  baseline: Math.round(20 + i * 0.05),
}));

export const forensicByType = [
  { type: "Hallucination", count: 42, color: chartPalette.coral },
  { type: "Context Drift", count: 28, color: chartPalette.amber },
  { type: "Logic Error", count: 19, color: chartPalette.indigo },
  { type: "Tone Mismatch", count: 12, color: chartPalette.sky },
  { type: "Compliance Risk", count: 9, color: chartPalette.emerald },
];

export const forensicByModel = [
  { model: "GPT-4o", high: 18, med: 22, low: 14 },
  { model: "Claude Sonnet 4.6", high: 6, med: 12, low: 18 },
  { model: "Gemini 2.5", high: 9, med: 14, low: 10 },
  { model: "Llama 4", high: 4, med: 8, low: 6 },
];

// ----- Compliance -----

export const complianceChecks: ComplianceCheck[] = [
  { id: "c-001", principle: "Transparency & Explainability", framework: "DSIT AI Principles", status: "Pass", coverage: 96, lastAudit: "2026-05-22T10:00:00Z", notes: "All DNA outputs include forensic provenance trail." },
  { id: "c-002", principle: "Fairness & Bias Mitigation", framework: "DSIT AI Principles", status: "Pass", coverage: 92, lastAudit: "2026-05-22T10:00:00Z", notes: "Bias scan runs nightly across active DNA patterns." },
  { id: "c-003", principle: "Accountability & Governance", framework: "DSIT AI Principles", status: "Pass", coverage: 98, lastAudit: "2026-05-22T10:00:00Z", notes: "Every workflow has a named DNA Architect and audit log." },
  { id: "c-004", principle: "Safety, Security, Robustness", framework: "DSIT AI Principles", status: "Review", coverage: 88, lastAudit: "2026-05-21T10:00:00Z", notes: "Pending Cyber Essentials Plus uplift Q3 2026." },
  { id: "c-005", principle: "Contestability & Redress", framework: "DSIT AI Principles", status: "Pass", coverage: 95, lastAudit: "2026-05-22T10:00:00Z", notes: "Client-facing reverse-the-AI workflow available." },
  { id: "c-006", principle: "Lawful basis & consent", framework: "UK GDPR", status: "Pass", coverage: 99, lastAudit: "2026-05-20T10:00:00Z", notes: "All client data ingestion includes consent capture." },
  { id: "c-007", principle: "Data minimisation", framework: "UK GDPR", status: "Pass", coverage: 94, lastAudit: "2026-05-20T10:00:00Z", notes: "Logic Nodes prune PII before model invocation." },
  { id: "c-008", principle: "Right to erasure", framework: "UK GDPR", status: "Pass", coverage: 100, lastAudit: "2026-05-20T10:00:00Z", notes: "DSAR + erasure workflow tested 12 May." },
  { id: "c-009", principle: "Subject access requests (SAR)", framework: "ICO", status: "Review", coverage: 87, lastAudit: "2026-05-19T10:00:00Z", notes: "SLA bottleneck on legacy SharePoint archive." },
  { id: "c-010", principle: "Boundary firewalls", framework: "Cyber Essentials", status: "Pass", coverage: 100, lastAudit: "2026-04-30T10:00:00Z", notes: "Annual renewal completed; valid through Apr 2027." },
  { id: "c-011", principle: "Secure configuration", framework: "Cyber Essentials", status: "Pass", coverage: 96, lastAudit: "2026-04-30T10:00:00Z", notes: "All Logic Nodes hardened per CIS benchmark." },
  { id: "c-012", principle: "Access controls", framework: "Cyber Essentials", status: "Pass", coverage: 92, lastAudit: "2026-04-30T10:00:00Z", notes: "SSO + MFA enforced; quarterly access review pending." },
];

export const complianceTrend = [
  { month: "Dec", coverage: 78 },
  { month: "Jan", coverage: 82 },
  { month: "Feb", coverage: 86 },
  { month: "Mar", coverage: 89 },
  { month: "Apr", coverage: 92 },
  { month: "May", coverage: 95 },
];

// ----- Community Logic Network -----

export const communityNodes: CommunityNode[] = [
  { id: "n-001", firm: "Northern Tax Partners (Manchester)", region: "North West", sector: "Consulting", sharedDNA: 24, contributions: 138, reliability: 94 },
  { id: "n-002", firm: "Cambridge Research Lab", region: "East", sector: "Research & Development", sharedDNA: 18, contributions: 104, reliability: 92 },
  { id: "n-003", firm: "Bristol SaaS Studio", region: "South West", sector: "SaaS/Product Company", sharedDNA: 11, contributions: 62, reliability: 88 },
  { id: "n-004", firm: "Edinburgh Cyber Co-op", region: "Scotland", sector: "IT Services", sharedDNA: 16, contributions: 91, reliability: 96 },
  { id: "n-005", firm: "Cardiff SaaS Collective", region: "Wales", sector: "SaaS/Product Company", sharedDNA: 9, contributions: 41, reliability: 90 },
  { id: "n-006", firm: "Belfast Research Group", region: "Northern Ireland", sector: "Research & Development", sharedDNA: 7, contributions: 33, reliability: 93 },
];

export const sharedDNAFeed: SharedDNA[] = [
  { id: "s-001", name: "Advisory Note Generator", sector: "Consulting", contributor: "Northern Tax Partners", uses: 412, rating: 4.7, hallucinationReduction: 22, imported: true },
  { id: "s-002", name: "UK GDPR DPIA Template (SaaS)", sector: "SaaS/Product Company", contributor: "Cambridge Research Lab", uses: 318, rating: 4.8, hallucinationReduction: 31, imported: true },
  { id: "s-003", name: "Bid Response — Public Sector Tender", sector: "Consulting", contributor: "Edinburgh Cyber Co-op", uses: 287, rating: 4.5, hallucinationReduction: 18, imported: false },
  { id: "s-004", name: "Product Insights Report Generator", sector: "SaaS/Product Company", contributor: "Bristol SaaS Studio", uses: 196, rating: 4.4, hallucinationReduction: 12, imported: false },
  { id: "s-005", name: "Client Engagement Brief Composer", sector: "Consulting", contributor: "Cardiff SaaS Collective", uses: 174, rating: 4.6, hallucinationReduction: 20, imported: false },
  { id: "s-006", name: "Penetration Test Brief Synthesiser", sector: "IT Services", contributor: "Edinburgh Cyber Co-op", uses: 152, rating: 4.5, hallucinationReduction: 17, imported: false },
];

export const cnlGrowth = Array.from({ length: 12 }, (_, i) => ({
  week: `W${i + 1}`,
  firms: 8 + i * 2 + Math.round(Math.sin(i * 0.6) * 2),
  patterns: 24 + i * 8 + Math.round(Math.cos(i * 0.4) * 4),
}));

// ----- Plans -----

export const planTiers: PlanTier[] = [
  {
    id: "logic-core",
    name: "Logic Core",
    price: 100,
    cadence: "month",
    audience: "Solo founders & boutique agencies",
    highlights: [
      "Workflow DNA capture",
      "Browser-layer prompt library",
      "Basic PFFE hallucination scan",
      "Email support",
    ],
  },
  {
    id: "dna-architect",
    name: "DNA Architect",
    price: 380,
    cadence: "month",
    audience: "Consulting & IT firms",
    popular: true,
    highlights: [
      "Unlimited DNA fingerprinting",
      "Outcome-Learning Memory (OLM)",
      "HubSpot, Slack, MS365 sync",
      "Full hallucination forensics suite",
      "Priority support",
    ],
  },
  {
    id: "logic-sovereign",
    name: "Logic Sovereign",
    price: 250,
    cadence: "month-volume",
    audience: "Multi-site agencies & corporate teams",
    highlights: [
      "Full PFFE forensic reporting",
      "On-premise secure Logic Nodes",
      "Community Logic Network access",
      "ICO/GDPR audit bundle export",
      "Dedicated account manager",
    ],
  },
];

// Pilot benchmarks reported on the marketing site (used in Performance page)
export const pilotBenchmarks = [
  { label: "Task speed increase", value: "+28%" },
  { label: "Hallucination reduction", value: "-18%" },
  { label: "Time-to-proficiency", value: "14 days" },
  { label: "Logic Score (user-rated)", value: "4.3 / 5" },
  { label: "Logic Cloning success rate", value: "89%" },
  { label: "PFFE detection accuracy", value: "82%" },
  { label: "Workflow DNA implementation", value: "76%" },
  { label: "UK compliance coverage", value: "95%" },
];
