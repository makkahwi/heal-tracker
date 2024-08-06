import {
  faArrowCircleDown,
  faArrowCircleUp,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Fragment, useEffect, useState } from "react";

import * as BeAPI from "../../../API";
import Form from "../../../Components/Form";
import PageSection from "../../../Components/PageView/PageSection";
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
  physique: number;
  bones: number;
}

export interface changeCalculationProps {
  color: string;
  changeAmount: string | number;
  unit?: string;
  changePercentage: string;
  icon: any;
}

export interface calculationsProps {
  fatWeight: string;
  musclesPercentage: string;

  weightWeeklyChange: changeCalculationProps;
  fatWeeklyChange: changeCalculationProps;
  fatWeightWeeklyChange: changeCalculationProps;
  waterWeeklyChange: changeCalculationProps;
  waistWeeklyChange: changeCalculationProps;
  musclesWeeklyChange: changeCalculationProps;
  musclesPercentageWeeklyChange: changeCalculationProps;
  physiqueWeeklyChange: changeCalculationProps;
  bonesWeeklyChange: changeCalculationProps;

  weightSinceStartChange: changeCalculationProps;
  fatSinceStartChange: changeCalculationProps;
  fatWeightSinceStartChange: changeCalculationProps;
  waterSinceStartChange: changeCalculationProps;
  waistSinceStartChange: changeCalculationProps;
  musclesSinceStartChange: changeCalculationProps;
  musclesPercentageSinceStartChange: changeCalculationProps;
  physiqueSinceStartChange: changeCalculationProps;
  bonesSinceStartChange: changeCalculationProps;
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
    let icon = faArrowCircleUp;
    let color = flip ? "success" : "danger";

    if (first > second) {
      icon = faArrowCircleDown;
      color = flip ? "danger" : "success";
    } else if (first == second) {
      icon = faMinusCircle;
      color = "secondary";
    }

    const changeAmount = parseFloat((second - first).toFixed(2));
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
            (
              { id, date, weight, fat, water, waist, muscles, physique, bones },
              i
            ) => {
              const previousRecord = sortedRes[i + 1];
              const firstRecord = sortedRes[sortedRes.length - 1];

              return {
                id,
                date,
                weight,
                fat,
                water,
                waist,
                muscles,
                physique,
                bones,
                fatWeight: (Math.round(fat * weight) / 100).toFixed(2),
                musclesPercentage: Math.round((muscles / weight) * 100).toFixed(
                  2
                ),
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
                    ? changeCalculator(previousRecord?.fat, fat, false, "%")
                    : emptyCalculations,
                fatWeightWeeklyChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(
                        parseFloat(
                          (
                            Math.round(
                              previousRecord?.fat * previousRecord?.weight
                            ) / 100
                          ).toFixed(2)
                        ),
                        parseFloat((Math.round(fat * weight) / 100).toFixed(2)),
                        false,
                        " KG"
                      )
                    : emptyCalculations,
                waterWeeklyChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(previousRecord?.water, water, true, "%")
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
                musclesPercentageWeeklyChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(
                        parseFloat(
                          Math.round(
                            (previousRecord?.muscles / previousRecord?.weight) *
                              100
                          ).toFixed(2)
                        ),
                        parseFloat(
                          Math.round((muscles / weight) * 100).toFixed(2)
                        ),
                        true,
                        "%"
                      )
                    : emptyCalculations,
                physiqueWeeklyChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(previousRecord?.physique, physique, true)
                    : emptyCalculations,
                bonesWeeklyChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(previousRecord?.bones, bones, true)
                    : emptyCalculations,
                weightSinceStartChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(
                        firstRecord?.weight,
                        weight,
                        false,
                        " KG"
                      )
                    : emptyCalculations,
                fatSinceStartChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(firstRecord?.fat, fat, false, "%")
                    : emptyCalculations,
                fatWeightSinceStartChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(
                        parseFloat(
                          (
                            Math.round(firstRecord?.fat * firstRecord?.weight) /
                            100
                          ).toFixed(2)
                        ),
                        parseFloat((Math.round(fat * weight) / 100).toFixed(2)),
                        false,
                        " KG"
                      )
                    : emptyCalculations,
                waterSinceStartChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(firstRecord?.water, water, true, "%")
                    : emptyCalculations,
                waistSinceStartChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(firstRecord?.waist, waist, false)
                    : emptyCalculations,
                musclesSinceStartChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(
                        firstRecord?.muscles,
                        muscles,
                        true,
                        " KG"
                      )
                    : emptyCalculations,
                musclesPercentageSinceStartChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(
                        parseFloat(
                          Math.round(
                            (firstRecord?.muscles / firstRecord?.weight) * 100
                          ).toFixed(2)
                        ),
                        parseFloat(
                          Math.round((muscles / weight) * 100).toFixed(2)
                        ),
                        true,
                        "%"
                      )
                    : emptyCalculations,
                physiqueSinceStartChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(firstRecord?.physique, physique, true)
                    : emptyCalculations,
                bonesSinceStartChange:
                  i < sortedRes.length - 1
                    ? changeCalculator(firstRecord?.bones, bones, true)
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
      name: "fat",
      label: "Fat Reading",
      type: "number",
      step: "0.1",
      unit: "%",
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
      name: "water",
      label: "Water Reading",
      type: "number",
      step: "0.1",
      unit: "%",
      required: true,
    },
    {
      name: "waist",
      label: "Waist Fat Reading",
      type: "number",
      step: "0.1",
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
      name: "physique",
      label: "Physique Rating",
      type: "number",
      step: "0.1",
      required: true,
    },
    {
      name: "bones",
      label: "Bones Mass",
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
