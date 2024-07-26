import { Fragment } from "react/jsx-runtime";

import { useEffect, useState } from "react";
import * as BeAPI from "../../../API";
import PageSection from "../../../Components/PageView/PageSection";
import { consumptionProps } from "../Diet/Consumption";
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

  const getData = () => {
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
