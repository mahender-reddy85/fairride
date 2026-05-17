import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionHeading, Stat } from "@/components/ui-kit";
import { Users, Leaf, Route as RouteIcon, ArrowRight, IndianRupee } from "lucide-react";
import { useState, useMemo } from "react";
import { calculatePoolingSavings } from "@/lib/calculations";

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
    return calculatePoolingSavings(baseFare, coRiders, overlap);
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
                    className={`flex-1 py-2 rounded-md text-sm transition ${coRiders === n ? 'bg-foreground text-background font-bold shadow-sm' : 'bg-secondary text-foreground hover:bg-secondary/70'}`}
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
            <Card className="flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <RouteIcon className="size-4" />
                <span className="text-sm font-medium">Route visualization</span>
              </div>
              <div className="relative h-64 flex-1 rounded-md border border-border bg-[#E5E3DF] dark:bg-[#1a1f2c] overflow-hidden">
                <svg viewBox="0 0 600 300" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-muted/20" />
                    </pattern>
                    {/* Map Pin Marker */}
                    <marker id="pin-start" viewBox="0 0 24 24" refX="12" refY="24" markerWidth="24" markerHeight="24">
                      <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 16 8 16s8-10.75 8-16c0-4.42-3.58-8-8-8zm0 11.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 4.5 12 4.5 15.5 6.07 15.5 8 13.93 11.5 12 11.5z" fill="currentColor" className="text-foreground" />
                    </marker>
                    <marker id="pin-pickup" viewBox="0 0 24 24" refX="12" refY="24" markerWidth="24" markerHeight="24">
                      <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 16 8 16s8-10.75 8-16c0-4.42-3.58-8-8-8zm0 11.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 4.5 12 4.5 15.5 6.07 15.5 8 13.93 11.5 12 11.5z" fill="oklch(0.62 0.15 155)" />
                    </marker>
                    <marker id="pin-end" viewBox="0 0 24 24" refX="12" refY="24" markerWidth="24" markerHeight="24">
                      <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 16 8 16s8-10.75 8-16c0-4.42-3.58-8-8-8zm0 11.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 4.5 12 4.5 15.5 6.07 15.5 8 13.93 11.5 12 11.5z" fill="oklch(0.65 0.16 245)" />
                    </marker>
                  </defs>

                  {/* Water / River */}
                  <path d="M -50 250 Q 150 200 300 350 T 650 100 L 650 350 L -50 350 Z" fill="#AADAFF" className="dark:fill-[#1e293b]" opacity="0.6" />
                  <path d="M -50 220 Q 150 170 300 320 T 650 70 L 650 150 Q 400 350 250 250 T -50 280 Z" fill="#99C2FF" className="dark:fill-[#0f172a]" opacity="0.4" />

                  {/* Parks */}
                  <path d="M 50 20 Q 120 -10 180 40 Q 200 100 130 120 Q 60 140 30 80 Z" fill="#C8E6C9" className="dark:fill-[#064e3b]" opacity="0.5" />
                  <path d="M 400 180 Q 480 150 520 220 Q 550 280 480 300 Q 400 310 380 240 Z" fill="#C8E6C9" className="dark:fill-[#064e3b]" opacity="0.5" />

                  {/* Base Grid */}
                  <rect width="100%" height="100%" fill="url(#smallGrid)" />

                  {/* Minor Roads */}
                  <path d="M 0 50 L 600 80 M 0 150 L 600 120 M 0 250 L 600 280 M 100 0 L 80 300 M 300 0 L 320 300 M 500 0 L 480 300" stroke="#FFFFFF" className="dark:stroke-[#334155]" strokeWidth="3" fill="none" opacity="0.8" />
                  <path d="M 50 0 L 150 300 M 250 0 L 180 300 M 450 0 L 550 300 M 0 100 L 600 180 M 0 200 L 600 220" stroke="#FFFFFF" className="dark:stroke-[#334155]" strokeWidth="2" fill="none" opacity="0.6" />

                  {/* Major Arterial Roads */}
                  <path d="M -20,120 Q 200,100 620,80" fill="none" stroke="#F5B041" className="dark:stroke-[#d97706]" opacity="0.4" strokeWidth="8" />
                  <path d="M 280,-20 Q 300,150 250,320" fill="none" stroke="#F5B041" className="dark:stroke-[#d97706]" opacity="0.4" strokeWidth="6" />
                  <path d="M -20,220 Q 250,250 620,200" fill="none" stroke="#F5B041" className="dark:stroke-[#d97706]" opacity="0.4" strokeWidth="6" />
                  <path d="M 450,-20 Q 420,150 480,320" fill="none" stroke="#F5B041" className="dark:stroke-[#d97706]" opacity="0.4" strokeWidth="6" />

                  {/* Rider A Original Path (Faded out after pooling) */}
                  <path
                    d="M 60,180 Q 150,150 220,110 T 320,80 Q 450,70 540,60"
                    stroke="currentColor"
                    className="text-foreground/20"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                  />

                  {/* Combined Path Base (Rider A starts, then goes to B, then joint) */}
                  <path
                    d="M 60,180 Q 120,160 160,150 T 220,110 T 320,80 Q 450,70 540,60"
                    stroke="currentColor"
                    className="text-foreground"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                  
                  {/* Rider B pickup segment & shared route overlay */}
                  <path
                    d="M 220,110 T 320,80 Q 450,70 540,60"
                    stroke="oklch(0.62 0.15 155)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="12 8"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-40"
                      dur="1.5s"
                      repeatCount="indefinite"
                      timingFunction="linear"
                    />
                  </path>

                  {/* Markers & Labels */}
                  {/* Rider A Pickup */}
                  <circle cx="60" cy="180" r="14" fill="oklch(0.22 0.02 260 / 0.1)" />
                  <path d="M 60,180 L 60,180" markerEnd="url(#pin-start)" stroke="none" />
                  
                  <rect x="25" y="195" width="70" height="20" rx="4" fill="var(--color-card)" className="opacity-90 shadow-sm" />
                  <text x="60" y="208" fontSize="10" fontWeight="bold" fill="currentColor" className="text-foreground" textAnchor="middle">You</text>

                  {/* Rider B Pickup */}
                  <circle cx="220" cy="110" r="14" fill="oklch(0.62 0.15 155 / 0.1)" />
                  <path d="M 220,110 L 220,110" markerEnd="url(#pin-pickup)" stroke="none" />
                  
                  <rect x="185" y="65" width="70" height="20" rx="4" fill="var(--color-card)" className="opacity-90 shadow-sm" />
                  <text x="220" y="78" fontSize="10" fontWeight="bold" fill="oklch(0.62 0.15 155)" textAnchor="middle">+ Co-rider</text>
                  
                  {/* Joint Destination */}
                  <circle cx="540" cy="60" r="14" fill="oklch(0.65 0.16 245 / 0.1)" />
                  <path d="M 540,60 L 540,60" markerEnd="url(#pin-end)" stroke="none" />
                  
                  <rect x="495" y="15" width="90" height="20" rx="4" fill="var(--color-card)" className="opacity-90 shadow-sm" />
                  <text x="540" y="28" fontSize="10" fontWeight="bold" fill="oklch(0.65 0.16 245)" textAnchor="middle">Shared Drop</text>
                  
                  {/* Small tooltip pointing to detour */}
                  <path d="M 170,120 L 195,135" stroke="currentColor" strokeWidth="1" className="text-foreground" />
                  <circle cx="170" cy="120" r="2" fill="currentColor" className="text-foreground" />
                  <rect x="110" y="105" width="55" height="16" rx="2" fill="var(--color-card)" className="opacity-90" />
                  <text x="137" y="116" fontSize="8" fontWeight="bold" fill="currentColor" className="text-foreground" textAnchor="middle">2m detour</text>

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
