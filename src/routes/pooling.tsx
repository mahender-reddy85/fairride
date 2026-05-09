import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionHeading, Stat } from "@/components/ui-kit";
import { Users, Leaf, Route as RouteIcon, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/pooling")({
  head: () => ({
    meta: [
      { title: "Pooling — FairRide" },
      {
        name: "description",
        content: "Pair riders heading the same way to cut costs, congestion and emissions.",
      },
    ],
  }),
  component: Pooling,
});

const matches = [
  { id: 1, a: "Indiranagar → Whitefield", b: "Domlur → Whitefield", overlap: 92, save: 45 },
  { id: 2, a: "HSR → MG Road", b: "Koramangala → MG Road", overlap: 84, save: 38 },
  { id: 3, a: "Jayanagar → Electronic City", b: "BTM → Electronic City", overlap: 96, save: 52 },
];

function Pooling() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <SectionHeading
        title={<>Share your ride</>}
        subtitle="Travel with others going your way to save money and keep the trip fast."
      />

      <div className="mt-12 grid md:grid-cols-4 gap-4">
        <Stat label="Matched today" value="4,812" />
        <Stat label="Avg. save" value="42%" />
        <Stat label="Detour cap" value="< 6 min" />
        <Stat label="CO₂ saved" value="612 kg" sub="this week" />
      </div>

      <Card className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium">How matching works</div>
        </div>
        <div className="grid md:grid-cols-5 gap-3 items-center">
          {[
            { t: "Riders queued", d: "12 active requests" },
            { t: "Route map", d: "OSM + traffic data" },
            { t: "Pair scoring", d: "overlap × detour × fairness" },
            { t: "Cost split", d: "transparent rule-based" },
            { t: "Dispatch", d: "matched in 2.4s avg" },
          ].map((s, i, arr) => (
            <div key={s.t} className="flex items-center gap-3">
              <div className="flex-1 rounded-md border border-border bg-card p-4">
                <div className="text-xs text-muted-foreground">Step {i + 1}</div>
                <div className="text-sm font-semibold mt-1">{s.t}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.d}</div>
              </div>
              {i < arr.length - 1 && (
                <ArrowRight className="hidden md:block size-4 text-muted-foreground shrink-0" />
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-6 grid lg:grid-cols-2 gap-5">
        <Card>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium flex items-center gap-2">
              <Users className="size-4" /> Live pool candidates
            </div>
            <span className="text-xs text-muted-foreground">matching</span>
          </div>
          <div className="space-y-3">
            {matches.map((m) => (
              <div key={m.id} className="rounded-md border border-border bg-card p-4">
                <div className="flex items-center justify-between text-sm">
                  <span>{m.a}</span>
                  <span className="text-muted-foreground">+</span>
                  <span>{m.b}</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <div className="text-muted-foreground">Overlap</div>
                    <div className="text-base font-semibold">{m.overlap}%</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Each saves</div>
                    <div className="text-base font-semibold text-success">₹{m.save}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Status</div>
                    <div className="text-base font-semibold">Pairing…</div>
                  </div>
                </div>
                <div className="mt-2 h-1 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-foreground" style={{ width: `${m.overlap}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium flex items-center gap-2">
              <Leaf className="size-4 text-success" /> Environmental impact
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { l: "CO₂ avoided", v: "612 kg" },
              { l: "Cars off road", v: "1,204" },
              { l: "Fuel saved", v: "248 L" },
              { l: "Trees equiv.", v: "29" },
            ].map((m) => (
              <div key={m.l} className="rounded-md border border-border bg-card p-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{m.l}</div>
                <div className="mt-1 text-2xl font-semibold">{m.v}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-md border border-border bg-secondary p-3 text-xs">
            <div className="font-semibold">Insight</div>
            <p className="mt-1 text-muted-foreground">
              Routing 38% of solo trips through pools could cut Bangalore CBD congestion by an
              estimated 14% during peak hours.
            </p>
          </div>
        </Card>
      </div>

      <Card className="mt-6">
        <div className="flex items-center gap-2 mb-3">
          <RouteIcon className="size-4" />
          <span className="text-sm font-medium">Route optimization sample</span>
        </div>
        <div className="relative h-56 rounded-md border border-border bg-secondary overflow-hidden">
          <svg viewBox="0 0 600 200" className="absolute inset-0 w-full h-full">
            <path
              d="M40,160 C150,100 250,40 560,60"
              stroke="oklch(0.22 0.02 260)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="6 6"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-24"
                dur="1.8s"
                repeatCount="indefinite"
              />
            </path>
            <circle cx="40" cy="160" r="6" fill="oklch(0.22 0.02 260)" />
            <circle cx="220" cy="92" r="6" fill="oklch(0.62 0.15 155)" />
            <circle cx="560" cy="60" r="6" fill="oklch(0.65 0.16 245)" />
            <text x="46" y="180" fontSize="11" fill="oklch(0.5 0.015 260)">
              Rider A pickup
            </text>
            <text x="220" y="84" fontSize="11" fill="oklch(0.62 0.15 155)" textAnchor="middle">
              + Rider B (2 min detour)
            </text>
            <text x="554" y="50" fontSize="11" fill="oklch(0.5 0.015 260)" textAnchor="end">
              Shared destination
            </text>
          </svg>
        </div>
      </Card>
    </div>
  );
}
