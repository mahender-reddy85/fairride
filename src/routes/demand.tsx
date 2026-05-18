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
import { Activity, MapPin, CloudRain, Sun, CloudLightning } from "lucide-react";
import { useState } from "react";
import { MOCK_SCENARIOS, MOCK_HOURLY_DEMAND } from "@/mock-api/scenarios";

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

const zones = ["Indiranagar", "Koramangala", "Whitefield", "HSR", "MG Road", "BTM"];

const tooltipStyle = {
  background: "oklch(1 0 0)",
  border: "1px solid oklch(0.92 0.005 260)",
  borderRadius: 8,
  fontSize: 12,
};

function Demand() {
  const [activeScenarioId, setActiveScenarioId] = useState(MOCK_SCENARIOS[0].id);
  const scenario = MOCK_SCENARIOS.find((s) => s.id === activeScenarioId)!;

  // Scale the mock hourly demand based on the active scenario multiplier
  const hours = MOCK_HOURLY_DEMAND.map((item) => ({
    h: item.hour,
    d: Math.round(item.demandIndex * scenario.demandMultiplier),
    p: Math.round(item.demandIndex * scenario.demandMultiplier * 1.05), // Predicted slightly offset
  }));

  const liveMultipliers = [
    (1.4 * scenario.demandMultiplier).toFixed(2),
    (1.1 * scenario.demandMultiplier).toFixed(2),
    (1.8 * scenario.demandMultiplier).toFixed(2),
  ];

  const weatherIcon =
    scenario.weather === "Rain" ? (
      <CloudRain className="size-4" />
    ) : scenario.weather === "Storm" ? (
      <CloudLightning className="size-4" />
    ) : (
      <Sun className="size-4" />
    );

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <SectionHeading
        title={<>Ride Demand Trends</>}
        subtitle="Live estimated demand and driver positioning insights for prototype simulation."
      />

      {/* Scenario Selector */}
      <div className="mt-8 flex flex-wrap gap-2 justify-center">
        {MOCK_SCENARIOS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveScenarioId(s.id)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              activeScenarioId === s.id
                ? "bg-foreground text-background"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground mt-4 mb-8 max-w-2xl mx-auto">
        {scenario.description}
      </p>

      <div className="mt-6 grid md:grid-cols-4 gap-4">
        <Stat label="Data Source" value="Demo" sub={scenario.name} />
        <Stat
          label="Active Drivers"
          value={scenario.activeDrivers.toLocaleString()}
          sub="simulated online"
        />
        <Stat label="Weather" value={scenario.weather} sub="Impact applied" />
        <Stat label="Monitored Zones" value="184" />
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium flex items-center gap-2">
              <Activity className="size-4" /> 24-hour forecast — Bangalore
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {weatherIcon} {scenario.weather}
            </div>
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
          </div>
          <div className="grid grid-cols-10 gap-1 p-1 bg-secondary/20 rounded-xl">
            {Array.from({ length: 100 }).map((_, i) => {
              const x = i % 10;
              const y = Math.floor(i / 10);
              // Deterministic seed based on scenario multiplier
              const seed = scenario.demandMultiplier * 10;
              const intensity =
                ((Math.cos(x / 2 + seed) + Math.sin(y / 2 + seed) + 2) / 4) *
                (scenario.demandMultiplier / 1.5);
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
              <div
                className="h-full bg-foreground/20"
                style={{ width: `${Math.min(100, scenario.demandMultiplier * 60)}%` }}
              />
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
              <span className="text-xs text-muted-foreground">Scenario avg</span>
            </div>
            <div className="text-3xl font-semibold transition-all">{liveMultipliers[i]}×</div>
            <div className="text-xs text-muted-foreground mt-1">demand multiplier</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
