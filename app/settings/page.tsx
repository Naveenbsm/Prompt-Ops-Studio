"use client";

import * as React from "react";
import { toast } from "sonner";
import { Camera, Check, CreditCard } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageSkeleton } from "@/components/dashboard/page-skeleton";
import { Progress } from "@/components/ui/progress";
import {
  currentUser,
  integrations as initialIntegrations,
  invoices,
  notificationSettings as initialNotifications,
  planUsage,
  type Integration,
  type NotificationSetting,
} from "@/lib/mock-data";
import { useLocalStorage, storageKeys } from "@/lib/use-local-storage";
import { formatCurrency, formatDate, initials } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ProfileState {
  name: string;
  email: string;
  role: string;
  team: string;
  avatar: string | null;
}

const defaultProfile: ProfileState = {
  name: currentUser.name,
  email: currentUser.email,
  role: currentUser.role,
  team: currentUser.team,
  avatar: null,
};

export default function SettingsPage() {
  return (
    <PageSkeleton>
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Settings</h2>
          <p className="text-sm text-muted-foreground">
            Manage your profile, notifications, integrations, and billing.
          </p>
        </div>

        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileTab />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationsTab />
          </TabsContent>
          <TabsContent value="integrations">
            <IntegrationsTab />
          </TabsContent>
          <TabsContent value="billing">
            <BillingTab />
          </TabsContent>
        </Tabs>
      </div>
    </PageSkeleton>
  );
}

