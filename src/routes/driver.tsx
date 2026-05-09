import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionHeading, Stat } from "@/components/ui-kit";
import { TrendingUp, Wallet, Trophy, Flame, Lightbulb, MapPin } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Cell,
  CartesianGrid,
  Radar,
  RadarChart,
  PolarGrid,
} from "recharts";

export const Route = createFileRoute("/driver")({
  head: () => ({
    meta: [
      { title: "Driver Dashboard — FairRide" },
      {
        name: "description",
        content: "See how much you earned, where to find rides, and tips to make more money.",
      },
    ],
  }),
  component: DriverDash,
});

const weekly = [
  { d: "Mon", e: 1480 },
  { d: "Tue", e: 1610 },
  { d: "Wed", e: 1390 },
  { d: "Thu", e: 1720 },
  { d: "Fri", e: 2010 },
  { d: "Sat", e: 2240 },
  { d: "Sun", e: 1880 },
];

const commission = [
  { name: "Uber", pct: 28 },
  { name: "Ola", pct: 26 },
  { name: "Rapido", pct: 22 },
  { name: "FairRide", pct: 8 },
];

const score = [{ name: "score", value: 86, fill: "oklch(0.22 0.02 260)" }];

const tooltipStyle = {
  background: "oklch(1 0 0)",
  border: "1px solid oklch(0.92 0.005 260)",
  borderRadius: 8,
  fontSize: 12,
};

function DriverDash() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <SectionHeading
        align="left"
        title={<>Welcome back!</>}
        subtitle="You made ₹612 more than last week. Great job!"
      />

      <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Today" value="₹1,820" sub="+18% vs avg" />
        <Stat label="This week" value="₹12,330" sub="+42% lift" />
        <Stat label="Net payout" value="92%" sub="vs 72% on Uber" />
        <Stat label="Rides" value="108" sub="last 7 days" />
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium">Weekly earnings</div>
            <span className="text-xs text-muted-foreground">+42% vs market</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={weekly}>
                <defs>
                  <linearGradient id="dg" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.22 0.02 260)" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="oklch(0.22 0.02 260)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  stroke="oklch(0.92 0.005 260)"
                  vertical={false}
                  strokeDasharray="3 3"
                />
                <XAxis
                  dataKey="d"
                  stroke="oklch(0.5 0.015 260)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{ stroke: "oklch(0.92 0.005 260)", strokeWidth: 1 }}
                />
                <Area
                  type="monotone"
                  dataKey="e"
                  stroke="oklch(0.22 0.02 260)"
                  fill="url(#dg)"
                  strokeWidth={2}
                  activeDot={{ r: 4, fill: "oklch(1 0 0)", stroke: "oklch(0.22 0.02 260)" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium flex items-center gap-2">
              <Trophy className="size-4 text-warning" /> Driver score
            </div>
          </div>
          <div className="h-44 relative">
            <ResponsiveContainer>
              <RadialBarChart
                innerRadius="70%"
                outerRadius="100%"
                data={score}
                startAngle={220}
                endAngle={-40}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar
                  dataKey="value"
                  background={{ fill: "oklch(0.96 0.005 260)" }}
                  cornerRadius={20}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 grid place-items-center text-center pointer-events-none">
              <div>
                <div className="text-4xl font-semibold text-foreground">86</div>
                <div className="text-xs text-muted-foreground">out of 100</div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <div className="font-semibold">4.92</div>
              <div className="text-muted-foreground">rating</div>
            </div>
            <div>
              <div className="font-semibold">98%</div>
              <div className="text-muted-foreground">accept</div>
            </div>
            <div>
              <div className="font-semibold">0</div>
              <div className="text-muted-foreground">cancel</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2 py-8">
          <div className="flex items-center justify-between mb-8 px-4">
            <div className="text-lg font-semibold flex items-center gap-2">
              <Wallet className="size-5" /> Commission you pay
            </div>
            <span className="text-sm text-muted-foreground font-medium">92% kept</span>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={commission}>
                <PolarGrid stroke="oklch(0.92 0.005 260)" />
                <PolarAngleAxis
                  dataKey="name"
                  tick={{ fill: "oklch(0.5 0.015 260)", fontSize: 13, fontWeight: 500 }}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Radar
                  name="Commission %"
                  dataKey="pct"
                  stroke="oklch(0.22 0.02 260)"
                  fill="oklch(0.22 0.02 260)"
                  fillOpacity={0.4}
                  dot={{ r: 4, fill: "oklch(0.22 0.02 260)" }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="text-sm font-medium flex items-center gap-2 mb-3">
            <Flame className="size-4 text-destructive" /> Hotspot map
          </div>
          <div className="grid grid-cols-8 gap-1.5 p-1 bg-secondary/30 rounded-lg">
            {Array.from({ length: 64 }).map((_, i) => {
              const x = i % 8;
              const y = Math.floor(i / 8);
              // Create a more "clustered" demand look using sin/cos
              const intensity =
                (Math.sin(x / 1.5) + Math.cos(y / 1.5) + 2) / 4 + Math.random() * 0.1;
              const bg =
                intensity > 0.8
                  ? "oklch(0.22 0.02 260 / 0.95)"
                  : intensity > 0.6
                    ? "oklch(0.22 0.02 260 / 0.7)"
                    : intensity > 0.4
                      ? "oklch(0.22 0.02 260 / 0.4)"
                      : intensity > 0.2
                        ? "oklch(0.22 0.02 260 / 0.15)"
                        : "oklch(1 0 0 / 0.4)";
              return (
                <div
                  key={i}
                  className="aspect-square rounded-[3px] transition-all hover:scale-110 hover:shadow-lg cursor-crosshair"
                  style={{ background: bg }}
                />
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-between text-[10px] text-muted-foreground uppercase tracking-widest">
            <span>Quiet</span>
            <div className="flex gap-1">
              {[0.1, 0.4, 0.7, 0.95].map((o) => (
                <div
                  key={o}
                  className="size-2 rounded-full"
                  style={{ background: `oklch(0.22 0.02 260 / ${o})` }}
                />
              ))}
            </div>
            <span>Busy</span>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-5">
        {[
          {
            i: TrendingUp,
            t: "Move 1.2 km north",
            d: "Demand spiking near Domlur — projected +₹240 in next 30 min.",
          },
          {
            i: Lightbulb,
            t: "Skip 2–3pm",
            d: "Low-yield window. Take a break, restart at 3:15pm for 28% better RPI.",
          },
          {
            i: Trophy,
            t: "1 ride to Gold tier",
            d: "Reach Gold to unlock priority dispatch and a ₹250 bonus.",
          },
        ].map((x) => (
          <Card key={x.t}>
            <div className="flex items-center gap-2 mb-2">
              <x.i className="size-4" />
              <span className="text-sm font-medium">{x.t}</span>
            </div>
            <p className="text-sm text-muted-foreground">{x.d}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
