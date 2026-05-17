import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionHeading, Stat } from "@/components/ui-kit";
import { TrendingUp, Wallet, Trophy, Flame, Lightbulb, IndianRupee } from "lucide-react";
import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
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

const score = [{ name: "score", value: 86, fill: "oklch(0.22 0.02 260)" }];

const tooltipStyle = {
  background: "oklch(1 0 0)",
  border: "1px solid oklch(0.92 0.005 260)",
  borderRadius: 8,
  fontSize: 12,
};

function DriverDash() {
  const [grossWeekly, setGrossWeekly] = useState(15000);

  const earnings = useMemo(() => {
    // Competitor takes ~28% (Uber), ~26% (Ola)
    // FairRide takes exactly 8%
    const uberNet = Math.round(grossWeekly * 0.72);
    const olaNet = Math.round(grossWeekly * 0.74);
    const fairRideNet = Math.round(grossWeekly * 0.92);

    return { uberNet, olaNet, fairRideNet, diff: fairRideNet - uberNet };
  }, [grossWeekly]);

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
            <span className="text-xs font-semibold text-success flex items-center gap-1">
              <TrendingUp className="size-3" /> Top 10%
            </span>
          </div>
          
          <div className="h-28 relative mt-2">
            <ResponsiveContainer>
              <AreaChart data={[
                { d: "Mon", s: 81 },
                { d: "Tue", s: 82 },
                { d: "Wed", s: 81 },
                { d: "Thu", s: 83 },
                { d: "Fri", s: 84 },
                { d: "Sat", s: 86 },
                { d: "Sun", s: 86 }
              ]}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.65 0.16 245)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.65 0.16 245)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={tooltipStyle}
                  cursor={{ stroke: "oklch(0.92 0.005 260)", strokeWidth: 1 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="s" 
                  stroke="oklch(0.65 0.16 245)" 
                  fillOpacity={1} 
                  fill="url(#scoreGradient)" 
                  strokeWidth={3}
                  activeDot={{ r: 6, fill: "oklch(1 0 0)", stroke: "oklch(0.65 0.16 245)" }}
                  isAnimationActive={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex items-end justify-between mt-2">
            <div>
              <div className="text-4xl font-bold text-foreground leading-none">86</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1 font-bold">Excellent</div>
            </div>
            <div className="text-right flex gap-3 text-xs">
              <div>
                <div className="font-semibold text-foreground">4.92</div>
                <div className="text-muted-foreground">rating</div>
              </div>
              <div>
                <div className="font-semibold text-foreground">98%</div>
                <div className="text-muted-foreground">accept</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2 py-6">
          <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
            <div className="text-lg font-semibold flex items-center gap-2">
              <IndianRupee className="size-5" /> Earnings Comparison Calculator
            </div>
            <span className="text-sm text-success font-medium hidden sm:block">Keep 92% with FairRide</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <label className="text-sm font-medium mb-2 block">Weekly Gross Fares (₹)</label>
              <input 
                type="range" 
                min="2000" 
                max="40000" 
                step="500"
                value={grossWeekly} 
                onChange={(e) => setGrossWeekly(parseInt(e.target.value))}
                className="w-full accent-foreground"
              />
              <div className="text-center mt-2 text-2xl font-bold">₹{grossWeekly.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                Enter how much total fare riders pay in a week. Watch how platform commissions eat into your take-home pay on other apps compared to FairRide's flat 8% fee.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-md border border-border bg-card">
                <div className="flex justify-between text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  <span>Uber / Ola (Net 72-74%)</span>
                  <span>Avg ₹{earnings.uberNet.toLocaleString()}</span>
                </div>
                <div className="h-2 w-full flex rounded-full overflow-hidden bg-secondary">
                  <div className="h-full bg-muted-foreground/40" style={{ width: '73%' }} />
                </div>
              </div>
              
              <div className="p-4 rounded-md border-2 border-foreground bg-secondary/30 shadow-sm relative overflow-hidden">
                <div className="flex justify-between text-xs uppercase tracking-wider font-bold mb-1 text-foreground">
                  <span>FairRide (Net 92%)</span>
                  <span>₹{earnings.fairRideNet.toLocaleString()}</span>
                </div>
                <div className="h-2 w-full flex rounded-full overflow-hidden bg-background ring-1 ring-border">
                  <div className="h-full bg-foreground" style={{ width: '92%' }} />
                </div>
                <div className="mt-3 text-sm font-medium text-success">
                  +{earnings.diff.toLocaleString()} ₹ extra in your pocket
                </div>
              </div>
            </div>
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
