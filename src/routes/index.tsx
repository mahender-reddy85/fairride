import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, SectionHeading, Stat } from "@/components/ui-kit";
import {
  ArrowRight,
  Users,
  Leaf,
  TrendingUp,
  Shield,
  Map,
  BarChart3,
  CheckCircle2,
  Quote,
  Wallet,
} from "lucide-react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  CartesianGrid,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FairRide — Fair pricing. Better rides." },
      {
        name: "description",
        content:
          "A simple, fair ride marketplace with transparent pricing and better driver earnings.",
      },
    ],
  }),
  component: Landing,
});

const commissionData = [
  { name: "Uber", v: 28 },
  { name: "Ola", v: 26 },
  { name: "FairRide", v: 8 },
];

function Landing() {
  return (
    <div>
      {/* HERO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-20 lg:pt-28 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-foreground">
                Fair pricing.
                <br />
                Better rides.
              </h1>
              <p className="mt-5 text-lg text-muted-foreground max-w-xl">
                FairRide is a clear and honest way to book rides. Riders pay a fair price, and
                drivers get to keep more of what they earn.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/simulator"
                  className="group inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90 transition"
                >
                  Estimate a fare
                  <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/driver"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-medium hover:bg-secondary transition"
                >
                  Driver dashboard
                </Link>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
                <Stat label="Avg. savings" value="34%" />
                <Stat label="Driver lift" value="+42%" />
                <Stat label="Commission" value="8%" sub="vs 28% market" />
              </div>
            </div>

            <div className="animate-fade-up" style={{ animationDelay: "120ms" }}>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-sm font-medium">Earnings retention</div>
                  <div className="flex gap-4 text-[10px] font-bold uppercase tracking-tighter">
                    <span className="flex items-center gap-1">
                      <div className="size-2 rounded-full bg-foreground" /> You keep
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="size-2 rounded-full bg-secondary" /> Fee
                    </span>
                  </div>
                </div>
                <div className="space-y-6">
                  {[
                    { name: "Uber", keep: 72, fee: 28, delay: "0ms" },
                    { name: "Ola", keep: 74, fee: 26, delay: "150ms" },
                    { name: "FairRide", keep: 92, fee: 8, highlight: true, delay: "300ms" },
                  ].map((p) => (
                    <div key={p.name} className="relative">
                      <div className="flex justify-between text-xs mb-2">
                        <span className={`font-semibold ${p.highlight ? "text-foreground" : "text-muted-foreground"}`}>
                          {p.name}
                        </span>
                        <span className="font-bold">{p.keep}% kept</span>
                      </div>
                      <div className="h-4 w-full flex rounded-full overflow-hidden bg-secondary/30 ring-1 ring-inset ring-border">
                        <div 
                          className={`h-full animate-reveal-width ${p.highlight ? "bg-foreground" : "bg-muted-foreground/40"}`} 
                          style={{ width: `${p.keep}%`, animationDelay: p.delay }} 
                        />
                        <div className="h-full bg-secondary" style={{ width: `${p.fee}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-border/50 text-center">
                  <p className="text-sm font-medium">
                    Drivers make <span className="text-foreground underline decoration-2 underline-offset-4 decoration-success/30">₹6,400+ more</span> per week on average.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          title={<>Built for fairness</>}
          subtitle="Simple tools that help both riders and drivers."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: Wallet,
              title: "Clear pricing",
              desc: "See exactly what you pay. No hidden fees and no sudden price jumps.",
            },
            {
              icon: Users,
              title: "Share a ride",
              desc: "Travel with others going your way and split the bill.",
            },
            {
              icon: TrendingUp,
              title: "Driver tips",
              desc: "We show drivers where more people need rides so they can earn more.",
            },
            {
              icon: BarChart3,
              title: "Earnings tools",
              desc: "See how much you made today and plan your work.",
            },
            {
              icon: Shield,
              title: "Low commission",
              desc: "Drivers keep 92% of every fare — always.",
            },
            {
              icon: Map,
              title: "Now in India",
              desc: "Available in major Indian cities and growing fast.",
            },
          ].map((f) => (
            <Card key={f.title}>
              <div className="grid size-10 place-items-center rounded-md bg-secondary border border-border mb-4">
                <f.icon className="size-5 text-foreground" />
              </div>
              <h3 className="text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* DRIVER BENEFITS */}
      <section className="mx-auto max-w-7xl px-6 py-20 border-t border-border">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              align="left"
              title={<>Drive less. Earn more.</>}
              subtitle="A simple, fair model that rewards consistent driving without race-to-the-bottom pricing."
            />
            <ul className="mt-8 space-y-3">
              {[
                "92% net payout — guaranteed",
                "Hotspot suggestions based on real demand",
                "Daily and weekly earnings summaries",
                "Fair score that rewards safe driving",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-success mt-0.5" />
                  <span className="text-sm">{t}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/driver"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90 transition"
            >
              Open driver dashboard <ArrowRight className="size-4" />
            </Link>
          </div>
          <Card>
            <div className="text-sm font-medium mb-1">Sample weekly earnings</div>
            <p className="text-xs text-muted-foreground mb-4">
              Drivers report a typical 30–45% lift versus other platforms.
            </p>
            <div className="space-y-3">
              {[
                { l: "Monday", v: 1480 },
                { l: "Tuesday", v: 1610 },
                { l: "Wednesday", v: 1390 },
                { l: "Thursday", v: 1720 },
                { l: "Friday", v: 2010 },
                { l: "Saturday", v: 2240 },
                { l: "Sunday", v: 1880 },
              ].map((r) => (
                <div key={r.l}>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>{r.l}</span>
                    <span className="text-foreground font-medium">₹{r.v.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-foreground"
                      style={{ width: `${(r.v / 2240) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat label="Rides completed" value="1.2M" sub="last 30 days" />
          <Stat label="Saved for riders" value="₹38.4 Cr" sub="cumulative" />
          <Stat label="Driver retention" value="94%" sub="6-month" />
          <Stat label="CO₂ avoided" value="612 t" sub="via pooling" />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-20 border-t border-border">
        <SectionHeading title={<>Loved by drivers and riders</>} />
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            {
              q: "I cleared ₹2,300 yesterday — other apps gave me ₹1,400 for the same hours.",
              a: "Ravi K.",
              r: "Driver, Bangalore",
            },
            {
              q: "FairRide pooled me with a colleague going the same way. Half the fare.",
              a: "Anita S.",
              r: "Rider, Mumbai",
            },
            {
              q: "The hotspot map is genuinely helpful. It just works.",
              a: "Imran B.",
              r: "Driver, Delhi",
            },
          ].map((t) => (
            <Card key={t.a}>
              <Quote className="size-5 text-muted-foreground mb-3" />
              <p className="text-sm">{t.q}</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="size-9 rounded-full bg-secondary border border-border" />
                <div>
                  <div className="text-sm font-medium">{t.a}</div>
                  <div className="text-xs text-muted-foreground">{t.r}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <Card className="text-center py-14">
          <Leaf className="mx-auto size-7 text-foreground mb-3" />
          <h3 className="text-3xl sm:text-4xl font-semibold">Ready to ride fair?</h3>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Try the fare estimator and see how much you'd save on your next trip.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link
              to="/simulator"
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background hover:opacity-90 transition"
            >
              Estimate a fare <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/assistant"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-medium hover:bg-secondary transition"
            >
              Visit help center
            </Link>
          </div>
        </Card>
      </section>
      <Footer />
    </div>
  );
}
