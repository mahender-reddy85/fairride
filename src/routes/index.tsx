import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, SectionHeading, Stat } from "@/components/ui-kit";
import {
  ArrowRight,
  MapPin,
  Navigation2,
  Loader2,
  Users,
  Clock,
  Shield,
  Wallet,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Footer } from "@/components/Footer";
import { calculateFare, RideType, TrafficLevel, TimeOfDay } from "@/lib/calculations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FairRide — Transparent Pricing. Better Rides." },
      {
        name: "description",
        content:
          "Estimate your fare, see how much you save, and discover a ride marketplace built on fairness.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [pickup, setPickup] = useState("Indiranagar");
  const [destination, setDestination] = useState("Koramangala");
  const [distance, setDistance] = useState<number>(12);
  const [traffic, setTraffic] = useState<TrafficLevel>("Moderate");
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("Off-Peak");
  const [type, setType] = useState<RideType>("Sedan");
  const [loading, setLoading] = useState(false);
  
  // Basic validation check
  const isValid = pickup.trim().length > 0 && destination.trim().length > 0;

  // Real interactive calculation logic using centralized utilities
  const result = useMemo(() => {
    if (!isValid) return null;
    
    const { fairRidePrice, marketEstimate } = calculateFare(distance, type, traffic, timeOfDay);
    
    // Simulate other market apps (Uber usually higher than Ola, both higher than FairRide)
    const uber = Math.round(marketEstimate * 1.05);
    const ola = Math.round(marketEstimate * 0.98);
    const fair = fairRidePrice;
    
    // Pooling splits the fair ride cost significantly, assuming 1 match
    const pool = Math.round(fair * 0.55); 
    
    const baseEta = Math.round(distance * 3); // 3 mins per km base
    const eta = traffic === "Heavy" ? Math.round(baseEta * 1.8) : traffic === "Moderate" ? Math.round(baseEta * 1.3) : baseEta;
    
    // Derive a base cost without surge/multipliers to show in UI
    const baseRates = { Auto: 15, Mini: 20, Sedan: 25, SUV: 35 };
    const base = Math.round(distance * baseRates[type]);

    return { distance, base, uber, ola, fair, pool, eta };
  }, [distance, traffic, timeOfDay, type, isValid]);

  const [displayResult, setDisplayResult] = useState(result);

  useEffect(() => {
    if (!isValid) return;
    setLoading(true);
    const timer = setTimeout(() => {
      setDisplayResult(result);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [result, isValid]);

  const savings = displayResult ? displayResult.uber - displayResult.fair : 0;
  const poolSavings = displayResult ? displayResult.fair - displayResult.pool : 0;

  return (
    <div>
      {/* HERO WITH ESTIMATOR */}
      <section className="border-b border-border bg-gradient-to-b from-background to-secondary/20">
        <div className="mx-auto max-w-7xl px-6 pt-12 pb-20 lg:pt-20 lg:pb-28">
          <div className="text-center mb-12 max-w-3xl mx-auto animate-fade-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-foreground">
              Ride fairly.
              <br />
              Pay transparently.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              No hidden algorithms. Real-time pricing based on distance and standard traffic. See exactly what you'll pay and how much drivers earn.
            </p>
          </div>

          <div className="grid xl:grid-cols-12 gap-8 items-start max-w-6xl mx-auto animate-fade-up" style={{ animationDelay: "100ms" }}>
            {/* ESTIMATOR CONTROLS */}
            <Card className="xl:col-span-5 p-6 shadow-xl border-border/60">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 flex items-center gap-1"><Navigation2 className="size-3 text-muted-foreground" /> Pickup</label>
                    <input 
                      type="text" 
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      placeholder="Enter pickup location"
                      className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 flex items-center gap-1"><MapPin className="size-3 text-destructive" /> Destination</label>
                    <input 
                      type="text" 
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="Enter destination"
                      className={`w-full rounded-md border bg-card px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-foreground ${destination.trim() === '' ? 'border-destructive ring-1 ring-destructive' : 'border-border'}`}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">Distance ({distance} km)</label>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="50" 
                    value={distance} 
                    onChange={(e) => setDistance(parseInt(e.target.value))}
                    className="w-full accent-foreground"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1 px-1">
                    <span>1 km</span>
                    <span>50 km</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Traffic</label>
                    <select 
                      value={traffic} 
                      onChange={(e) => setTraffic(e.target.value as any)}
                      className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-foreground"
                    >
                      <option value="Light">Light</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Heavy">Heavy</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Time</label>
                    <select 
                      value={timeOfDay} 
                      onChange={(e) => setTimeOfDay(e.target.value as any)}
                      className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-foreground"
                    >
                      <option value="Off-Peak">Off-Peak</option>
                      <option value="Peak (Morning/Evening)">Peak (Morning/Evening)</option>
                      <option value="Late Night">Late Night</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Ride Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(["Auto", "Mini", "Sedan", "SUV"] as RideType[]).map((t) => {
                      const images = {
                        Auto: "/vehicle_auto_3d_1778335919106.png",
                        Mini: "/vehicle_mini_3d_1778335935334.png",
                        Sedan: "/vehicle_sedan_3d_1778335948676.png",
                        SUV: "/vehicle_suv_3d_1778335966152.png",
                      };
                      return (
                        <button
                          key={t}
                          onClick={() => setType(t)}
                          className={`group relative flex flex-col items-center gap-1 rounded-xl p-2 transition-all border-2 ${
                            type === t
                              ? "border-foreground bg-foreground/5 shadow-sm"
                              : "border-border bg-card hover:border-foreground/30 hover:bg-secondary/50"
                          }`}
                        >
                          <div className="w-full aspect-video flex items-center justify-center rounded-md bg-secondary/30 transition-transform group-hover:scale-105">
                            <img src={images[t]} alt={t} className="h-10 object-contain drop-shadow-sm" />
                          </div>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider ${type === t ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {t}
                          </span>
                          {type === t && (
                            <div className="absolute -top-1.5 -right-1.5 size-4 rounded-full bg-foreground flex items-center justify-center">
                              <div className="size-1 rounded-full bg-background" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Driver Commission</span>
                    <span className="font-medium text-foreground">8% FairRide vs 28% Market</span>
                  </div>
                  <div className="h-1.5 w-full flex rounded-full overflow-hidden bg-secondary">
                    <div className="h-full bg-success/80" style={{ width: '92%' }} title="Driver Keeps 92%" />
                    <div className="h-full bg-foreground/20" style={{ width: '8%' }} title="Platform 8%" />
                  </div>
                </div>
              </div>
            </Card>

            {/* ESTIMATOR RESULTS */}
            <div className="xl:col-span-7 space-y-4">
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { label: "Market Avg (Uber)", v: displayResult.uber, good: false },
                  { label: "Market Avg (Ola)", v: displayResult.ola, good: false },
                  { label: "FairRide Solo", v: displayResult.fair, good: true },
                ].map((c) => (
                  <Card
                    key={c.label}
                    className={`p-5 flex flex-col justify-between transition-opacity duration-300 ${c.good ? "border-foreground bg-foreground text-background shadow-lg scale-105" : "border-border bg-card opacity-80"} ${loading ? "opacity-50" : ""}`}
                  >
                    <div className={`text-xs uppercase tracking-wider font-semibold ${c.good ? "text-background/80" : "text-muted-foreground"}`}>
                      {c.label}
                    </div>
                    <div className="mt-4 text-3xl font-bold">₹{c.v}</div>
                    {c.good && (
                      <div className="mt-2 text-xs font-medium text-success-foreground bg-success/20 px-2 py-1 rounded-sm self-start inline-block">
                        Save ₹{savings}
                      </div>
                    )}
                  </Card>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Card className={`!p-5 bg-card border-success/30 transition-opacity duration-300 ${loading ? "opacity-50" : ""}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-success">
                        <Users className="size-4" /> FairRide Pool
                      </div>
                      <div className="mt-2 text-3xl font-bold text-foreground">₹{displayResult.pool}</div>
                      <div className="mt-1 text-sm text-muted-foreground">Split with 1 rider on route</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-success">Save extra</div>
                      <div className="text-lg font-bold text-success">₹{poolSavings}</div>
                    </div>
                  </div>
                </Card>

                <Card className={`!p-5 transition-opacity duration-300 ${loading ? "opacity-50" : ""}`}>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <Clock className="size-4" /> Trip Details
                  </div>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Est. Travel Time</span>
                      <span className="font-semibold">{displayResult.eta} mins</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Base Distance</span>
                      <span className="font-semibold">₹{displayResult.base}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Surge Multiplier</span>
                      <span className="font-semibold text-warning">
                        {traffic === "Heavy" || timeOfDay.includes("Peak") ? "1.1x (Capped)" : "1.0x"}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PILLARS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          title={<>The FairRide Difference</>}
          subtitle="A transportation platform built on data, transparency, and fairness."
        />
        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          <Card className="flex flex-col h-full border-transparent bg-secondary/50">
            <div className="grid size-12 place-items-center rounded-lg bg-background border border-border mb-5">
              <Shield className="size-6 text-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
            <p className="text-muted-foreground leading-relaxed flex-1">
              No black-box algorithms maximizing profit during rain. Our fare is strictly calculated on distance, time, and a strict surge cap. You see exactly where your money goes.
            </p>
          </Card>
          <Card className="flex flex-col h-full border-transparent bg-secondary/50">
            <div className="grid size-12 place-items-center rounded-lg bg-background border border-border mb-5">
              <Users className="size-6 text-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Pooling</h3>
            <p className="text-muted-foreground leading-relaxed flex-1">
              Our intelligent dispatch pairs riders along optimal routes with minimal detour (under 6 mins). Save up to 45% while reducing city congestion and emissions.
            </p>
            <Link to="/pooling" className="mt-4 text-sm font-semibold flex items-center gap-1 hover:underline">
              See Pooling Optimizer <ArrowRight className="size-3" />
            </Link>
          </Card>
          <Card className="flex flex-col h-full border-transparent bg-secondary/50">
            <div className="grid size-12 place-items-center rounded-lg bg-background border border-border mb-5">
              <Wallet className="size-6 text-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Driver First</h3>
            <p className="text-muted-foreground leading-relaxed flex-1">
              Drivers are partners, not gig workers to be squeezed. We charge a flat 8% commission (compared to 25-30% market average). Drivers earn more, riders pay less.
            </p>
            <Link to="/driver" className="mt-4 text-sm font-semibold flex items-center gap-1 hover:underline">
              View Driver Insights <ArrowRight className="size-3" />
            </Link>
          </Card>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-foreground text-background py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-1">1.2M+</div>
              <div className="text-background/70 text-sm font-medium">Rides Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">₹38Cr</div>
              <div className="text-background/70 text-sm font-medium">Saved for Riders</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">42%</div>
              <div className="text-background/70 text-sm font-medium">Avg. Driver Income Lift</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">612t</div>
              <div className="text-background/70 text-sm font-medium">CO₂ Avoided via Pools</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

