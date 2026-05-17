import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold">FairRide</span>
          </div>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            A fair ride marketplace — transparent prices for riders, better earnings for drivers.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/simulator" className="hover:text-foreground">
                Fare estimate
              </Link>
            </li>
            <li>
              <Link to="/driver" className="hover:text-foreground">
                Driver
              </Link>
            </li>
            <li>
              <Link to="/pooling" className="hover:text-foreground">
                Pooling
              </Link>
            </li>
            <li>
              <Link to="/demand" className="hover:text-foreground">
                Insights
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground">
                Analytics
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-foreground">
                Help
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© 2026 FairRide. All rights reserved.</span>
          <span>Fair rides for everyone.</span>
        </div>
      </div>
    </footer>
  );
}
