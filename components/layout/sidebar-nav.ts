import {
  LayoutDashboard,
  Dna,
  ShieldAlert,
  Sparkles,
  Zap,
  BarChart3,
  Network,
  FileBarChart,
  Scale,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/workflows", label: "Workflow DNA", icon: Dna },
  { href: "/forensics", label: "Forensics (PFFE)", icon: ShieldAlert },
  { href: "/insights", label: "Insights", icon: Sparkles },
  { href: "/automation", label: "Logic Triggers", icon: Zap },
  { href: "/community", label: "Community Logic", icon: Network },
  { href: "/compliance", label: "Compliance", icon: Scale },
  { href: "/performance", label: "Performance", icon: BarChart3 },
  { href: "/reports", label: "Reports", icon: FileBarChart },
  { href: "/settings", label: "Settings", icon: Settings },
];

export const pageTitles: Record<string, string> = {
  "/": "Overview",
  "/workflows": "Workflow DNA",
  "/forensics": "Forensics (PFFE)",
  "/insights": "Insights",
  "/automation": "Logic Triggers",
  "/community": "Community Logic Network",
  "/compliance": "Compliance",
  "/performance": "Performance",
  "/reports": "Reports",
  "/settings": "Settings",
  "/pricing": "Pricing",
};
