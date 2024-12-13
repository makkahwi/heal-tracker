import {
  faArrowCircleDown,
  faArrowCircleUp,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Fragment, useEffect, useState } from "react";

import * as BeAPI from "../../../API";
import Form from "../../../Components/Form";
import TabsView from "../../../Components/Layout/TabsView";
import PageSection from "../../../Components/PageView/PageSection";
import WeightReadingCharts from "./Charts";
import WeightReadingsTable from "./Table";

interface weightReadingTargetProps {
  id?: string;
  weightMin: number;
  weightMax: number;
  fatMin: number;
  fatMax: number;
  waterMin: number;
  waterMax: number;
  waistMin: number;
  waistMax: number;
  musclesMin: number;
  musclesMax: number;
}

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
  musclesPercentage: number;

  weightWeeklyChange: changeCalculationProps;
  fatWeeklyChange: changeCalculationProps;
  waterWeeklyChange: changeCalculationProps;
  waistWeeklyChange: changeCalculationProps;
  musclesWeeklyChange: changeCalculationProps;
  musclesPercentageWeeklyChange: changeCalculationProps;

  weightSinceWorstChange: changeCalculationProps;
  fatSinceWorstChange: changeCalculationProps;
  waterSinceWorstChange: changeCalculationProps;
  waistSinceWorstChange: changeCalculationProps;
  musclesSinceWorstChange: changeCalculationProps;
  musclesPercentageSinceWorstChange: changeCalculationProps;

  weightSinceBestChange: changeCalculationProps;
  fatSinceBestChange: changeCalculationProps;
  waterSinceBestChange: changeCalculationProps;
  waistSinceBestChange: changeCalculationProps;
  musclesSinceBestChange: changeCalculationProps;
  musclesPercentageSinceBestChange: changeCalculationProps;

  weightSinceStartChange: changeCalculationProps;
  fatSinceStartChange: changeCalculationProps;
  waterSinceStartChange: changeCalculationProps;
  waistSinceStartChange: changeCalculationProps;
  musclesSinceStartChange: changeCalculationProps;
  musclesPercentageSinceStartChange: changeCalculationProps;
}

export type fullWeightReadingProps = weightReadingProps &
  calculationsProps &
  weightReadingTargetProps;

