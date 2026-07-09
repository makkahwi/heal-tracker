import moment from "moment";
import { consumptionProps } from "../Views/Auth/Diet/Consumption";
import { SchedulesMealElementProps } from "../Views/Auth/Diet/Schedule/Elements";
import { walkExerciseProps } from "../Views/Auth/Sports";
import { weightReadingProps } from "../Views/Auth/WeightReadings";

type Unit = "gm" | "Cup(s)" | "Piece(s)" | string;

export interface FoodItem {
  element: string;
  count: number | string;
  unit: Unit;
  note?: string;
  Note?: string;
  alternatives?: FoodItem[];
}

export interface Model2Recommendation {
  analysisWeekStart: string;
  analysisWeekEnd: string;
  latestReading?: weightReadingProps;
  previousReading?: weightReadingProps;
  weeklyChange: { weightKg?: number; fatKg?: number; muscleKg?: number };
  decision: "maintain_schedule" | "adjust_schedule";
  reasons: string[];
  nextWeekSchedule: Array<{
    meal: string;
    time: string;
    items: FoodItem[];
    note?: string;
  }>;
}

type Macro = { kcal: number; protein: number; carbs: number; fat: number };

const GOAL = {
  desiredFatLossKgPerWeek: 1.0,
  minProteinG: 110,
};

const foodDb: Record<string, (count: number, unit: string) => Macro> = {
  "Chicken Breast": (c, u) =>
    perGram(c, u, { kcal: 1.65, protein: 0.31, carbs: 0, fat: 0.036 }),
  Fish: (c, u) =>
    perGram(c, u, { kcal: 1.3, protein: 0.24, carbs: 0, fat: 0.035 }),
  Tuna: (c, u) =>
    perGram(c, u, { kcal: 1.16, protein: 0.26, carbs: 0, fat: 0.01 }),
  Egg: (c) => mul(c, { kcal: 72, protein: 6.3, carbs: 0.4, fat: 5 }),
  Rice: (c, u) =>
    perGram(c, u, { kcal: 1.3, protein: 0.027, carbs: 0.28, fat: 0.003 }),
  Bread: (c) => mul(c, { kcal: 160, protein: 5, carbs: 32, fat: 1.5 }),
  Yogurt: (c) => mul(c, { kcal: 100, protein: 7, carbs: 10, fat: 3 }),
  Shanina: (c) => mul(c, { kcal: 70, protein: 6, carbs: 7, fat: 2 }),
  Labaneh: (c, u) =>
    perGram(c, u, { kcal: 2.0, protein: 0.08, carbs: 0.05, fat: 0.16 }),
  "Areesh Cheese": (c, u) =>
    perGram(c, u, { kcal: 1.4, protein: 0.18, carbs: 0.03, fat: 0.05 }),
  "White Cheese": (c, u) =>
    perGram(c, u, { kcal: 2.6, protein: 0.14, carbs: 0.03, fat: 0.21 }),
  Olive: (c) => mul(c, { kcal: 5, protein: 0, carbs: 0.2, fat: 0.5 }),
  Fruit: (c) => mul(c, { kcal: 80, protein: 1, carbs: 20, fat: 0 }),
  Apricot: (c) => mul(c, { kcal: 17, protein: 0.5, carbs: 4, fat: 0 }),
  "Various Vegetables": (c) =>
    mul(c, { kcal: 35, protein: 2, carbs: 7, fat: 0 }),
  "Cooked Vegetables": (c) =>
    mul(c, { kcal: 80, protein: 2, carbs: 16, fat: 1 }),
  Milk: (c) => mul(c, { kcal: 120, protein: 8, carbs: 12, fat: 5 }),
  Walnuts: (c) => mul(c, { kcal: 26, protein: 0.6, carbs: 0.5, fat: 2.6 }),
};

function perGram(count: number, unit: string, perG: Macro): Macro {
  const grams = unit === "gm" ? count : count * 100;
  return mul(grams, perG);
}

function mul(x: number, m: Macro): Macro {
  return {
    kcal: x * m.kcal,
    protein: x * m.protein,
    carbs: x * m.carbs,
    fat: x * m.fat,
  };
}

