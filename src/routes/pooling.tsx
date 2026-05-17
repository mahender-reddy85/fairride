import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionHeading, Stat } from "@/components/ui-kit";
import { Users, Leaf, Route as RouteIcon, ArrowRight, IndianRupee } from "lucide-react";
import { useState, useMemo } from "react";

export const Route = createFileRoute("/pooling")({
  head: () => ({
    meta: [
      { title: "Pooling Optimizer — FairRide" },
      {
        name: "description",
        content: "Calculate pooling savings and pair riders heading the same way.",
      },
    ],
  }),
  component: Pooling,
});

function Pooling() {
  const [baseFare, setBaseFare] = useState(400);
  const [coRiders, setCoRiders] = useState(1);
  const [overlap, setOverlap] = useState(80);

  const calc = useMemo(() => {
    // FairRide splitting logic:
    // With 1 co-rider (2 total), they split the overlapping portion.
    // Overlap portion = baseFare * (overlap / 100)
    // Non-overlap = baseFare - overlap portion
    // Base cost for this rider = non-overlap + (overlap portion / (coRiders + 1))
    // We add a tiny 5% convenience fee for pooling routing
    
    const overlapPortion = baseFare * (overlap / 100);
    const uniquePortion = baseFare - overlapPortion;
    const splitOverlap = overlapPortion / (coRiders + 1);
    
    const finalFare = Math.round((uniquePortion + splitOverlap) * 1.05);
    const saved = baseFare - finalFare;
    const co2Saved = Math.round((baseFare * 0.05) * coRiders * (overlap / 100)); // proxy for km saved
    
    return { finalFare, saved, co2Saved };
  }, [baseFare, coRiders, overlap]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <SectionHeading
        title={<>Smart Pooling Optimizer</>}
        subtitle="Dynamic split pricing that rewards you for sharing your route. See how much you save."
      />

      <div className="mt-10 grid lg:grid-cols-12 gap-8 items-start">
        {/* CALCULATOR */}
        <Card className="lg:col-span-5 p-6 shadow-md border-border/60 bg-gradient-to-br from-card to-secondary/20">
          <div className="flex items-center gap-2 mb-6">
            <IndianRupee className="size-5 text-success" />
            <h3 className="text-lg font-semibold">Savings Calculator</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Standard Solo Fare</label>
                <span className="text-sm font-semibold">₹{baseFare}</span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="1500" 
                step="50"
                value={baseFare} 
                onChange={(e) => setBaseFare(parseInt(e.target.value))}
                className="w-full accent-success"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Matched Co-riders</label>
                <span className="text-sm font-semibold">{coRiders} rider(s)</span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map(n => (
                  <button
                    key={n}
                    onClick={() => setCoRiders(n)}
                    className={`flex-1 py-2 rounded-md text-sm transition ${coRiders === n ? 'bg-success text-success-foreground font-bold' : 'bg-secondary text-foreground hover:bg-secondary/70'}`}
                  >
                    +{n} Rider
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Route Overlap</label>
                <span className="text-sm font-semibold">{overlap}%</span>
              </div>
              <input 
                type="range" 
                min="40" 
                max="100" 
                step="5"
                value={overlap} 
                onChange={(e) => setOverlap(parseInt(e.target.value))}
                className="w-full accent-success"
              />
              <p className="text-[10px] text-muted-foreground mt-1">Higher overlap means bigger splits and less detour.</p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-background rounded-lg border border-border">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-muted-foreground">Your Pooled Fare</span>
              <span className="text-2xl font-bold text-foreground">₹{calc.finalFare}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Savings</span>
              <span className="text-lg font-bold text-success">₹{calc.saved} ({(calc.saved / baseFare * 100).toFixed(0)}%)</span>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-7 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium">How split pricing works</div>
            </div>
            <div className="grid md:grid-cols-4 gap-3 items-center">
              {[
                { t: "Route analysis", d: "Detour < 6m" },
                { t: "Overlap math", d: `${overlap}% shared route` },
                { t: "Cost split", d: `Divided by ${coRiders + 1}` },
                { t: "Instant discount", d: `Save ₹${calc.saved}` },
              ].map((s, i, arr) => (
                <div key={s.t} className="flex items-center gap-3">
                  <div className="flex-1 rounded-md border border-border bg-card p-3 shadow-sm">
                    <div className="text-[10px] uppercase text-muted-foreground">Step {i + 1}</div>
                    <div className="text-sm font-semibold mt-1 leading-tight">{s.t}</div>
                    <div className="text-xs text-success font-medium mt-1">{s.d}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <ArrowRight className="hidden md:block size-4 text-muted-foreground shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-5">
            <Card>
              <div className="flex items-center gap-2 mb-3">
                <RouteIcon className="size-4" />
                <span className="text-sm font-medium">Route visualization</span>
              </div>
              <div className="relative h-48 rounded-md border border-border bg-secondary/50 overflow-hidden">
                <svg viewBox="0 0 600 200" className="absolute inset-0 w-full h-full">
                  {/* Base Route */}
                  <path
                    d="M40,160 C150,100 250,40 560,60"
                    stroke="oklch(0.5 0.015 260)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeOpacity="0.3"
                  />
                  {/* Shared overlap portion */}
                  <path
                    d="M220,92 C320,50 450,45 560,60"
                    stroke="oklch(0.62 0.15 155)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="8 6"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-28"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </path>
                  <circle cx="40" cy="160" r="6" fill="oklch(0.5 0.015 260)" />
                  <circle cx="220" cy="92" r="6" fill="oklch(0.62 0.15 155)" />
                  <circle cx="560" cy="60" r="6" fill="oklch(0.65 0.16 245)" />
                  <text x="46" y="180" fontSize="11" fill="oklch(0.5 0.015 260)">Your Pickup</text>
                  <text x="220" y="80" fontSize="11" fill="oklch(0.62 0.15 155)" textAnchor="middle">+ Co-rider</text>
                  <text x="554" y="46" fontSize="11" fill="oklch(0.5 0.015 260)" textAnchor="end">Shared Drop</text>
                </svg>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium flex items-center gap-2">
                  <Leaf className="size-4 text-success" /> Environmental Impact
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { l: "CO₂ Avoided", v: `${calc.co2Saved} g` },
                  { l: "Fuel Saved", v: `${(calc.co2Saved / 2300).toFixed(2)} L` },
                ].map((m) => (
                  <div key={m.l} className="rounded-md border border-border bg-card p-4 text-center">
                    <div className="text-2xl font-semibold text-success">{m.v}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{m.l}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-md border border-success/20 bg-success/10 p-3 text-xs">
                <p className="text-success-foreground font-medium text-center">
                  This single pooled ride removes {coRiders} vehicle(s) from peak city traffic.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
