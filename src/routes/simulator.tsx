import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionHeading } from "@/components/ui-kit";
import { useState } from "react";
import { MapPin, Navigation2, Loader2, TrendingDown, Users, Clock, Car } from "lucide-react";

export const Route = createFileRoute("/simulator")({
  head: () => ({
    meta: [
      { title: "Fare Estimate — FairRide" },
      { name: "description", content: "Compare ride fares across providers and see a fair, transparent price." },
    ],
  }),
  component: Simulator,
});

type RideType = "Mini" | "Sedan" | "SUV" | "Auto";

function Simulator() {
  const [pickup, setPickup] = useState("Indiranagar, Bangalore");
  const [drop, setDrop] = useState("Koramangala, Bangalore");
  const [type, setType] = useState<RideType>("Sedan");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | ReturnType<typeof computeFare>>(null);

  function computeFare() {
    const km = 6 + Math.round(Math.random() * 8);
    const mult = type === "Auto" ? 0.65 : type === "Mini" ? 0.85 : type === "SUV" ? 1.4 : 1;
    const base = Math.round((25 + km * 14) * mult);
    const uber = Math.round(base * 1.32);
    const ola = Math.round(base * 1.28);
    const fair = Math.round(base * 0.94);
    const pool = Math.round(fair * 0.62);
    const eta = 3 + Math.round(Math.random() * 6);
    return { km, base, uber, ola, fair, pool, eta };
  }

  function run() {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(computeFare());
      setLoading(false);
    }, 700);
  }

  const savings = result ? result.uber - result.fair : 0;
  const poolSavings = result ? result.fair - result.pool : 0;

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <SectionHeading
        eyebrow="Fare Estimate"
        title={<>Get a fair fare in seconds</>}
        subtitle="Enter your trip and compare a transparent FairRide price with other apps."
      />

      <div className="mt-12 grid lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-2">
          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Pickup</label>
              <div className="mt-1.5 flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2.5">
                <MapPin className="size-4 text-muted-foreground" />
                <input value={pickup} onChange={(e) => setPickup(e.target.value)} className="flex-1 bg-transparent text-sm outline-none" />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Drop</label>
              <div className="mt-1.5 flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2.5">
                <Navigation2 className="size-4 text-muted-foreground" />
                <input value={drop} onChange={(e) => setDrop(e.target.value)} className="flex-1 bg-transparent text-sm outline-none" />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Ride type</label>
              <div className="mt-1.5 grid grid-cols-4 gap-2">
                {(["Auto", "Mini", "Sedan", "SUV"] as RideType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`rounded-md px-3 py-2 text-xs font-medium transition border ${
                      type === t ? "bg-foreground text-background border-foreground" : "border-border hover:bg-secondary"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={run} disabled={loading} className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90 disabled:opacity-60">
              {loading ? <><Loader2 className="size-4 animate-spin" /> Calculating…</> : <>Estimate fare</>}
            </button>
          </div>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium">Fare comparison</div>
              <span className="text-xs text-muted-foreground">{loading ? "computing…" : result ? "ready" : "idle"}</span>
            </div>
            {!result && !loading && (
              <p className="text-sm text-muted-foreground py-12 text-center">Enter a route to see a comparison.</p>
            )}
            {loading && (
              <div className="py-12 grid place-items-center text-muted-foreground">
                <div className="flex items-center gap-2 text-sm"><Loader2 className="size-4 animate-spin" /> Calculating fare…</div>
              </div>
            )}
            {result && (
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { label: "Uber", v: result.uber, good: false },
                  { label: "Ola", v: result.ola, good: false },
                  { label: "FairRide", v: result.fair, good: true },
                ].map((c) => (
                  <div key={c.label} className={`rounded-md p-4 border ${c.good ? "border-foreground bg-secondary" : "border-border bg-card"}`}>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                    <div className="mt-1 text-2xl font-semibold text-foreground">₹{c.v}</div>
                    <div className="mt-1 text-[11px] text-muted-foreground">{result.km} km · {result.eta} min</div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {result && (
            <div className="grid sm:grid-cols-3 gap-3">
              <Card className="!p-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground"><TrendingDown className="size-4 text-success" /> You save vs Uber</div>
                <div className="mt-1 text-2xl font-semibold text-success">₹{savings}</div>
              </Card>
              <Card className="!p-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground"><Users className="size-4 text-foreground" /> Pool with 1 rider</div>
                <div className="mt-1 text-2xl font-semibold">₹{result.pool}</div>
                <div className="text-[11px] text-muted-foreground">save another ₹{poolSavings}</div>
              </Card>
              <Card className="!p-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground"><Clock className="size-4 text-foreground" /> Pickup ETA</div>
                <div className="mt-1 text-2xl font-semibold">~ 8 min</div>
                <div className="text-[11px] text-muted-foreground">avoid 6–7pm peak</div>
              </Card>
            </div>
          )}

          {result && (
            <Card>
              <div className="text-sm font-medium mb-2">Fare breakdown</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Distance baseline: ₹{result.base} ({result.km} km).</li>
                <li>• Demand index moderate; no surge applied → ₹{result.fair}.</li>
                <li>• Pool option available — splits fare to ₹{result.pool}.</li>
                <li>• Departing now beats peak by ~9 minutes.</li>
              </ul>
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <Car className="size-3.5" /> Driver receives 92% of every rupee.
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