function add(a: Macro, b: Macro): Macro {
  return {
    kcal: a.kcal + b.kcal,
    protein: a.protein + b.protein,
    carbs: a.carbs + b.carbs,
    fat: a.fat + b.fat,
  };
}

function n(v: unknown): number | undefined {
  const x = typeof v === "string" ? Number(v) : typeof v === "number" ? v : NaN;
  return Number.isFinite(x) ? x : undefined;
}

function round(x: number, d = 1): number {
  const p = 10 ** d;
  return Math.round(x * p) / p;
}

function daysAgo(date: string, endDate: string): number {
  const a = moment(date, "YYYY-MM-DD", true);
  const b = moment(endDate, "YYYY-MM-DD", true);

  if (!a.isValid() || !b.isValid()) {
    return Number.POSITIVE_INFINITY;
  }

  return b.startOf("day").diff(a.startOf("day"), "days");
}

function estimateItem(item: FoodItem): Macro {
  const count = n(item.count) ?? 1;
  const fn = foodDb[item.element];
  return fn ? fn(count, item.unit) : { kcal: 0, protein: 0, carbs: 0, fat: 0 };
}

function estimateConsumed(entries: consumptionProps[]): Macro {
  return entries
    .flatMap((e) => e.contents || [])
    .reduce((sum, item) => add(sum, estimateItem(item)), {
      kcal: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    });
}

function normalizeDate(value: unknown): string {
  const parsed = moment(value as moment.MomentInput);
  return parsed.isValid() ? parsed.format("YYYY-MM-DD") : "";
}

function buildNextWeekSchedule(
  adjust: boolean,
): Model2Recommendation["nextWeekSchedule"] {
  const riceLunch = adjust ? 120 : 150;
  const riceDinner = adjust ? 80 : 120;
  const lunchProtein = adjust ? 170 : 150;
  const dinnerProtein = adjust ? 160 : 140;

  return [
    {
      meal: "Breakfast",
      time: "08:00",
      items: [
        { element: "Egg", count: 2, unit: "Piece(s)" },
        {
          element: "Bread",
          count: 1,
          unit: "Piece(s)",
          note: "small reef / 2 toast max",
        },
        { element: "Various Vegetables", count: 1, unit: "Cup(s)" },
        { element: "Olive", count: 4, unit: "Piece(s)" },
      ],
    },
    {
      meal: "Snack Meal 1",
      time: "11:30",
      items: [
        { element: "Yogurt", count: 1, unit: "Cup(s)" },
        {
          element: "Fruit",
          count: 1,
          unit: "Piece(s)",
          note: "apple/orange/banana half if large",
        },
      ],
    },
    {
      meal: "Lunch",
      time: "15:30",
      items: [
        {
          element: "Chicken Breast",
          count: lunchProtein,
          unit: "gm",
          alternatives: [
            { element: "Fish", count: lunchProtein, unit: "gm" },
            { element: "Tuna", count: 1, unit: "Can" },
          ],
        },
        {
          element: "Rice",
          count: riceLunch,
          unit: "gm",
          note: "cooked weight",
        },
        { element: "Various Vegetables", count: 2, unit: "Cup(s)" },
        { element: "Yogurt", count: 1, unit: "Cup(s)" },
      ],
    },
    {
      meal: "Snack Meal 2",
      time: "18:30",
      items: [
        { element: "Various Vegetables", count: 1, unit: "Cup(s)" },
        {
          element: "Walnuts",
          count: 4,
          unit: "Piece(s)",
          note: "or lupine/chickpeas small portion",
        },
      ],
    },
    {
      meal: "Dinner",
      time: "21:00",
      items: [
        {
          element: "Chicken Breast",
          count: dinnerProtein,
          unit: "gm",
          alternatives: [
            { element: "Fish", count: dinnerProtein, unit: "gm" },
            { element: "Egg", count: 3, unit: "Piece(s)" },
          ],
        },
        {
          element: "Rice",
          count: riceDinner,
          unit: "gm",
          note: "skip rice if no walking or late dinner",
        },
        { element: "Various Vegetables", count: 2, unit: "Cup(s)" },
      ],
    },
  ];
}

