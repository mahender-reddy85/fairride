import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionHeading } from "@/components/ui-kit";
import { useState } from "react";
import { ChevronDown, Mail, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "Help Center — FairRide" },
      { name: "description", content: "Answers to common questions about pricing, pooling, driver earnings and rider safety." },
    ],
  }),
  component: Help,
});

const FAQS = [
  {
    q: "How is the FairRide fare calculated?",
    a: "Every fare uses a transparent formula: ₹25 base + ₹14 per km, plus a small congestion adjustment when needed, plus an 8% platform fee. We never apply hidden surge — you see the breakdown for every trip.",
  },
  {
    q: "Why are FairRide fares lower than other apps?",
    a: "We cap our commission at 8% (others charge 22–28%). That means the same ride costs less for riders and pays more to drivers, without cutting corners on quality or safety.",
  },
  {
    q: "How do drivers earn more on FairRide?",
    a: "Drivers keep 92% of every fare. Combined with hotspot suggestions and demand insights, drivers report a typical 30–45% lift versus other platforms over the same hours.",
  },
  {
    q: "What is pooling and how does it work?",
    a: "Pooling pairs you with another rider going the same direction. Both fares drop, detours stay under 6 minutes, and the cost split is transparent before you confirm.",
  },
  {
    q: "Where is FairRide available?",
    a: "We are currently in private beta in Bangalore, Mumbai and Delhi, with new cities rolling out every quarter.",
  },
  {
    q: "How do I get help during a ride?",
    a: "You can reach support 24/7 from inside the app, or email us at help@fairride.example. Critical safety issues are escalated within minutes.",
  },
];

function Help() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <SectionHeading
        eyebrow="Help"
        title={<>How can we help?</>}
        subtitle="Quick answers to common questions about FairRide."
      />

      <Card className="mt-10 !p-0 divide-y divide-border">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <button
              key={f.q}
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full text-left p-5 hover:bg-secondary/50 transition"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-foreground">{f.q}</span>
                <ChevronDown className={`size-4 text-muted-foreground shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </div>
              {isOpen && <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>}
            </button>
          );
        })}
      </Card>

      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center gap-2 mb-2"><Mail className="size-4" /><span className="text-sm font-medium">Email support</span></div>
          <p className="text-sm text-muted-foreground">help@fairride.example — typical response in under 2 hours.</p>
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-2"><MessageSquare className="size-4" /><span className="text-sm font-medium">In-app chat</span></div>
          <p className="text-sm text-muted-foreground">Open the app menu and tap Support for 24/7 live help.</p>
        </Card>
      </div>
    </div>
  );
}
