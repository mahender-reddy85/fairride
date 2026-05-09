import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/simulator", label: "Fare" },
  { to: "/driver", label: "Driver" },
  { to: "/pooling", label: "Pooling" },
  { to: "/demand", label: "Insights" },
  { to: "/admin", label: "Analytics" },
  { to: "/assistant", label: "Help" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-sm font-semibold tracking-tight">FairRide</div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 text-sm text-muted-foreground rounded-md hover:text-foreground transition"
              activeProps={{
                className: "px-3 py-2 text-sm rounded-md text-foreground bg-secondary",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <Link
            to="/simulator"
            className="px-4 py-2 text-sm rounded-md bg-foreground text-background font-medium hover:opacity-90 transition"
          >
            Estimate fare
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-md hover:bg-secondary"
          aria-label="Menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="flex flex-col p-3 gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-md text-sm hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
