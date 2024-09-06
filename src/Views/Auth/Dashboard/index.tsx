import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";

import * as BeAPI from "../../../API";
import PageSection from "../../../Components/PageView/PageSection";
import { consumptionProps } from "../Diet/Consumption";
import { SchedulesMealElementProps } from "../Diet/Schedule/Elements";
import { SchedulesMealProps } from "../Diet/Schedule/Meals";
import { medicineProps } from "../Medicine";
import { walkExerciseProps } from "../Sports/WalkExercises";
import WeeklyCalendar from "./WeeklyCalendar";

const Dashboard = () => {
  const [consumptionData, setConsumptionData] = useState<consumptionProps[]>(
    []
  );
  const [walkExercisesData, setWalkExercisesData] = useState<
    walkExerciseProps[]
  >([]);
  const [medicineData, setMedicineData] = useState<medicineProps[]>([]);

  const [scheduled, setScheduled] = useState<SchedulesMealElementProps[]>([]);
  const [meals, setMeals] = useState<SchedulesMealProps[]>([]);

  const getData = () => {
    BeAPI.getAll("scheduleMealElements")
      .then((res: SchedulesMealElementProps[]) =>
        setScheduled(res?.sort((a, b) => (a.element > b.element ? 1 : -1)))
      )
      .catch((err) => console.log({ err }));

    BeAPI.getAll("scheduleMeals")
      .then((res: SchedulesMealProps[]) =>
        setMeals(
          res
            .sort((a: SchedulesMealProps, b: SchedulesMealProps) =>
              a.time < b.time ? -1 : 1
            )
            .sort((a: SchedulesMealProps, b: SchedulesMealProps) =>
              a.schedule < b.schedule ? 1 : -1
            )
        )
      )
      .catch((err) => console.log({ err }));

    BeAPI.getAll("consumed")
      .then((res: consumptionProps[]) =>
        setConsumptionData(
          res
            ?.sort((a: any, b: any) => (a.timestamp > b.timestamp ? -1 : 1))
            ?.map(({ contents, supposed, ...rest }) => ({
              ...rest,
              contents: contents?.sort((a, b) =>
                a.element > b.element ? 1 : -1
              ),
              supposed: supposed?.sort((a, b) =>
                a.element > b.element ? 1 : -1
              ),
            }))
        )
      )
      .catch((err) => console.log({ err }));

    BeAPI.getAll("sportSessions")
      .then((res: any) =>
        setWalkExercisesData(
          res?.sort((a: walkExerciseProps, b: walkExerciseProps) =>
            a.date > b.date ? -1 : 1
          )
        )
      )
      .catch((err) => console.log({ err }));

    BeAPI.getAll("medicine")
      .then((res: any) =>
        setMedicineData(
          res?.sort((a: medicineProps, b: medicineProps) =>
            a.date > b.date ? -1 : 1
          )
        )
      )
      .catch((err) => console.log({ err }));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <PageSection title="Dashboard">
      <Fragment>
        <WeeklyCalendar
          consumptionData={consumptionData.map((row) => {
            const mealId = meals.find(({ id }) => (id || "") === row.meal)?.id;

            return {
              ...row,
              supposed: scheduled.filter(({ meal }) => (meal || "") === mealId),
              meal: meals.find(({ id }) => row.meal === id) || {
                id: "string",
                schedule: 0,
                meal: "string",
                time: "string",
              },
            };
          })}
          walkExercisesData={walkExercisesData}
          medicineData={medicineData}
        />
      </Fragment>
    </PageSection>
  );
};

export default Dashboard;
