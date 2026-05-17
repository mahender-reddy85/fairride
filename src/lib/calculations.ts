export type RideType = "Auto" | "Mini" | "Sedan" | "SUV";
export type TrafficLevel = "Light" | "Moderate" | "Heavy";
export type TimeOfDay = "Off-Peak" | "Peak (Morning/Evening)" | "Late Night";

export function calculateFare(
  distanceKm: number,
  type: RideType,
  traffic: TrafficLevel,
  timeOfDay: TimeOfDay
) {
  // Real-world cost components
  const baseFares = { Auto: 20, Mini: 30, Sedan: 40, SUV: 60 };
  const perKmRates = { Auto: 10, Mini: 13, Sedan: 16, SUV: 22 };
  
  const baseFare = baseFares[type];
  const perKmRate = perKmRates[type];
  const distanceCost = distanceKm * perKmRate;

  // Modifiers
  const trafficAdjustment = traffic === "Heavy" ? 40 : traffic === "Moderate" ? 15 : 0;
  const nightCharge = timeOfDay === "Late Night" ? 25 : 0;
  const cityMultiplier = 1.05; // Standard metro city factor
  
  // FairRide platform fee (fixed flat fee vs percentage)
  const platformFee = 15;

  const finalFairRideFare = Math.round(
    (baseFare + distanceCost + trafficAdjustment + nightCharge + platformFee) * cityMultiplier
  );

  // Compare against traditional algorithms that rely on dynamic surge multipliers
  const marketSurge = traffic === "Heavy" ? 1.5 : timeOfDay === "Peak (Morning/Evening)" ? 1.3 : 1.1;
  const traditionalBase = baseFare + distanceCost + (timeOfDay === "Late Night" ? 20 : 0);
  
  const uberEstimate = Math.round((traditionalBase * marketSurge) + 20); // Uber avg
  const olaEstimate = Math.round((traditionalBase * (marketSurge - 0.05)) + 15); // Ola avg

  return { fairRidePrice: finalFairRideFare, marketEstimate: uberEstimate, uberEstimate, olaEstimate };
}

export function calculatePoolingSavings(
  baseFare: number,
  coRiders: number,
  overlapPct: number
) {
  const overlapPortion = baseFare * (overlapPct / 100);
  const uniquePortion = baseFare - overlapPortion;
  const splitOverlap = overlapPortion / (coRiders + 1);

  const finalFare = Math.round((uniquePortion + splitOverlap) + 10); // 10rs routing fee
  const saved = baseFare - finalFare;
  const co2Saved = Math.round(baseFare * 0.05 * coRiders * (overlapPct / 100));

  return { finalFare, saved, co2Saved };
}

export function calculateDriverEarnings(grossWeekly: number) {
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