function ProfileTab() {
  const [profile, setProfile] = useLocalStorage<ProfileState>(
    storageKeys.profile,
    defaultProfile
  );
  const [draft, setDraft] = React.useState<ProfileState>(profile);
  const fileInput = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setDraft(profile);
  }, [profile]);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setDraft((d) => ({ ...d, avatar: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const dirty =
    draft.name !== profile.name ||
    draft.email !== profile.email ||
    draft.role !== profile.role ||
    draft.team !== profile.team ||
    draft.avatar !== profile.avatar;

  return (
    <Card className="p-6">
      <div className="flex items-center gap-5">
        <div className="relative">
          <Avatar className="h-20 w-20 text-base">
            {draft.avatar ? <AvatarImage src={draft.avatar} alt={draft.name} /> : null}
            <AvatarFallback className="text-base">{initials(draft.name || "AR")}</AvatarFallback>
          </Avatar>
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background shadow-md hover:opacity-90"
            aria-label="Upload avatar"
          >
            <Camera className="h-3.5 w-3.5" />
          </button>
          <input ref={fileInput} type="file" accept="image/*" hidden onChange={onPick} />
        </div>
        <div>
          <p className="text-base font-semibold">{draft.name || "Unnamed"}</p>
          <p className="text-sm text-muted-foreground">{draft.role}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            value={draft.name}
            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={draft.email}
            onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            value={draft.role}
            onChange={(e) => setDraft((d) => ({ ...d, role: e.target.value }))}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Team</Label>
          <Select
            value={draft.team}
            onValueChange={(v) => setDraft((d) => ({ ...d, team: v }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Operations">Operations</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Support">Support</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Button variant="ghost" onClick={() => setDraft(profile)} disabled={!dirty}>
          Cancel
        </Button>
        <Button
          disabled={!dirty}
          onClick={() => {
            setProfile(draft);
            toast.success("Profile saved");
          }}
        >
          Save changes
        </Button>
      </div>
    </Card>
  );
}

function NotificationsTab() {
  const [items, setItems] = useLocalStorage<NotificationSetting[]>(
    storageKeys.notifications,
    initialNotifications
  );
  const grouped = {
    email: items.filter((i) => i.category === "email"),
    push: items.filter((i) => i.category === "push"),
    "in-app": items.filter((i) => i.category === "in-app"),
  };

  const toggle = (id: string) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n)));

  return (
    <div className="space-y-4">
      {(Object.keys(grouped) as Array<keyof typeof grouped>).map((cat) => (
        <Card key={cat} className="p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {cat === "in-app" ? "In-app" : cat}
          </p>
          <ul className="mt-3 divide-y divide-border">
            {grouped[cat].map((n) => (
              <li key={n.id} className="flex items-start justify-between gap-3 py-3">
                <div>
                  <p className="text-sm font-medium">{n.label}</p>
                  <p className="text-xs text-muted-foreground">{n.description}</p>
                </div>
                <Switch checked={n.enabled} onCheckedChange={() => toggle(n.id)} />
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}

function IntegrationsTab() {
  const [items, setItems] = useLocalStorage<Integration[]>(
    storageKeys.integrations,
    initialIntegrations
  );
  const toggle = (id: string) =>
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== id) return it;
        toast.success(`${it.name} ${it.connected ? "disconnected" : "connected"}`);
        return { ...it, connected: !it.connected };
      })
    );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {items.map((i) => (
        <Card key={i.id} className="p-5">
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold text-white",
                i.color
              )}
            >
              {i.name[0]}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">{i.name}</p>
                {i.connected && (
                  <Badge variant="success" className="gap-1">
                    <Check className="h-3 w-3" /> Connected
                  </Badge>
                )}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{i.description}</p>
              <Badge variant="outline" className="mt-2 text-[10px]">
                {i.category}
              </Badge>
            </div>
            <Button
              variant={i.connected ? "outline" : "default"}
              size="sm"
              onClick={() => toggle(i.id)}
            >
              {i.connected ? "Disconnect" : "Connect"}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

function BillingTab() {
  const pct = (used: number, limit: number) => Math.round((used / limit) * 100);

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xl font-semibold">{planUsage.plan}</p>
              <Badge variant="default">Current plan</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {formatCurrency(planUsage.price)} / {planUsage.cycle} · renews May 31, 2026
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">Change plan</Button>
            <Button>
              <CreditCard className="h-4 w-4" /> Manage billing
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 border-t border-border p-6 sm:grid-cols-3">
          <UsageBar
            label="Workflows"
            used={planUsage.workflowsUsed}
            limit={planUsage.workflowsLimit}
            pct={pct(planUsage.workflowsUsed, planUsage.workflowsLimit)}
          />
          <UsageBar
            label="Runs / mo"
            used={planUsage.runsUsed}
            limit={planUsage.runsLimit}
            pct={pct(planUsage.runsUsed, planUsage.runsLimit)}
          />
          <UsageBar
            label="Seats"
            used={planUsage.seatsUsed}
            limit={planUsage.seatsLimit}
            pct={pct(planUsage.seatsUsed, planUsage.seatsLimit)}
          />
        </div>
      </Card>

      <Card className="p-6">
        <p className="text-sm font-semibold">Invoice history</p>
        <p className="text-xs text-muted-foreground">Recent invoices for this workspace.</p>
        <div className="mt-4 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Invoice</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Plan</th>
                <th className="px-4 py-3 text-left font-medium">Amount</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-secondary/40">
                  <td className="px-4 py-3 font-medium">{inv.id}</td>
                  <td className="px-4 py-3 text-muted-foreground">{formatDate(inv.date)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{inv.plan}</td>
                  <td className="px-4 py-3 tabular-nums">{formatCurrency(inv.amount)}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        inv.status === "Paid"
                          ? "success"
                          : inv.status === "Pending"
                          ? "warning"
                          : "danger"
                      }
                    >
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        toast.success("Invoice downloaded", { description: inv.id })
                      }
                    >
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="border-rose-200 bg-rose-50/30 p-6 dark:border-rose-500/20 dark:bg-rose-500/5">
        <p className="text-sm font-semibold">Reset demo data</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Restore workflows, automations, integrations, and notifications to their original sample values.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-3"
          onClick={() => {
            try {
              Object.keys(window.localStorage)
                .filter((k) => k.startsWith("promptops:v1:"))
                .forEach((k) => window.localStorage.removeItem(k));
              toast.success("Demo data reset", { description: "Refreshing..." });
              setTimeout(() => window.location.reload(), 600);
            } catch {
              toast.error("Couldn't reset — your browser blocked localStorage");
            }
          }}
        >
          Reset to sample data
        </Button>
      </Card>
    </div>
  );
}

function UsageBar({
  label,
  used,
  limit,
  pct,
}: {
  label: string;
  used: number;
  limit: number;
  pct: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="text-xs tabular-nums text-muted-foreground">
          {used.toLocaleString()} / {limit.toLocaleString()}
        </p>
      </div>
      <Progress value={pct} className="mt-2 h-2" />
      <p className="mt-1 text-[11px] text-muted-foreground">{pct}% used</p>
    </div>
  );
}
