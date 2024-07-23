import {
  faArrowCircleDown,
  faArrowCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import * as BeAPI from "../../API";
import Form from "../../Components/Form";
import PageSection from "../../Components/PageView/PageSection";
import { RootState } from "../../Store/store";
import WeightReadingCharts from "./Charts";
import WeightReadingsTable from "./Table";

export interface props {
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

interface calculationsProps {
  fatWeight: string;
  waterWeight: string;
  musclesPercentage: string;

  weightWeeklyChange: ReactNode;
  fatWeeklyChange: ReactNode;
  fatWeightWeeklyChange: ReactNode;
  waterWeeklyChange: ReactNode;
  waterWeightWeeklyChange: ReactNode;
  waistWeeklyChange: ReactNode;
  musclesWeeklyChange: ReactNode;
  musclesPercentageWeeklyChange: ReactNode;
  physiqueWeeklyChange: ReactNode;
  bonesWeeklyChange: ReactNode;

  weightSinceStartChange: ReactNode;
  fatSinceStartChange: ReactNode;
  fatWeightSinceStartChange: ReactNode;
  waterSinceStartChange: ReactNode;
  waterWeightSinceStartChange: ReactNode;
  waistSinceStartChange: ReactNode;
  musclesSinceStartChange: ReactNode;
  musclesPercentageSinceStartChange: ReactNode;
  physiqueSinceStartChange: ReactNode;
  bonesSinceStartChange: ReactNode;
}

type fullProps = props & calculationsProps;

const WeightReadings = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [data, setData] = useState<fullProps[]>([]);

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
    }

    const changeAmount = parseFloat((second - first).toFixed(2));
    const changePercentage = ((changeAmount / first) * 100).toFixed(2);

    return (
      <span className={"text-" + color}>
        {changeAmount} {unit}
        <br />
        {changePercentage}
        <br />
        <FontAwesomeIcon icon={icon} />
      </span>
    );
  };

  const getData = () =>
    BeAPI.getAll("WeightReadings", user.idToken)
      .then((res: props[]) => {
        const sortedRes = res?.sort((a: props, b: props) =>
          a.date < b.date ? 1 : -1
        );

        setData(
          sortedRes.map(
            (
              { id, date, weight, fat, water, waist, muscles, physique, bones },
              i
            ) => ({
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
              waterWeight: (Math.round(water * weight) / 100).toFixed(2),
              musclesPercentage: Math.round((muscles / weight) * 100).toFixed(
                2
              ),
              weightWeeklyChange:
                i < sortedRes.length - 1
                  ? changeCalculator(
                      sortedRes[i + 1]?.weight,
                      weight,
                      false,
                      " KG"
                    )
                  : "-",
              fatWeeklyChange:
                i < sortedRes.length - 1
                  ? changeCalculator(sortedRes[i + 1]?.fat, fat, false, "%")
                  : "-",
              fatWeightWeeklyChange:
                i < sortedRes.length - 1
                  ? changeCalculator(
                      parseFloat(
                        (
                          Math.round(
                            sortedRes[i + 1]?.fat * sortedRes[i + 1]?.weight
                          ) / 100
                        ).toFixed(2)
                      ),
                      parseFloat((Math.round(fat * weight) / 100).toFixed(2)),
                      false,
                      " KG"
                    )
                  : "-",
              waterWeeklyChange:
                i < sortedRes.length - 1
                  ? changeCalculator(sortedRes[i + 1]?.water, water, true, "%")
                  : "-",
              waterWeightWeeklyChange:
                i < sortedRes.length - 1
                  ? changeCalculator(
                      parseFloat(
                        (
                          Math.round(
                            sortedRes[i + 1]?.water * sortedRes[i + 1]?.weight
                          ) / 100
                        ).toFixed(2)
                      ),
                      parseFloat((Math.round(water * weight) / 100).toFixed(2)),
                      true,
                      " KG"
                    )
                  : "-",
              waistWeeklyChange:
                i < sortedRes.length - 1
                  ? changeCalculator(sortedRes[i + 1]?.waist, waist, false)
                  : "-",
              musclesWeeklyChange:
                i < sortedRes.length - 1
                  ? changeCalculator(
                      sortedRes[i + 1]?.muscles,
                      muscles,
                      true,
                      " KG"
                    )
                  : "-",
              musclesPercentageWeeklyChange:
                i < sortedRes.length - 1
                  ? changeCalculator(
                      parseFloat(
                        Math.round(
                          (sortedRes[i + 1]?.muscles /
                            sortedRes[i + 1]?.weight) *
                            100
                        ).toFixed(2)
                      ),
                      parseFloat(
                        Math.round((muscles / weight) * 100).toFixed(2)
                      ),
                      true,
                      "%"
                    )
                  : "-",
              physiqueWeeklyChange:
                i < sortedRes.length - 1
                  ? changeCalculator(sortedRes[i + 1]?.physique, physique, true)
                  : "-",
              bonesWeeklyChange:
                i < sortedRes.length - 1
                  ? changeCalculator(sortedRes[i + 1]?.bones, bones, true)
                  : "-",
              weightSinceStartChange:
                i < sortedRes.length - 2
                  ? changeCalculator(
                      sortedRes[sortedRes.length - 1]?.weight,
                      weight,
                      false,
                      " KG"
                    )
                  : "-",
              fatSinceStartChange:
                i < sortedRes.length - 2
                  ? changeCalculator(
                      sortedRes[sortedRes.length - 1]?.fat,
                      fat,
                      false,
                      "%"
                    )
                  : "-",
              fatWeightSinceStartChange:
                i < sortedRes.length - 2
                  ? changeCalculator(
                      parseFloat(
                        (
                          Math.round(
                            sortedRes[sortedRes.length - 1]?.fat *
                              sortedRes[sortedRes.length - 1]?.weight
                          ) / 100
                        ).toFixed(2)
                      ),
                      parseFloat((Math.round(fat * weight) / 100).toFixed(2)),
                      false,
                      " KG"
                    )
                  : "-",
              waterSinceStartChange:
                i < sortedRes.length - 2
                  ? changeCalculator(
                      sortedRes[sortedRes.length - 1]?.water,
                      water,
                      true,
                      "%"
                    )
                  : "-",
              waterWeightSinceStartChange:
                i < sortedRes.length - 2
                  ? changeCalculator(
                      parseFloat(
                        (
                          Math.round(
                            sortedRes[sortedRes.length - 1]?.water *
                              sortedRes[sortedRes.length - 1]?.weight
                          ) / 100
                        ).toFixed(2)
                      ),
                      parseFloat((Math.round(water * weight) / 100).toFixed(2)),
                      true,
                      " KG"
                    )
                  : "-",
              waistSinceStartChange:
                i < sortedRes.length - 2
                  ? changeCalculator(
                      sortedRes[sortedRes.length - 1]?.waist,
                      waist,
                      false
                    )
                  : "-",
              musclesSinceStartChange:
                i < sortedRes.length - 2
                  ? changeCalculator(
                      sortedRes[sortedRes.length - 1]?.muscles,
                      muscles,
                      true,
                      " KG"
                    )
                  : "-",
              musclesPercentageSinceStartChange:
                i < sortedRes.length - 2
                  ? changeCalculator(
                      parseFloat(
                        Math.round(
                          (sortedRes[sortedRes.length - 1]?.muscles /
                            sortedRes[sortedRes.length - 1]?.weight) *
                            100
                        ).toFixed(2)
                      ),
                      parseFloat(
                        Math.round((muscles / weight) * 100).toFixed(2)
                      ),
                      true,
                      "%"
                    )
                  : "-",
              physiqueSinceStartChange:
                i < sortedRes.length - 2
                  ? changeCalculator(
                      sortedRes[sortedRes.length - 1]?.physique,
                      physique,
                      true
                    )
                  : "-",
              bonesSinceStartChange:
                i < sortedRes.length - 2
                  ? changeCalculator(
                      sortedRes[sortedRes.length - 1]?.bones,
                      bones,
                      true
                    )
                  : "-",
            })
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
      required: true,
    },
    {
      name: "weight",
      label: "Weight",
      type: "number",
      step: "0.1",
      required: true,
    },
    {
      name: "water",
      label: "Water Reading",
      type: "number",
      step: "0.1",
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

  const onSubmit = (values: props) => {
    BeAPI.create("WeightReadings", values, user.idToken, user.localId)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));
  };

  const onDelete = (id: string) =>
    BeAPI.remove("WeightReadings", id, user.idToken)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));

  return (
    <PageSection title="Weight Readings List">
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
