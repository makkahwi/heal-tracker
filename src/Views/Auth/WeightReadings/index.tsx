import {
  faArrowCircleDown,
  faArrowCircleUp,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Fragment, useEffect, useState } from "react";

import * as BeAPI from "../../../API";
import dbData from "../../../API/backup.json";
import Form from "../../../Components/Form";
import PageSection from "../../../Components/PageView/PageSection";
import { getHighest, getLowest } from "../../../Utils/functions";
import WeightReadingCharts from "./Charts";
import WeightReadingsTable from "./Table";

export interface weightReadingProps {
  id?: string;
  date: string;
  weight: number;
  fat: number;
  water: number;
  waist: number;
  muscles: number;
}

export interface changeCalculationProps {
  color: string;
  changeAmount: string | number;
  unit?: string;
  changePercentage: string;
  icon: any;
}

export interface calculationsProps {
  weightWeeklyChange: changeCalculationProps;
  fatWeeklyChange: changeCalculationProps;
  waterWeeklyChange: changeCalculationProps;
  waistWeeklyChange: changeCalculationProps;
  musclesWeeklyChange: changeCalculationProps;

  weightSinceWorstChange: changeCalculationProps;
  fatSinceWorstChange: changeCalculationProps;
  waterSinceWorstChange: changeCalculationProps;
  waistSinceWorstChange: changeCalculationProps;
  musclesSinceWorstChange: changeCalculationProps;

  weightSinceBestChange: changeCalculationProps;
  fatSinceBestChange: changeCalculationProps;
  waterSinceBestChange: changeCalculationProps;
  waistSinceBestChange: changeCalculationProps;
  musclesSinceBestChange: changeCalculationProps;

  weightSinceStartChange: changeCalculationProps;
  fatSinceStartChange: changeCalculationProps;
  waterSinceStartChange: changeCalculationProps;
  waistSinceStartChange: changeCalculationProps;
  musclesSinceStartChange: changeCalculationProps;
}

export type fullWeightReadingProps = weightReadingProps & calculationsProps;

