import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";

import * as BeAPI from "../../../API";
import PageSection from "../../../Components/PageView/PageSection";
import { consumptionFullProps, consumptionProps } from "../Diet/Consumption";
import { SchedulesMealProps } from "../Diet/Schedule/Meals";
import { medicineProps } from "../Medicine";
import { walkExerciseProps } from "../Sports/WalkExercises";
import WeeklyCalendar from "./WeeklyCalendar";

const Dashboard = () => {
  const [consumptionData, setConsumptionData] = useState<
    consumptionFullProps[]
  >([]);
  const [meals, setMeals] = useState<SchedulesMealProps[]>([]);
  const [walkExercisesData, setWalkExercisesData] = useState<
    walkExerciseProps[]
  >([]);
  const [medicineData, setMedicineData] = useState<medicineProps[]>([]);

  const getData = () => {
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

    BeAPI.getAll("consumption")
      .then((res: consumptionProps[]) =>
        setConsumptionData(
          res
            ?.sort((a: any, b: any) => (a.timestamp > b.timestamp ? -1 : 1))
            ?.map(({ contents, supposed, ...rest }) => ({
              ...rest,
              contents: contents?.sort((a, b) =>
                a.element > b.element ? 1 : -1
              ),
              meal: meals.find(({ id }) => id === rest.meal) || {
                id: "string",
                schedule: 0,
                meal: "string",
                time: "string",
              },
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
          consumptionData={consumptionData}
          walkExercisesData={walkExercisesData}
          medicineData={medicineData}
        />
      </Fragment>
    </PageSection>
  );
};

export default Dashboard;
