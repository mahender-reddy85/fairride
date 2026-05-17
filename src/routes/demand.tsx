import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionHeading, Stat } from "@/components/ui-kit";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { TrendingUp, Activity, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/demand")({
  head: () => ({
    meta: [
      { title: "Demand Insights — FairRide" },
      {
        name: "description",
        content:
          "Demand forecasting and driver positioning insights to reduce surge and balance the city.",
      },
    ],
  }),
  component: Demand,
});

const generateBaseHours = () => Array.from({ length: 24 }).map((_, h) => ({
  h: `${h}:00`,
  d: Math.round(
    40 +
      Math.sin((h - 6) / 3.2) * 35 +
      (h >= 8 && h <= 10 ? 25 : 0) +
      (h >= 18 && h <= 20 ? 30 : 0)
  ),
  p: Math.round(
    45 +
      Math.sin((h - 6) / 3.2) * 32 +
      (h >= 8 && h <= 10 ? 20 : 0) +
      (h >= 18 && h <= 20 ? 26 : 0)
  ),
}));

const zones = ["Indiranagar", "Koramangala", "Whitefield", "HSR", "MG Road", "BTM"];

const tooltipStyle = {
  background: "oklch(1 0 0)",
  border: "1px solid oklch(0.92 0.005 260)",
  borderRadius: 8,
  fontSize: 12,
};

function Demand() {
  const [hours, setHours] = useState(generateBaseHours());
  const [liveMultipliers, setLiveMultipliers] = useState([2.4, 2.1, 1.8]);
  const [heatmapSeed, setHeatmapSeed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Add slight jitter to actual demand
      setHours(prev => prev.map(item => ({
        ...item,
        d: Math.max(10, item.d + (Math.random() * 6 - 3))
      })));

      // Jitter multipliers slightly
      setLiveMultipliers(prev => prev.map(m => Math.max(1.0, m + (Math.random() * 0.1 - 0.05))));
      
      // Update heatmap subtly
      setHeatmapSeed(s => s + 0.1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <SectionHeading
        title={<>Predict the city, 30 minutes ahead</>}
        subtitle="See where rides will spike so drivers can position smartly — no surge greed required."
      />

      <div className="mt-12 grid md:grid-cols-4 gap-4">
        <Stat label="Forecast accuracy" value="94.2%" sub="MAPE 5.8" />
        <Stat label="Surge avoided" value="−61%" sub="vs market" />
        <Stat label="Lead time" value="30 min" />
        <Stat label="Zones tracked" value="184" />
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium flex items-center gap-2">
              <Activity className="size-4" /> 24-hour forecast — Bangalore
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-success animate-pulse">Live</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={hours}>
                <CartesianGrid stroke="oklch(0.92 0.005 260)" vertical={false} />
                <XAxis
                  dataKey="h"
                  stroke="oklch(0.5 0.015 260)"
                  fontSize={10}
                  interval={2}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="oklch(0.5 0.015 260)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="d"
                  name="Actual"
                  stroke="oklch(0.22 0.02 260)"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="p"
                  name="Predicted"
                  stroke="oklch(0.65 0.16 245)"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="5 5"
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium flex items-center gap-2">
              <MapPin className="size-4" /> City heatmap
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-destructive animate-pulse">
              Live
            </span>
          </div>
          <div className="grid grid-cols-10 gap-1 p-1 bg-secondary/20 rounded-xl">
            {Array.from({ length: 100 }).map((_, i) => {
              const x = i % 10;
              const y = Math.floor(i / 10);
              // Create natural heatmap clusters that drift slightly over time
              const intensity = (Math.cos(x / 2 + heatmapSeed) + Math.sin(y / 2 + heatmapSeed) + 2) / 4;
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
                  className="aspect-square rounded-[2px] transition-colors duration-1000 cursor-crosshair"
                  style={{ background: bg }}
                />
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-between text-[10px] text-muted-foreground uppercase tracking-widest">
            <span>Low demand</span>
            <div className="flex-1 mx-4 h-1 rounded-full overflow-hidden bg-secondary">
              <div className="h-full w-2/3 bg-foreground/20" />
            </div>
            <span>High</span>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-5">
        {zones.slice(0, 3).map((z, i) => (
          <Card key={z}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium">{z}</div>
              <span className="text-xs text-muted-foreground">in 30 min</span>
            </div>
            <div className="text-3xl font-semibold transition-all">{liveMultipliers[i].toFixed(2)}×</div>
            <div className="text-xs text-muted-foreground mt-1">predicted demand multiplier</div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <TrendingUp className="size-3.5 text-success" /> Reposition {3 + i} drivers from{" "}
              {zones[i + 3]}.
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <div className="text-sm font-medium mb-2">Surge reduction plan</div>
        <p className="text-sm text-muted-foreground">
          By rebalancing 18 drivers from low-demand BTM into MG Road in the next 12 minutes, we
          project a surge avoidance of 1.6× and ₹14,200 saved for riders during the next hour.
        </p>
      </Card>
    </div>
  );
}