const WeightReadings = () => {
  const [data, setData] = useState<fullWeightReadingProps[]>([]);

  const changeCalculator = (
    first: number,
    second: number,
    flip: boolean,
    unit?: string
  ) => {
    let icon = faMinusCircle;
    let color = "secondary";

    if (parseFloat(String(first)) > parseFloat(String(second))) {
      icon = faArrowCircleDown;
      color = flip ? "danger" : "success";
    } else if (parseFloat(String(first)) < parseFloat(String(second))) {
      icon = faArrowCircleUp;
      color = flip ? "success" : "danger";
    }

    const changeAmount = parseFloat(
      (parseFloat(String(second)) - parseFloat(String(first))).toFixed(2)
    );
    const changePercentage = ((changeAmount / first) * 100).toFixed(2);

    return {
      color,
      changeAmount,
      unit,
      changePercentage,
      icon,
    };
  };

  const emptyCalculations = {
    color: "",
    changeAmount: "",
    changePercentage: "",
    icon: "",
  };

  const getData = () =>
    BeAPI.getAll("WeightReadings")
      .then((res: weightReadingProps[]) => {
        const sortedRes = res?.sort(
          (a: weightReadingProps, b: weightReadingProps) =>
            a.date < b.date ? 1 : -1
        );

        setData(
          sortedRes?.map(
            ({ id, date, weight, fat, water, waist, muscles }, i) => {
              const previousRecord = sortedRes[i + 1];
              const firstRecord = sortedRes[sortedRes.length - 1];

              const worstWeight = getHighest(
                sortedRes.filter((_, y) => y > i).map(({ weight }) => weight)
              );
              const bestWeight = getLowest(
                sortedRes.filter((_, y) => y > i).map(({ weight }) => weight)
              );
              const worstFat = getHighest(
                sortedRes.filter((_, y) => y > i).map(({ fat }) => fat)
              );
              const bestFat = getLowest(
                sortedRes.filter((_, y) => y > i).map(({ fat }) => fat)
              );
              const worstWater = getLowest(
                sortedRes.filter((_, y) => y > i).map(({ water }) => water)
              );
              const bestWater = getHighest(
                sortedRes.filter((_, y) => y > i).map(({ water }) => water)
              );
              const worstWaist = getHighest(
                sortedRes.filter((_, y) => y > i).map(({ waist }) => waist)
              );
              const bestWaist = getLowest(
                sortedRes.filter((_, y) => y > i).map(({ waist }) => waist)
              );
              const worstMuscles = getLowest(
                sortedRes.filter((_, y) => y > i).map(({ muscles }) => muscles)
              );
              const bestMuscles = getHighest(
                sortedRes.filter((_, y) => y > i).map(({ muscles }) => muscles)
              );
              return {
                id,
                date,
                weight,
                fat,
                water,
                waist,
                muscles,
                weightWeeklyChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(
                        previousRecord?.weight,
                        weight,
                        false,
                        " KG"
                      )
                    : emptyCalculations,
                fatWeeklyChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(previousRecord?.fat, fat, false, "KG")
                    : emptyCalculations,
                waterWeeklyChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(previousRecord?.water, water, true, "L")
                    : emptyCalculations,
                waistWeeklyChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(previousRecord?.waist, waist, false)
                    : emptyCalculations,
                musclesWeeklyChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(
                        previousRecord?.muscles,
                        muscles,
                        true,
                        " KG"
                      )
                    : emptyCalculations,
                weightSinceWorstChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(worstWeight, weight, false, " KG")
                    : emptyCalculations,
                fatSinceWorstChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(worstFat, fat, false, "KG")
                    : emptyCalculations,
                waterSinceWorstChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(worstWater, water, true, "L")
                    : emptyCalculations,
                waistSinceWorstChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(worstWaist, waist, false)
                    : emptyCalculations,
                musclesSinceWorstChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(worstMuscles, muscles, true, " KG")
                    : emptyCalculations,
                weightSinceBestChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(bestWeight, weight, false, " KG")
                    : emptyCalculations,
                fatSinceBestChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(bestFat, fat, false, "KG")
                    : emptyCalculations,
                waterSinceBestChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(bestWater, water, true, "L")
                    : emptyCalculations,
                waistSinceBestChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(bestWaist, waist, false)
                    : emptyCalculations,
                musclesSinceBestChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(bestMuscles, muscles, true, " KG")
                    : emptyCalculations,
                weightSinceStartChange:
                  i < sortedRes.length - 2
                    ? changeCalculator(
                        firstRecord?.weight,
                        weight,
                        false,
                        " KG"
                      )
                    : emptyCalculations,
                fatSinceStartChange:
                  i < sortedRes.length - 2
                    ? changeCalculator(firstRecord?.fat, fat, false, "KG")
                    : emptyCalculations,
                waterSinceStartChange:
                  i < sortedRes.length - 2
                    ? changeCalculator(firstRecord?.water, water, true, "L")
                    : emptyCalculations,
                waistSinceStartChange:
                  i < sortedRes.length - 2
                    ? changeCalculator(firstRecord?.waist, waist, false)
                    : emptyCalculations,
                musclesSinceStartChange:
                  i < sortedRes.length - 2
                    ? changeCalculator(
                        firstRecord?.muscles,
                        muscles,
                        true,
                        " KG"
                      )
                    : emptyCalculations,
              };
            }
          )
        );
      })
      .catch((err) => console.log({ err }));

  useEffect(() => {
    // scheduleAPI.getAll().then((res: MealViewProps[][]) => setData(res));
    getData();
  }, []);

  const formInputs = [
    {
      name: "date",
      label: "Date",
      type: "date",
      required: true,
    },
    {
      name: "water",
      label: "Water Reading",
      type: "number",
      step: "0.1",
      unit: "L",
      required: true,
    },
    {
      name: "fat",
      label: "Fat Weight",
      type: "number",
      step: "0.1",
      unit: "KG",
      required: true,
    },
    {
      name: "weight",
      label: "Weight",
      type: "number",
      step: "0.1",
      unit: "KG",
      required: true,
    },
    {
      name: "muscles",
      label: "Muscles Reading",
      type: "number",
      step: "0.1",
      unit: "KG",
      required: true,
    },
    {
      name: "waist",
      label: "Waist Fat Reading",
      type: "number",
      step: "0.1",
      required: true,
    },
  ];

  const onSubmit = (values: weightReadingProps) => {
    BeAPI.create("WeightReadings", values)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));
  };

  const onDelete = (id: string) =>
    BeAPI.remove("WeightReadings", id)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));

  return (
    <PageSection title="Weight Readings">
      <Fragment>
        {/* {JSON.stringify(
          Object.keys(
            dbData.WeightReadings["908r1hATCyZHv6iIZBnGkgDrL1J3"]
          ).reduce(
            (final, key) => ({
              ...final,
              [key]: {
                ...(dbData.WeightReadings as any)[
                  "908r1hATCyZHv6iIZBnGkgDrL1J3"
                ][key],
                water: (
                  ((dbData.WeightReadings as any)[
                    "908r1hATCyZHv6iIZBnGkgDrL1J3"
                  ][key].water /
                    100) *
                  (dbData.WeightReadings as any)[
                    "908r1hATCyZHv6iIZBnGkgDrL1J3"
                  ][key].weight
                ).toFixed(2),
                muscles: (
                  (dbData.WeightReadings as any)[
                    "908r1hATCyZHv6iIZBnGkgDrL1J3"
                  ][key].muscles * 0.5
                ).toFixed(2),
                waist: (
                  ((dbData.WeightReadings as any)[
                    "908r1hATCyZHv6iIZBnGkgDrL1J3"
                  ][key].waist *
                    11) /
                  8
                ).toFixed(2),
                fat: (
                  (((dbData.WeightReadings as any)[
                    "908r1hATCyZHv6iIZBnGkgDrL1J3"
                  ][key].fat *
                    1.396) /
                    100) *
                  (dbData.WeightReadings as any)[
                    "908r1hATCyZHv6iIZBnGkgDrL1J3"
                  ][key].weight
                ).toFixed(2),
              },
            }),
            {}
          )
        )} */}
        <h4 className="my-3">
          Total Number of Weight Readings (Visits): {data.length}
        </h4>

        <div className="btn-group my-3 w-100">
          <button
            className="btn btn-secondary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#analysis"
            aria-expanded="false"
            aria-controls="analysis"
          >
            Analysis
          </button>

          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#input"
            aria-expanded="false"
            aria-controls="input"
          >
            Input
          </button>
        </div>
        <div className="collapse multi-collapse" id="analysis">
          <WeightReadingCharts data={data} />
        </div>
        <div className="collapse multi-collapse" id="input">
          <Form inputs={formInputs} onSubmit={onSubmit} />
        </div>
        <WeightReadingsTable data={data} onDelete={onDelete} />
      </Fragment>
    </PageSection>
  );
};

export default WeightReadings;
