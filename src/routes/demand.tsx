import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionHeading, Stat } from "@/components/ui-kit";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { TrendingUp, Activity, MapPin } from "lucide-react";

export const Route = createFileRoute("/demand")({
  head: () => ({
    meta: [
      { title: "Demand Insights — FairRide" },
      { name: "description", content: "Demand forecasting and driver positioning insights to reduce surge and balance the city." },
    ],
  }),
  component: Demand,
});

const hours = Array.from({ length: 24 }).map((_, h) => ({
  h: `${h}:00`,
  d: Math.round(40 + Math.sin((h - 6) / 3.2) * 35 + Math.random() * 10 + (h >= 8 && h <= 10 ? 25 : 0) + (h >= 18 && h <= 20 ? 30 : 0)),
  p: Math.round(45 + Math.sin((h - 6) / 3.2) * 32 + (h >= 8 && h <= 10 ? 20 : 0) + (h >= 18 && h <= 20 ? 26 : 0)),
}));

const zones = ["Indiranagar", "Koramangala", "Whitefield", "HSR", "MG Road", "BTM"];

const tooltipStyle = { background: "oklch(1 0 0)", border: "1px solid oklch(0.92 0.005 260)", borderRadius: 8, fontSize: 12 };

function Demand() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <SectionHeading
        eyebrow="Demand"
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
            <div className="text-sm font-medium flex items-center gap-2"><Activity className="size-4" /> 24-hour forecast — Bangalore</div>
            <span className="text-xs text-muted-foreground">predicting</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={hours}>
                <CartesianGrid stroke="oklch(0.92 0.005 260)" vertical={false} />
                <XAxis dataKey="h" stroke="oklch(0.5 0.015 260)" fontSize={10} interval={2} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.5 0.015 260)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="d" name="Actual" stroke="oklch(0.22 0.02 260)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="p" name="Predicted" stroke="oklch(0.65 0.16 245)" strokeWidth={2} dot={false} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium flex items-center gap-2"><MapPin className="size-4" /> City heatmap</div>
            <span className="text-xs text-muted-foreground">live</span>
          </div>
          <div className="grid grid-cols-10 gap-1">
            {Array.from({ length: 100 }).map((_, i) => {
              const v = Math.random();
              const c =
                v > 0.85 ? "oklch(0.22 0.02 260 / 0.95)" :
                v > 0.7 ? "oklch(0.22 0.02 260 / 0.7)" :
                v > 0.5 ? "oklch(0.22 0.02 260 / 0.45)" :
                v > 0.3 ? "oklch(0.22 0.02 260 / 0.2)" :
                "oklch(0.96 0.005 260)";
              return <div key={i} className="aspect-square rounded-sm" style={{ background: c }} />;
            })}
          </div>
          <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
            <span>Low</span>
            <div className="flex-1 mx-2 h-1 rounded-full" style={{ background: "linear-gradient(90deg, oklch(0.96 0.005 260), oklch(0.22 0.02 260))" }} />
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
            <div className="text-3xl font-semibold">{(2.4 - i * 0.3).toFixed(1)}×</div>
            <div className="text-xs text-muted-foreground mt-1">predicted demand multiplier</div>
            <div className="mt-3 flex items-center gap-2 text-xs"><TrendingUp className="size-3.5 text-success" /> Reposition {3 + i} drivers from {zones[i + 3]}.</div>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <div className="text-sm font-medium mb-2">Surge reduction plan</div>
        <p className="text-sm text-muted-foreground">By rebalancing 18 drivers from low-demand BTM into MG Road in the next 12 minutes, we project a surge avoidance of 1.6× and ₹14,200 saved for riders during the next hour.</p>
      </Card>
    </div>
  );
}
