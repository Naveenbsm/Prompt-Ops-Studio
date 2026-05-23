import {
  LayoutDashboard,
  Workflow,
  Sparkles,
  Zap,
  BarChart3,
  FileBarChart,
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
  { href: "/workflows", label: "Workflows", icon: Workflow },
  { href: "/insights", label: "Insights", icon: Sparkles },
  { href: "/automation", label: "Automation", icon: Zap },
  { href: "/performance", label: "Performance", icon: BarChart3 },
  { href: "/reports", label: "Reports", icon: FileBarChart },
  { href: "/settings", label: "Settings", icon: Settings },
];

export const pageTitles: Record<string, string> = {
  "/": "Overview",
  "/workflows": "Workflows",
  "/insights": "Insights",
  "/automation": "Automation",
  "/performance": "Performance",
  "/reports": "Reports",
  "/settings": "Settings",
};