const WeightReadings = () => {
  const [data, setData] = useState<fullWeightReadingProps[]>([]);
  const [targetsData, setTargetsData] = useState<weightReadingTargetProps>({
    weightMin: 0,
    fatMin: 0,
    waterMin: 0,
    waistMin: 0,
    musclesMin: 0,
    weightMax: 0,
    fatMax: 0,
    waterMax: 0,
    waistMax: 0,
    musclesMax: 0,
  });

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

  const getData = () => {
    BeAPI.get("WeightReadingTargets")
      .then((resp: any) => {
        setTargetsData(resp.value);

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

                  const worstWeight = Math.max.apply(
                    Math,
                    sortedRes
                      .filter((_, y) => y > i)
                      .map(({ weight }) => weight)
                  );
                  const bestWeight = Math.min.apply(
                    Math,
                    sortedRes
                      .filter((_, y) => y > i)
                      .map(({ weight }) => weight)
                  );
                  const worstFat = Math.max.apply(
                    Math,
                    sortedRes.filter((_, y) => y > i).map(({ fat }) => fat)
                  );
                  const bestFat = Math.min.apply(
                    Math,
                    sortedRes.filter((_, y) => y > i).map(({ fat }) => fat)
                  );
                  const worstWater = Math.min.apply(
                    Math,
                    sortedRes.filter((_, y) => y > i).map(({ water }) => water)
                  );
                  const bestWater = Math.max.apply(
                    Math,
                    sortedRes.filter((_, y) => y > i).map(({ water }) => water)
                  );
                  const worstWaist = Math.max.apply(
                    Math,
                    sortedRes.filter((_, y) => y > i).map(({ waist }) => waist)
                  );
                  const bestWaist = Math.min.apply(
                    Math,
                    sortedRes.filter((_, y) => y > i).map(({ waist }) => waist)
                  );
                  const worstMuscles = Math.min.apply(
                    Math,
                    sortedRes
                      .filter((_, y) => y > i)
                      .map(({ muscles }) => muscles)
                  );
                  const bestMuscles = Math.max.apply(
                    Math,
                    sortedRes
                      .filter((_, y) => y > i)
                      .map(({ muscles }) => muscles)
                  );
                  const worstMusclesPercentage = Math.min.apply(
                    Math,
                    sortedRes
                      .filter((_, y) => y > i)
                      .map(({ muscles, weight }) =>
                        parseFloat(((muscles / weight) * 100).toFixed(2))
                      )
                  );
                  const bestMusclesPercentage = Math.max.apply(
                    Math,
                    sortedRes
                      .filter((_, y) => y > i)
                      .map(({ muscles, weight }) =>
                        parseFloat(((muscles / weight) * 100).toFixed(2))
                      )
                  );

                  const musclesPercentage = parseFloat(
                    ((muscles / weight) * 100).toFixed(2)
                  );

                  return {
                    id,
                    date,
                    weight,
                    fat,
                    water,
                    waist,
                    muscles,
                    musclesPercentage,
                    ...resp.value,
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
                        ? changeCalculator(
                            previousRecord?.fat,
                            fat,
                            false,
                            "KG"
                          )
                        : emptyCalculations,
                    waterWeeklyChange:
                      i < sortedRes.length - 1
                        ? changeCalculator(
                            previousRecord?.water,
                            water,
                            true,
                            "L"
                          )
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
                              (
                                (previousRecord?.muscles /
                                  previousRecord?.weight) *
                                100
                              ).toFixed(2)
                            ),
                            parseFloat(((muscles / weight) * 100).toFixed(2)),
                            true,
                            " %"
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
                    musclesPercentageSinceWorstChange:
                      i < sortedRes.length - 1
                        ? changeCalculator(
                            worstMusclesPercentage,
                            musclesPercentage,
                            true,
                            " %"
                          )
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
                    musclesPercentageSinceBestChange:
                      i < sortedRes.length - 1
                        ? changeCalculator(
                            bestMusclesPercentage,
                            musclesPercentage,
                            true,
                            " %"
                          )
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
                    musclesPercentageSinceStartChange:
                      i < sortedRes.length - 2
                        ? changeCalculator(
                            (firstRecord?.muscles / firstRecord?.weight) * 100,
                            musclesPercentage,
                            true,
                            " %"
                          )
                        : emptyCalculations,
                  };
                }
              )
            );
          })
          .catch((err) => console.log({ err }));
      })
      .catch((err) => console.log({ err }));
  };

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

  const targetsFormInputs = [
    {
      name: "waterMin",
      label: "Water Min Target",
      type: "number",
      step: "0.1",
      unit: "L",
      defaultValue: targetsData?.waterMin,
      required: true,
    },
    {
      name: "waterMax",
      label: "Water Max Target",
      type: "number",
      step: "0.1",
      unit: "L",
      defaultValue: targetsData?.waterMax,
      required: true,
    },
    {
      name: "fatMin",
      label: "Fat Weight Min Target",
      type: "number",
      step: "0.1",
      unit: "KG",
      defaultValue: targetsData?.fatMin,
      required: true,
    },
    {
      name: "fatMax",
      label: "Fat Weight Max Target",
      type: "number",
      step: "0.1",
      unit: "KG",
      defaultValue: targetsData?.fatMax,
      required: true,
    },
    {
      name: "weightMin",
      label: "Weight Min Target",
      type: "number",
      step: "0.1",
      unit: "KG",
      defaultValue: targetsData?.weightMin,
      required: true,
    },
    {
      name: "weightMax",
      label: "Weight Max Target",
      type: "number",
      step: "0.1",
      unit: "KG",
      defaultValue: targetsData?.weightMax,
      required: true,
    },
    {
      name: "musclesMin",
      label: "Muscles Min Target",
      type: "number",
      step: "0.1",
      unit: "KG",
      defaultValue: targetsData?.musclesMin,
      required: true,
    },
    {
      name: "musclesMax",
      label: "Muscles Max Target",
      type: "number",
      step: "0.1",
      unit: "KG",
      defaultValue: targetsData?.musclesMax,
      required: true,
    },
    {
      name: "waistMin",
      label: "Waist Fat Min Target",
      type: "number",
      step: "0.1",
      defaultValue: targetsData?.waistMin,
      required: true,
    },
    {
      name: "waistMax",
      label: "Waist Fat Max Target",
      type: "number",
      step: "0.1",
      defaultValue: targetsData?.waistMax,
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

  const onTargetsSubmit = (values: weightReadingTargetProps) => {
    BeAPI.update({
      table: "WeightReadingTargets",
      id: "x",
      data: values,
    }).catch((err) => console.log({ err }));
  };

  const onDelete = (id: string) =>
    BeAPI.remove("WeightReadings", id)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));

  const views = [
    // { title: "Analysis", view: <WeightReadingCharts data={data} /> },
    { title: "Input", view: <Form inputs={formInputs} onSubmit={onSubmit} /> },
    {
      title: "Targets",
      view: <Form inputs={targetsFormInputs} onSubmit={onTargetsSubmit} />,
    },
  ];

  return (
    <PageSection title="Weight Readings">
      <Fragment>
        <h4 className="my-3">
          Total Number of Weight Readings (Visits): {data.length}
        </h4>

        <TabsView views={views} />

        <WeightReadingsTable data={data} onDelete={onDelete} />
      </Fragment>
    </PageSection>
  );
};

export default WeightReadings;
