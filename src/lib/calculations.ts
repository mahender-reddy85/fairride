export type RideType = "Auto" | "Mini" | "Sedan" | "SUV";
export type TrafficLevel = "Light" | "Moderate" | "Heavy";
export type TimeOfDay = "Off-Peak" | "Peak (Morning/Evening)" | "Late Night";

export function calculateFare(
  distanceKm: number,
  type: RideType,
  traffic: TrafficLevel,
  timeOfDay: TimeOfDay
) {
  const baseRates = { Auto: 15, Mini: 20, Sedan: 25, SUV: 35 };
  const baseRate = baseRates[type];

  let calculated = distanceKm * baseRate;

  // Traffic multiplier
  if (traffic === "Moderate") calculated *= 1.2;
  if (traffic === "Heavy") calculated *= 1.5;

  // Time multiplier
  if (timeOfDay === "Peak (Morning/Evening)") calculated *= 1.3;
  if (timeOfDay === "Late Night") calculated *= 1.4;

  // FairRide applies a 10% discount on whatever the market rate would be
  const marketEstimate = Math.round(calculated * 1.35); // Competitors surge more
  const fairRidePrice = Math.round(calculated);

  return { fairRidePrice, marketEstimate };
}

export function calculatePoolingSavings(
  baseFare: number,
  coRiders: number,
  overlapPct: number
) {
  const overlapPortion = baseFare * (overlapPct / 100);
  const uniquePortion = baseFare - overlapPortion;
  const splitOverlap = overlapPortion / (coRiders + 1);

  const finalFare = Math.round((uniquePortion + splitOverlap) * 1.05); // 5% routing fee
  const saved = baseFare - finalFare;
  const co2Saved = Math.round(baseFare * 0.05 * coRiders * (overlapPct / 100)); // proxy for g of CO2

  return { finalFare, saved, co2Saved };
}

export function calculateDriverEarnings(grossWeekly: number) {
  // FairRide takes exactly 8% commission
  // Market averages 26% to 28%
  const uberNet = Math.round(grossWeekly * 0.72);
  const olaNet = Math.round(grossWeekly * 0.74);
  const fairRideNet = Math.round(grossWeekly * 0.92);

  const monthlyNet = fairRideNet * 4;
  const diffWeekly = fairRideNet - uberNet;

  return {
    uberNet,
    olaNet,
    fairRideNet,
    diffWeekly,
    monthlyNet,
  };
}
