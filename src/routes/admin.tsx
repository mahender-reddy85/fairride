import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionHeading, Stat } from "@/components/ui-kit";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";
import { Activity, Leaf, Users, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Analytics — FairRide" },
      { name: "description", content: "Platform analytics: total rides, savings, retention and impact metrics." },
    ],
  }),
  component: Admin,
});

const trend = Array.from({ length: 30 }).map((_, i) => ({
  d: `D${i + 1}`,
  rides: Math.round(28000 + i * 380 + Math.random() * 1500),
  savings: Math.round(180000 + i * 4200 + Math.random() * 12000),
}));

const split = [
  { name: "Solo", value: 62 },
  { name: "Pooled", value: 28 },
  { name: "Auto", value: 10 },
];
const COLORS = ["oklch(0.22 0.02 260)", "oklch(0.65 0.16 245)", "oklch(0.62 0.15 155)"];

const cohort = Array.from({ length: 6 }).map((_, i) => ({
  m: `M${i + 1}`,
  retention: Math.round(100 - i * 1.2),
  market: Math.round(100 - i * 6),
}));

const tooltipStyle = { background: "oklch(1 0 0)", border: "1px solid oklch(0.92 0.005 260)", borderRadius: 8, fontSize: 12 };

function Admin() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <SectionHeading
        align="left"
        eyebrow="Analytics"
        title={<>Platform health at a glance</>}
        subtitle="Network metrics across rides, savings, retention and impact."
      />

      <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Total rides" value="1.24M" sub="last 30d" />
        <Stat label="Rider savings" value="₹38.4 Cr" sub="cumulative" />
        <Stat label="Driver retention" value="94%" sub="vs market 62%" />
        <Stat label="CO₂ avoided" value="612 t" sub="via pooling" />
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium flex items-center gap-2"><Activity className="size-4" /> Rides & savings — last 30 days</div>
            <span className="text-xs text-muted-foreground">+12.4% w/w</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={trend}>
                <defs>
                  <linearGradient id="ag1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.22 0.02 260)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="oklch(0.22 0.02 260)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="ag2" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.65 0.16 245)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="oklch(0.65 0.16 245)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(0.92 0.005 260)" vertical={false} />
                <XAxis dataKey="d" stroke="oklch(0.5 0.015 260)" fontSize={10} interval={3} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.5 0.015 260)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="rides" stroke="oklch(0.22 0.02 260)" fill="url(#ag1)" strokeWidth={2} />
                <Area type="monotone" dataKey="savings" stroke="oklch(0.65 0.16 245)" fill="url(#ag2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="text-sm font-medium flex items-center gap-2 mb-3"><Users className="size-4" /> Ride mix</div>
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={split} dataKey="value" innerRadius={48} outerRadius={80} paddingAngle={3}>
                  {split.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 text-xs">
            {split.map((s, i) => (
              <div key={s.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="size-2 rounded-full" style={{ background: COLORS[i] }} />{s.name}</span>
                <span className="text-muted-foreground">{s.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-5">
        <Card>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium flex items-center gap-2"><ShieldCheck className="size-4" /> Driver retention vs market</div>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={cohort}>
                <CartesianGrid stroke="oklch(0.92 0.005 260)" vertical={false} />
                <XAxis dataKey="m" stroke="oklch(0.5 0.015 260)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.5 0.015 260)" fontSize={11} unit="%" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="retention" name="FairRide" fill="oklch(0.22 0.02 260)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="market" name="Market avg" fill="oklch(0.85 0.01 260)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium flex items-center gap-2"><Leaf className="size-4 text-success" /> Operating metrics</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { l: "Surge avoided", v: "61%" },
              { l: "Match latency", v: "2.4s" },
              { l: "Pool fill rate", v: "73%" },
              { l: "Forecast MAPE", v: "5.8" },
              { l: "Detour median", v: "3.1m" },
              { l: "Commission cap", v: "8%" },
            ].map((s) => (
              <div key={s.l} className="rounded-md border border-border bg-card p-3">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                <div className="mt-1 text-xl font-semibold">{s.v}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
