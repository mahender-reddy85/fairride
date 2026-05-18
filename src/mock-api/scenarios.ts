export type CityScenario = {
  id: string;
  name: string;
  description: string;
  traffic: "Light" | "Moderate" | "Heavy";
  timeOfDay: "Off-Peak" | "Peak (Morning/Evening)" | "Late Night";
  demandMultiplier: number;
  activeDrivers: number;
  weather: "Clear" | "Rain" | "Storm";
};

export const MOCK_SCENARIOS: CityScenario[] = [
  {
    id: "office-peak",
    name: "Office Peak Hours",
    description: "Standard morning rush (8:30 AM). High demand in residential to commercial zones.",
    traffic: "Heavy",
    timeOfDay: "Peak (Morning/Evening)",
    demandMultiplier: 1.4,
    activeDrivers: 1450,
    weather: "Clear",
  },
  {
    id: "weekend-rain",
    name: "Weekend Rain",
    description: "Saturday evening with unexpected showers. Low driver availability, high demand.",
    traffic: "Heavy",
    timeOfDay: "Peak (Morning/Evening)",
    demandMultiplier: 1.8,
    activeDrivers: 820,
    weather: "Rain",
  },
  {
    id: "airport-rush",
    name: "Airport Late Night",
    description: "Midnight international arrivals. Long distances, light city traffic.",
    traffic: "Light",
    timeOfDay: "Late Night",
    demandMultiplier: 1.1,
    activeDrivers: 410,
    weather: "Clear",
  },
  {
    id: "midday-lull",
    name: "Midday Lull",
    description: "Tuesday at 2:00 PM. Low demand, plenty of drivers.",
    traffic: "Light",
    timeOfDay: "Off-Peak",
    demandMultiplier: 0.8,
    activeDrivers: 1200,
    weather: "Clear",
  },
];

// Mock historical hourly demand data for standard day
export const MOCK_HOURLY_DEMAND = Array.from({ length: 24 }).map((_, h) => {
  const isPeak = (h >= 8 && h <= 10) || (h >= 17 && h <= 20);
  const base = isPeak ? 85 : h < 6 ? 20 : 45;
  return {
    hour: `${h}:00`,
    demandIndex: base + Math.sin(h) * 10, // static curve, no random jitter
  };
});