interface Model2Input {
  weightReadings: weightReadingProps[];
  consumed: consumptionProps[];
  sportSessions: walkExerciseProps[];
}

export function recommendWeeklyHealthModel2({
  weightReadings,
  consumed,
  sportSessions,
}: Model2Input): Model2Recommendation {
  const sortedWeights = [...weightReadings].sort((a, b) =>
    a.date < b.date ? -1 : 1,
  );
  const latest = sortedWeights.at(-1);

  if (!latest) {
    throw new Error("No weight readings found");
  }

  const weekEnd = latest.date;
  const previous = [...sortedWeights]
    .reverse()
    .find((w) => w.date < weekEnd && daysAgo(w.date, weekEnd) >= 5);

  const weeklyConsumed = consumed.filter((entry) => {
    const date = normalizeDate(entry.timestamp);
    const age = daysAgo(date, weekEnd);
    return age >= 0 && age <= 6;
  });

  const weeklySports = sportSessions.filter((session) => {
    const age = daysAgo(session.date, weekEnd);
    return age >= 0 && age <= 6;
  });

  const weeklyMacro = estimateConsumed(weeklyConsumed);
  const avgProtein = weeklyConsumed.length
    ? weeklyMacro.protein / 7
    : undefined;

  const wNow = n(latest.weight);
  const wPrev = n(previous?.weight);
  const fNow = n(latest.fat);
  const fPrev = n(previous?.fat);
  const mNow = n(latest.muscles);
  const mPrev = n(previous?.muscles);

  const weeklyChange = {
    weightKg:
      wNow !== undefined && wPrev !== undefined
        ? round(wNow - wPrev, 2)
        : undefined,
    fatKg:
      fNow !== undefined && fPrev !== undefined
        ? round(fNow - fPrev, 2)
        : undefined,
    muscleKg:
      mNow !== undefined && mPrev !== undefined
        ? round(mNow - mPrev, 2)
        : undefined,
  };

  const reasons: string[] = [];

  if (weeklyChange.fatKg !== undefined && weeklyChange.fatKg > -0.6) {
    reasons.push(
      "Fat loss is slower than target; reduce rice/bread slightly and keep protein high.",
    );
  }

  if (weeklyChange.muscleKg !== undefined && weeklyChange.muscleKg < -0.2) {
    reasons.push(
      "Muscle reading dropped; increase protein and add resistance training.",
    );
  }

  if (avgProtein !== undefined && avgProtein < GOAL.minProteinG) {
    reasons.push(`Estimated protein is low: ${round(avgProtein, 0)}g/day.`);
  }

  if (
    weeklySports.filter((s) => (s.type || "").toLowerCase().includes("walk"))
      .length < 3
  ) {
    reasons.push("Walking/activity sessions were low this week.");
  }

  if (!reasons.length) {
    reasons.push(
      "Trend is acceptable; keep the same structure with small portion control.",
    );
  }

  const adjust = reasons.some((reason) =>
    /slower|dropped|low|reduce/i.test(reason),
  );

  return {
    analysisWeekStart: moment(weekEnd).subtract(6, "days").format("YYYY-MM-DD"),
    analysisWeekEnd: weekEnd,
    latestReading: latest,
    previousReading: previous,
    weeklyChange,
    decision: adjust ? "adjust_schedule" : "maintain_schedule",
    reasons,
    nextWeekSchedule: buildNextWeekSchedule(adjust),
  };
}

export function mapElementToScheduleElement(
  mealId: string,
  item: FoodItem,
): SchedulesMealElementProps {
  return {
    meal: mealId,
    element: item.element,
    count: parseFloat(String(item.count)),
    unit: item.unit,
    note: item.note || item.Note,
    alternatives: item.alternatives?.map((alternative) => ({
      element: alternative.element,
      count: parseFloat(String(alternative.count)),
      unit: alternative.unit,
      note: alternative.note || alternative.Note,
    })),
  };
}
