export type WorkflowStatus = "Active" | "Paused" | "Draft";

export interface Workflow {
  id: string;
  name: string;
  department: string;
  status: WorkflowStatus;
  efficiency: number;
  lastRun: string;
  runs: number;
  owner: string;
  description: string;
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
  type: "Financial" | "Operations" | "Analytics" | "Compliance" | "Performance";
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

// Sparkline data shape
export const sparkData = (seed: number) =>
  Array.from({ length: 14 }, (_, i) => ({
    x: i,
    y: Math.round(40 + Math.sin(i * 0.6 + seed) * 14 + i * (seed % 3) * 1.4 + (seed * 3) % 10),
  }));

/**
 * Centralized chart palette — Stripe-inspired:
 * primary indigo + complementary navy / sky / coral / emerald / amber / slate.
 * Use these rather than ad-hoc hex codes so the dashboard reads as one product.
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

export const metrics = [
  {
    key: "workflows",
    label: "Workflows Analyzed",
    value: "248",
    delta: 27,
    deltaLabel: "+27% vs last month",
    accent: chartPalette.indigo,
    sparkSeed: 1,
  },
  {
    key: "efficiency",
    label: "Efficiency Gain",
    value: "34.2%",
    delta: 8.6,
    deltaLabel: "+8.6% vs last month",
    accent: chartPalette.sky,
    sparkSeed: 2,
  },
  {
    key: "time-saved",
    label: "Time Saved",
    value: "1,256 hrs",
    delta: 33.1,
    deltaLabel: "+312 hrs",
    accent: chartPalette.amber,
    sparkSeed: 3,
  },
  {
    key: "cost-savings",
    label: "Cost Savings",
    value: "$2.48M",
    delta: 18.4,
    deltaLabel: "+18.4% vs last month",
    accent: chartPalette.emerald,
    sparkSeed: 4,
  },
];

export const improvementAreas = [
  { name: "Approval Process", percent: 87 },
  { name: "Data Handoffs", percent: 76 },
  { name: "Manual Data Entry", percent: 69 },
  { name: "Notifications", percent: 62 },
  { name: "Reporting", percent: 58 },
];

export const automationImpactBars = [
  { name: "Jan", high: 38, med: 22, low: 12 },
  { name: "Feb", high: 42, med: 25, low: 14 },
  { name: "Mar", high: 48, med: 28, low: 16 },
  { name: "Apr", high: 52, med: 24, low: 18 },
  { name: "May", high: 58, med: 30, low: 20 },
  { name: "Jun", high: 62, med: 32, low: 22 },
];

export const workflows: Workflow[] = [
  { id: "wf-001", name: "Invoice Processing", department: "Finance", status: "Active", efficiency: 92, lastRun: "2026-05-23T09:14:00Z", runs: 1248, owner: "Maya Patel", description: "Extract, validate, and route invoices to approvers." },
  { id: "wf-002", name: "Customer Onboarding", department: "Customer Success", status: "Active", efficiency: 88, lastRun: "2026-05-23T08:31:00Z", runs: 612, owner: "Daniel Cho", description: "Welcome email, account setup, and CRM enrichment." },
  { id: "wf-003", name: "Lead Scoring", department: "Sales", status: "Active", efficiency: 81, lastRun: "2026-05-23T07:55:00Z", runs: 4892, owner: "Sofia Reyes", description: "Score inbound leads using engagement and firmographic data." },
  { id: "wf-004", name: "Expense Approval", department: "Finance", status: "Paused", efficiency: 74, lastRun: "2026-05-21T15:11:00Z", runs: 304, owner: "Liam Wright", description: "Multi-tier approval routing with policy checks." },
  { id: "wf-005", name: "Support Ticket Triage", department: "Support", status: "Active", efficiency: 95, lastRun: "2026-05-23T10:02:00Z", runs: 8211, owner: "Aisha Khan", description: "Classify, prioritize, and assign incoming tickets." },
  { id: "wf-006", name: "Contract Renewal Reminders", department: "Legal", status: "Active", efficiency: 79, lastRun: "2026-05-23T06:00:00Z", runs: 142, owner: "Noah Bennett", description: "Auto-notify owners 60/30/7 days pre-renewal." },
  { id: "wf-007", name: "New Hire Provisioning", department: "People Ops", status: "Active", efficiency: 86, lastRun: "2026-05-22T16:42:00Z", runs: 78, owner: "Priya Shah", description: "Provision tooling, accounts, and welcome kits." },
  { id: "wf-008", name: "Vendor Compliance Check", department: "Procurement", status: "Draft", efficiency: 64, lastRun: "2026-05-19T10:30:00Z", runs: 22, owner: "Marco Bianchi", description: "Validate vendor docs and risk scores." },
  { id: "wf-009", name: "Marketing Campaign Reporting", department: "Marketing", status: "Active", efficiency: 83, lastRun: "2026-05-23T05:00:00Z", runs: 412, owner: "Hannah Lee", description: "Daily multi-channel performance roll-up." },
  { id: "wf-010", name: "Quarterly Financial Close", department: "Finance", status: "Paused", efficiency: 71, lastRun: "2026-04-30T22:00:00Z", runs: 4, owner: "Maya Patel", description: "Reconciliation and close-package automation." },
  { id: "wf-011", name: "Refund Processing", department: "Support", status: "Active", efficiency: 89, lastRun: "2026-05-23T09:50:00Z", runs: 932, owner: "Aisha Khan", description: "Verify and issue refunds with fraud screen." },
  { id: "wf-012", name: "SOC2 Evidence Collection", department: "Security", status: "Active", efficiency: 77, lastRun: "2026-05-22T11:15:00Z", runs: 36, owner: "Ethan Park", description: "Pull evidence from systems weekly." },
  { id: "wf-013", name: "Inventory Reorder", department: "Operations", status: "Active", efficiency: 84, lastRun: "2026-05-23T04:30:00Z", runs: 218, owner: "Olivia Martin", description: "Trigger reorder when SKU dips below threshold." },
  { id: "wf-014", name: "Sales Forecast Sync", department: "Sales", status: "Draft", efficiency: 58, lastRun: "2026-05-18T13:20:00Z", runs: 11, owner: "Sofia Reyes", description: "Sync CRM forecasts to data warehouse." },
  { id: "wf-015", name: "Knowledge Base Indexing", department: "Support", status: "Active", efficiency: 90, lastRun: "2026-05-23T03:00:00Z", runs: 156, owner: "Noah Bennett", description: "Re-index help center after edits." },
  { id: "wf-016", name: "Payroll Anomaly Detection", department: "People Ops", status: "Active", efficiency: 82, lastRun: "2026-05-22T19:00:00Z", runs: 24, owner: "Priya Shah", description: "Flag outliers before payroll run." },
  { id: "wf-017", name: "Customer NPS Follow-up", department: "Customer Success", status: "Paused", efficiency: 67, lastRun: "2026-05-20T14:45:00Z", runs: 188, owner: "Daniel Cho", description: "Loop in CSM on detractor responses." },
  { id: "wf-018", name: "Data Warehouse Health Check", department: "Data", status: "Active", efficiency: 93, lastRun: "2026-05-23T08:00:00Z", runs: 720, owner: "Yuki Tanaka", description: "Monitor freshness, schema drift, and load failures." },
];

export const departments = Array.from(new Set(workflows.map((w) => w.department))).sort();

export const automations: Automation[] = [
  { id: "auto-001", name: "Slack New Lead Alert", icon: "Bell", trigger: "New lead in HubSpot", action: "Post to #sales-leads", runs: 1248, status: "Active", category: "Sales", enabled: true },
  { id: "auto-002", name: "Invoice → Drive", icon: "FileText", trigger: "New invoice email", action: "Save PDF to Drive folder", runs: 842, status: "Active", category: "Finance", enabled: true },
  { id: "auto-003", name: "Daily Standup Digest", icon: "MessageSquare", trigger: "Weekday 9:00am", action: "DM team yesterday's commits", runs: 312, status: "Active", category: "Engineering", enabled: true },
  { id: "auto-004", name: "Bug Report → Linear", icon: "Bug", trigger: "Form submission", action: "Create Linear ticket", runs: 96, status: "Paused", category: "Support", enabled: false },
  { id: "auto-005", name: "Calendar → Notion", icon: "Calendar", trigger: "Meeting ends", action: "Append notes to Notion", runs: 624, status: "Active", category: "Productivity", enabled: true },
  { id: "auto-006", name: "Stripe → Sheets", icon: "DollarSign", trigger: "Stripe payment", action: "Log row in Sheets", runs: 1980, status: "Active", category: "Finance", enabled: true },
  { id: "auto-007", name: "GitHub PR Reviewer", icon: "GitPullRequest", trigger: "PR opened", action: "Auto-assign reviewer", runs: 514, status: "Active", category: "Engineering", enabled: true },
  { id: "auto-008", name: "NPS Survey Send", icon: "Star", trigger: "Customer 30d active", action: "Send survey via Intercom", runs: 207, status: "Paused", category: "Customer Success", enabled: false },
  { id: "auto-009", name: "Expense Slack Approval", icon: "CheckCircle", trigger: "Expense > $500", action: "Slack approval to manager", runs: 88, status: "Active", category: "Finance", enabled: true },
  { id: "auto-010", name: "Onboarding Email Drip", icon: "Mail", trigger: "Signup complete", action: "Trigger 7-step Mailchimp drip", runs: 1432, status: "Active", category: "Marketing", enabled: true },
  { id: "auto-011", name: "Server Alert → PagerDuty", icon: "AlertTriangle", trigger: "CPU > 90% for 5m", action: "Page on-call engineer", runs: 41, status: "Active", category: "Engineering", enabled: true },
  { id: "auto-012", name: "Contract Expiry Reminder", icon: "FileSignature", trigger: "30d before renewal", action: "Email account owner", runs: 62, status: "Draft", category: "Legal", enabled: false },
];

export const reports: ReportItem[] = [
  { id: "r-001", title: "Q2 Workflow Performance Summary", type: "Performance", generated: "2026-05-22T10:00:00Z", size: "2.4 MB", author: "Maya Patel" },
  { id: "r-002", title: "Monthly Cost Savings Breakdown", type: "Financial", generated: "2026-05-21T08:30:00Z", size: "1.1 MB", author: "Daniel Cho" },
  { id: "r-003", title: "SOC2 Compliance Evidence Pack", type: "Compliance", generated: "2026-05-20T16:45:00Z", size: "5.8 MB", author: "Ethan Park" },
  { id: "r-004", title: "Customer Onboarding Funnel", type: "Analytics", generated: "2026-05-19T12:15:00Z", size: "3.2 MB", author: "Hannah Lee" },
  { id: "r-005", title: "Operations Health Weekly", type: "Operations", generated: "2026-05-18T07:00:00Z", size: "920 KB", author: "Olivia Martin" },
  { id: "r-006", title: "Top 10 Time-Wasting Workflows", type: "Performance", generated: "2026-05-17T14:20:00Z", size: "1.8 MB", author: "Sofia Reyes" },
  { id: "r-007", title: "April Financial Close Audit", type: "Financial", generated: "2026-05-02T18:00:00Z", size: "4.7 MB", author: "Maya Patel" },
  { id: "r-008", title: "Engineering Automation ROI", type: "Analytics", generated: "2026-05-15T11:00:00Z", size: "2.0 MB", author: "Yuki Tanaka" },
];

export const integrations: Integration[] = [
  { id: "slack", name: "Slack", description: "Send messages, alerts, and approvals to channels.", category: "Communication", connected: true, color: "bg-[#4A154B]" },
  { id: "gmail", name: "Gmail", description: "Trigger workflows from incoming email.", category: "Email", connected: true, color: "bg-rose-500" },
  { id: "zapier", name: "Zapier", description: "Connect to 5,000+ apps with a click.", category: "Automation", connected: false, color: "bg-orange-500" },
  { id: "salesforce", name: "Salesforce", description: "Sync CRM records bidirectionally.", category: "CRM", connected: true, color: "bg-sky-500" },
  { id: "notion", name: "Notion", description: "Auto-create pages from triggers.", category: "Docs", connected: false, color: "bg-neutral-800" },
  { id: "hubspot", name: "HubSpot", description: "Push lead scores and trigger sequences.", category: "CRM", connected: false, color: "bg-amber-500" },
];

export const invoices: Invoice[] = [
  { id: "INV-1241", date: "2026-05-01", amount: 499, plan: "Business", status: "Paid" },
  { id: "INV-1212", date: "2026-04-01", amount: 499, plan: "Business", status: "Paid" },
  { id: "INV-1183", date: "2026-03-01", amount: 499, plan: "Business", status: "Paid" },
  { id: "INV-1154", date: "2026-02-01", amount: 299, plan: "Starter", status: "Paid" },
  { id: "INV-1125", date: "2026-01-01", amount: 299, plan: "Starter", status: "Paid" },
  { id: "INV-1096", date: "2025-12-01", amount: 299, plan: "Starter", status: "Failed" },
];

export const teamPerformers: TeamPerformer[] = [
  { id: "p1", name: "Maya Patel", role: "Workflow Architect", team: "Finance", score: 98, workflowsOwned: 12, trend: 6 },
  { id: "p2", name: "Aisha Khan", role: "Support Lead", team: "Support", score: 95, workflowsOwned: 9, trend: 4 },
  { id: "p3", name: "Sofia Reyes", role: "Sales Ops", team: "Sales", score: 92, workflowsOwned: 7, trend: 8 },
  { id: "p4", name: "Yuki Tanaka", role: "Data Engineer", team: "Data", score: 91, workflowsOwned: 6, trend: 3 },
  { id: "p5", name: "Daniel Cho", role: "CS Manager", team: "Customer Success", score: 87, workflowsOwned: 5, trend: -2 },
  { id: "p6", name: "Priya Shah", role: "People Ops", team: "People Ops", score: 84, workflowsOwned: 4, trend: 5 },
  { id: "p7", name: "Noah Bennett", role: "Legal Ops", team: "Legal", score: 80, workflowsOwned: 3, trend: 1 },
];

export const performanceByTeam = [
  { team: "Finance", score: 94 },
  { team: "Support", score: 91 },
  { team: "Sales", score: 87 },
  { team: "Customer Success", score: 84 },
  { team: "Data", score: 90 },
  { team: "People Ops", score: 78 },
  { team: "Engineering", score: 88 },
  { team: "Legal", score: 72 },
];

export const performanceOverTime = [
  { month: "Dec", finance: 82, sales: 70, support: 75 },
  { month: "Jan", finance: 84, sales: 73, support: 78 },
  { month: "Feb", finance: 86, sales: 76, support: 81 },
  { month: "Mar", finance: 88, sales: 79, support: 84 },
  { month: "Apr", finance: 91, sales: 83, support: 88 },
  { month: "May", finance: 94, sales: 87, support: 91 },
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
  { name: "Finance", value: 38, color: chartPalette.indigo },
  { name: "Support", value: 32, color: chartPalette.sky },
  { name: "Sales", value: 24, color: chartPalette.emerald },
  { name: "Customer Success", value: 18, color: chartPalette.amber },
  { name: "Operations", value: 14, color: chartPalette.coral },
  { name: "Other", value: 22, color: chartPalette.slate },
];

export const weekOverWeek = [
  { area: "Finance", thisWeek: 92, lastWeek: 84 },
  { area: "Support", thisWeek: 88, lastWeek: 82 },
  { area: "Sales", thisWeek: 81, lastWeek: 76 },
  { area: "Ops", thisWeek: 79, lastWeek: 71 },
  { area: "People", thisWeek: 74, lastWeek: 70 },
];

export const keyInsights = [
  { icon: "TrendingUp", title: "Efficiency climbed 12.4% this month", stat: "+12.4%", tone: "good" as const, body: "Approval workflows now complete in under 4 hours on average — down from 14 hours in March." },
  { icon: "AlertTriangle", title: "Manual data entry remains the top friction area", stat: "69%", tone: "warn" as const, body: "Finance and Procurement together account for 78% of manual entry hours. Consider an OCR-first approach." },
  { icon: "Clock", title: "After-hours runs spiked 38%", stat: "+38%", tone: "neutral" as const, body: "Most occur between 11pm–2am — a likely opportunity to shift heavy jobs to off-peak SLAs." },
  { icon: "Sparkles", title: "3 new high-impact automations went live", stat: "3 new", tone: "good" as const, body: "Refund Processing, Lead Scoring, and Knowledge Base Indexing are projected to save 320 hrs/month." },
];

export const notificationSettings: NotificationSetting[] = [
  { id: "n1", category: "email", label: "Workflow failures", description: "Email me when a workflow fails or errors out.", enabled: true },
  { id: "n2", category: "email", label: "Weekly digest", description: "A Monday-morning summary of last week's activity.", enabled: true },
  { id: "n3", category: "email", label: "Cost savings milestones", description: "Notify on every $100k saved.", enabled: false },
  { id: "n4", category: "push", label: "Critical alerts", description: "Push to mobile for SEV-1 issues.", enabled: true },
  { id: "n5", category: "push", label: "Mentions and assignments", description: "When someone @mentions you in a workflow.", enabled: true },
  { id: "n6", category: "in-app", label: "New insight detected", description: "Banner when the AI surfaces a new insight.", enabled: true },
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
      output: ok ? "Completed" : "Timed out",
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
  team: "Operations",
  joined: "2025-09-14",
};

export const planUsage = {
  plan: "Business",
  price: 499,
  cycle: "monthly",
  workflowsUsed: 248,
  workflowsLimit: 500,
  runsUsed: 18420,
  runsLimit: 40000,
  seatsUsed: 14,
  seatsLimit: 25,
};
