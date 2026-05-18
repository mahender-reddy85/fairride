# FairRide

**Transparent fare pricing, smart pooling, and honest driver earnings — in one platform.**

FairRide is a functional MVP that demonstrates how ride pricing _should_ work. It is not a ride-booking app. It is a transparency and analytics tool that lets riders compare fares, simulate pooling savings, and lets drivers see exactly how much more they earn on a fair commission model.

---

## What It Does

### Fare Calculator (Homepage)

A full interactive ride workflow:

1. Enter pickup and destination
2. Set distance, traffic level, and time of day
3. Choose vehicle type (Auto / Mini / Sedan / SUV)
4. See FairRide price vs Uber/Ola market average
5. Compare Solo vs Pool fare
6. See driver earnings impact — live, in the same screen
7. Simulate confirming a ride through to completion

### Pooling Simulator (`/pooling`)

- Set a base solo fare, number of co-riders, and route overlap percentage
- See the exact split fare using real overlap-based math
- View CO₂ avoided and fuel saved
- Interactive SVG route visualization showing pickup, co-rider, and shared drop

### Driver Earnings Calculator (`/driver`)

- Slide weekly gross fares
- Instantly compare net take-home: FairRide (92%) vs Uber/Ola (72–74%)
- See weekly bonus and projected monthly income
- 7-day area chart of weekly earnings
- Driver tier progress bar (Bronze → Silver → Gold → Platinum)
- Demand hotspot heatmap for positioning

### Demand Trends (`/demand`)

- Switch between 4 real city scenarios: Office Peak, Weekend Rain, Airport Late Night, Midday Lull
- 24-hour demand chart (Actual vs Predicted) that responds to the active scenario
- City heatmap seeded deterministically from scenario data — no fake random flicker
- Zone-level demand multipliers per scenario

---

## Pricing Formula

FairRide's fare is calculated using real-world cost components — not arbitrary multipliers:

```
finalFare = (baseFare + distanceCost + trafficAdjustment + nightCharge + platformFee) × cityMultiplier
```

| Component           | Details                                    |
| ------------------- | ------------------------------------------ |
| `baseFare`          | Auto ₹20 / Mini ₹30 / Sedan ₹40 / SUV ₹60  |
| `distanceCost`      | Distance × per-km rate (₹10–₹22 by type)   |
| `trafficAdjustment` | Light +₹0 / Moderate +₹15 / Heavy +₹40     |
| `nightCharge`       | Late Night +₹25                            |
| `platformFee`       | Fixed ₹15 (vs percentage-based market fee) |
| `cityMultiplier`    | 1.05× (standard metro factor)              |

Market (Uber/Ola) estimates use a dynamic surge multiplier (1.1×–1.5×) applied to a traditional base — showing how fare gaps widen during peak hours.

---

## Tech Stack

| Layer         | Technology         |
| ------------- | ------------------ |
| Framework     | React 19           |
| Router        | TanStack Router v1 |
| Data Fetching | TanStack Query v5  |
| Build Tool    | Vite 7             |
| Styling       | Tailwind CSS v4    |
| Charts        | Recharts           |
| Icons         | Lucide React       |
| Language      | TypeScript         |
| Deployment    | Vercel             |

---

## Project Structure

```
src/
├── routes/
│   ├── __root.tsx        # App shell, Navbar, error boundaries
│   ├── index.tsx         # Fare Calculator + 4-step ride workflow
│   ├── pooling.tsx       # Pooling Simulator
│   ├── driver.tsx        # Driver Earnings Dashboard
│   └── demand.tsx        # Demand Trends + Scenario Selector
├── components/
│   ├── Navbar.tsx        # Sticky top nav
│   ├── Footer.tsx        # Footer with product links
│   └── ui-kit.tsx        # Design system: Card, Heading, Label, Caption, Metric, Stat
├── lib/
│   └── calculations.ts   # All business logic: fare, pooling, driver earnings
└── mock-api/
    └── scenarios.ts      # Fixed city scenarios + hourly demand data
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Key Design Decisions

**No fake live data.** The demand dashboard uses fixed scenario datasets, not random number generators. Switching scenarios produces deterministic, believable results.

**No startup pitch language.** Every metric shown is either calculated from user input or clearly labelled as demo/simulated data.

**Centralized logic.** All fare, pooling, and earnings math lives in `src/lib/calculations.ts`. No business logic is scattered across UI components.

**Task-driven UX.** The homepage is a linear workflow (Plan → Compare → Confirm → Complete), not a passive marketing page.

---

## Commission Model

| Platform     | Commission | Driver Keeps |
| ------------ | ---------- | ------------ |
| Uber         | ~28%       | 72%          |
| Ola          | ~26%       | 74%          |
| **FairRide** | **8%**     | **92%**      |

The 8% platform fee is fixed and flat — no percentage cuts that grow with fare value.

---

## Deployment

The project is configured for **Vercel**. A `vercel.json` is included at the root. Push to your connected GitHub repository and Vercel will build automatically.

```json
// vercel.json handles SPA routing rewrites for TanStack Router
```

---

## License

MIT
