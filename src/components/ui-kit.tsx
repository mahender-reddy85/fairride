import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-6 transition-colors", className)}>
      {children}
    </div>
  );
}

// Backwards-compatible alias used by existing routes
export const GlassCard = Card;

export function SectionHeading({
  title,
  subtitle,
  align = "center",
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base sm:text-lg text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <Card className="text-left">
      <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
      <div className="mt-2 text-3xl font-semibold text-foreground">{value}</div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
    </Card>
  );
}

export function Tag({ children }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
      {children}
    </span>
  );
}

// Backwards-compatible alias
export const AIBadge = Tag;
