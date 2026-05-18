import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, SectionHeading, Heading, Label, Caption, Metric } from "@/components/ui-kit";
import {
  ArrowRight,
  MapPin,
  Navigation2,
  Loader2,
  Users,
  Shield,
  Wallet,
  CheckCircle2,
  Car,
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

type WorkflowStep = "input" | "compare" | "confirm" | "complete";

function Landing() {
  const [step, setStep] = useState<WorkflowStep>("input");
  const [pickup, setPickup] = useState("Indiranagar");
  const [destination, setDestination] = useState("Koramangala");
  const [distance, setDistance] = useState<number>(12);
  const [traffic, setTraffic] = useState<TrafficLevel>("Moderate");
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("Off-Peak");
  const [type, setType] = useState<RideType>("Sedan");
  const [loading, setLoading] = useState(false);
  const [selectedFareType, setSelectedFareType] = useState<"Solo" | "Pool">("Solo");

  const isValid = pickup.trim().length > 0 && destination.trim().length > 0;

  const result = useMemo(() => {
    if (!isValid) return null;
    const { fairRidePrice, uberEstimate, olaEstimate } = calculateFare(
      distance,
      type,
      traffic,
      timeOfDay,
    );
    const pool = Math.round(fairRidePrice * 0.55);
    const baseEta = Math.round(distance * 3);
    const eta =
      traffic === "Heavy"
        ? Math.round(baseEta * 1.8)
        : traffic === "Moderate"
          ? Math.round(baseEta * 1.3)
          : baseEta;
    return { distance, uber: uberEstimate, ola: olaEstimate, fair: fairRidePrice, pool, eta };
  }, [distance, traffic, timeOfDay, type, isValid]);

  const [displayResult, setDisplayResult] = useState(result);

  useEffect(() => {
    if (!isValid || step !== "input") return;
    setLoading(true);
    const timer = setTimeout(() => {
      setDisplayResult(result);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [result, isValid, step]);

  const handleEstimate = () => {
    if (isValid) setStep("compare");
  };

  return (
    <div>
      <section className="border-b border-border bg-gradient-to-b from-background to-secondary/20">
        <div className="mx-auto max-w-7xl px-6 pt-12 pb-20 lg:pt-20 lg:pb-28">
          <div className="text-center mb-12 max-w-3xl mx-auto animate-fade-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-foreground">
              Ride fairly.
              <br />
              Pay transparently.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Experience the FairRide workflow. See real-time transparent pricing, compare savings,
              and track driver earnings directly in the flow.
            </p>
          </div>

          <div className="max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "100ms" }}>
            <Card className="p-6 shadow-xl border-border/60">
              {/* STEP 1: INPUT */}
              {step === "input" && (
                <div className="space-y-6">
                  <Heading>Plan Your Ride</Heading>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-2 flex items-center gap-1">
                        <Navigation2 className="size-3 text-muted-foreground" /> Pickup
                      </Label>
                      <input
                        type="text"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        placeholder="Enter pickup location"
                        className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-foreground"
                      />
                    </div>
                    <div>
                      <Label className="mb-2 flex items-center gap-1">
                        <MapPin className="size-3 text-destructive" /> Destination
                      </Label>
                      <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="Enter destination"
                        className={`w-full rounded-md border bg-card px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-foreground ${!isValid ? "border-destructive ring-1 ring-destructive" : "border-border"}`}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Distance ({distance} km)</Label>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={distance}
                      onChange={(e) => setDistance(parseInt(e.target.value))}
                      className="w-full accent-foreground"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-2 block">Traffic</Label>
                      <select
                        value={traffic}
                        onChange={(e) => setTraffic(e.target.value as TrafficLevel)}
                        className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none"
                      >
                        <option value="Light">Light</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Heavy">Heavy</option>
                      </select>
                    </div>
                    <div>
                      <Label className="mb-2 block">Time</Label>
                      <select
                        value={timeOfDay}
                        onChange={(e) => setTimeOfDay(e.target.value as TimeOfDay)}
                        className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none"
                      >
                        <option value="Off-Peak">Off-Peak</option>
                        <option value="Peak (Morning/Evening)">Peak (Morning/Evening)</option>
                        <option value="Late Night">Late Night</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">Ride Type</Label>
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
                            className={`group relative flex flex-col items-center gap-1 rounded-xl p-2 transition-all border-2 ${type === t ? "border-foreground bg-foreground/5 shadow-sm" : "border-border bg-card hover:border-foreground/30"}`}
                          >
                            <div className="w-full aspect-video flex items-center justify-center rounded-md bg-secondary/30">
                              <img
                                src={images[t]}
                                alt={t}
                                className="h-10 object-contain drop-shadow-sm"
                              />
                            </div>
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider ${type === t ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {t}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    onClick={handleEstimate}
                    disabled={!isValid || loading}
                    className="w-full mt-4 bg-foreground text-background font-semibold py-3 rounded-lg hover:bg-foreground/90 transition flex justify-center items-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin size-4" /> : "Calculate Fare"}{" "}
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              )}

              {/* STEP 2: COMPARE */}
              {step === "compare" && displayResult && (
                <div className="space-y-6 animate-fade-in">
                  <button
                    onClick={() => setStep("input")}
                    className="text-xs text-muted-foreground hover:text-foreground hover:underline mb-2 block"
                  >
                    &larr; Back to Route
                  </button>
                  <Heading>Compare & Choose</Heading>
                  <div className="flex justify-between items-center bg-secondary/30 p-3 rounded-md border border-border mb-4">
                    <div className="text-sm">
                      <span className="font-semibold text-foreground block">{pickup}</span>
                      <span className="text-muted-foreground block text-xs">
                        to {destination} ({displayResult.distance}km)
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-foreground block">{type}</span>
                      <span className="text-muted-foreground text-xs block">
                        {displayResult.eta} mins ETA
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {/* Market Averages */}
                    <div className="p-4 rounded-xl border border-border bg-secondary/20 flex justify-between items-center opacity-60">
                      <div>
                        <Label>Uber / Ola (Avg)</Label>
                        <Caption>Includes peak surge</Caption>
                      </div>
                      <Metric className="text-xl">
                        ₹{Math.round((displayResult.uber + displayResult.ola) / 2)}
                      </Metric>
                    </div>

                    {/* FairRide Solo */}
                    <button
                      onClick={() => setSelectedFareType("Solo")}
                      className={`p-4 rounded-xl border-2 transition-all flex justify-between items-center text-left ${selectedFareType === "Solo" ? "border-foreground bg-foreground/5 shadow-sm" : "border-border bg-card hover:border-foreground/30"}`}
                    >
                      <div>
                        <Label className="flex items-center gap-2">
                          <Car className="size-4 text-foreground" /> FairRide Solo
                        </Label>
                        <Caption>No hidden surge, direct route</Caption>
                      </div>
                      <div className="text-right">
                        <Metric className="text-2xl text-success">₹{displayResult.fair}</Metric>
                        <Caption className="text-success font-medium">
                          -₹{displayResult.uber - displayResult.fair} vs Market
                        </Caption>
                      </div>
                    </button>

                    {/* FairRide Pool */}
                    <button
                      onClick={() => setSelectedFareType("Pool")}
                      className={`p-4 rounded-xl border-2 transition-all flex justify-between items-center text-left ${selectedFareType === "Pool" ? "border-foreground bg-foreground/5 shadow-sm" : "border-border bg-card hover:border-foreground/30"}`}
                    >
                      <div>
                        <Label className="flex items-center gap-2">
                          <Users className="size-4 text-foreground" /> FairRide Pool
                        </Label>
                        <Caption>Share ride, save up to 45%</Caption>
                      </div>
                      <div className="text-right">
                        <Metric className="text-2xl text-foreground">₹{displayResult.pool}</Metric>
                        <Caption className="text-success font-medium">
                          -₹{displayResult.fair - displayResult.pool} vs Solo
                        </Caption>
                      </div>
                    </button>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <Label className="mb-2 block">Driver Earnings Impact</Label>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Standard App (Driver Net)</span>
                      <span className="font-medium text-destructive">
                        ₹{Math.round(displayResult.fair * 0.72)} (72%)
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span>FairRide (Driver Net)</span>
                      <span className="font-medium text-success">
                        ₹{Math.round(displayResult.fair * 0.92)} (92%)
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep("confirm")}
                    className="w-full bg-foreground text-background font-semibold py-3 rounded-lg hover:bg-foreground/90 transition"
                  >
                    Confirm {selectedFareType} Ride
                  </button>
                </div>
              )}

              {/* STEP 3: CONFIRM (SIMULATING MATCH) */}
              {step === "confirm" && (
                <div className="space-y-6 animate-fade-in text-center py-10">
                  <Loader2 className="size-12 animate-spin text-muted-foreground mx-auto mb-4" />
                  <Heading>Finding your driver...</Heading>
                  <Caption>
                    Simulating nearby {type} drivers for {selectedFareType} ride.
                  </Caption>
                  {/* Simulate a 2.5s wait, then go to complete. Handled by a quick effect below */}
                  <ConfirmEffect onComplete={() => setStep("complete")} />
                </div>
              )}

              {/* STEP 4: COMPLETE */}
              {step === "complete" && displayResult && (
                <div className="space-y-6 animate-fade-in text-center py-6">
                  <div className="size-16 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <Heading>Ride Confirmed!</Heading>
                  <Caption>Your driver is 4 minutes away.</Caption>

                  <div className="bg-secondary/30 p-4 rounded-xl border border-border text-left mt-6">
                    <Label className="block mb-2">Simulation Summary</Label>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">You pay</span>
                        <span className="font-semibold text-foreground">
                          ₹{selectedFareType === "Pool" ? displayResult.pool : displayResult.fair}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Driver earns</span>
                        <span className="font-semibold text-success">
                          ₹
                          {Math.round(
                            (selectedFareType === "Pool"
                              ? displayResult.pool
                              : displayResult.fair) * 0.92,
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Platform fee</span>
                        <span className="font-semibold">8%</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep("input")}
                    className="w-full bg-secondary text-foreground border border-border font-semibold py-3 rounded-lg hover:bg-secondary/80 transition mt-6"
                  >
                    Start New Simulation
                  </button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* ADDITIONAL EXPLORATION (Only show on input step to keep focus) */}
      {step === "input" && (
        <section className="mx-auto max-w-7xl px-6 py-20 animate-fade-in">
          <SectionHeading
            title={<>Explore the Engine</>}
            subtitle="Deep dive into the math and simulations powering FairRide."
          />
          <div className="mt-12 grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="flex flex-col h-full border-transparent bg-secondary/50">
              <div className="grid size-12 place-items-center rounded-lg bg-background border border-border mb-5">
                <Users className="size-6 text-foreground" />
              </div>
              <Heading className="mb-2">Pooling Simulator</Heading>
              <Caption className="flex-1 mb-4">
                Test dynamic fare splitting logic. See how adding co-riders along an overlapping
                route reduces costs for riders while maintaining driver payouts.
              </Caption>
              <Link
                to="/pooling"
                className="text-sm font-semibold flex items-center gap-1 hover:underline text-foreground"
              >
                Open Pooling Simulator <ArrowRight className="size-3" />
              </Link>
            </Card>
            <Card className="flex flex-col h-full border-transparent bg-secondary/50">
              <div className="grid size-12 place-items-center rounded-lg bg-background border border-border mb-5">
                <Wallet className="size-6 text-foreground" />
              </div>
              <Heading className="mb-2">Driver Earnings</Heading>
              <Caption className="flex-1 mb-4">
                Compare weekly and monthly projected income using a flat 8% platform fee versus the
                standard 28% market commission.
              </Caption>
              <Link
                to="/driver"
                className="text-sm font-semibold flex items-center gap-1 hover:underline text-foreground"
              >
                Open Earnings Calculator <ArrowRight className="size-3" />
              </Link>
            </Card>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

// Helper to simulate a delay without messy effect hooks in the main render body
function ConfirmEffect({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);
  return null;
}
