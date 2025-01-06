import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import * as BeAPI from "../../../API";
import PageSection from "../../../Components/PageView/PageSection";
import { RootState } from "../../../Store/store";
import { consumptionProps } from "../Diet/Consumption";
import { fastingProps } from "../Diet/Fasting";
import { SchedulesMealElementProps } from "../Diet/Schedule/Elements";
import { SchedulesMealProps } from "../Diet/Schedule/Meals";
import { wateringProps } from "../Diet/Watering";
import { medicineProps } from "../Medicine/Consumption";
import { medicineScheduleProps } from "../Medicine/Schedule";
import { reliefProps } from "../Relief";
import { sleepCycleProps } from "../SleepCycles";
import { walkExerciseProps } from "../Sports";
import WeeklyCalendar from "./WeeklyCalendar";

const WeeklySummary = () => {
  const { t } = useTranslation();

  const activation = useSelector(
    (state: RootState) => state.settings.activation
  );

  const [consumptionData, setConsumptionData] = useState<consumptionProps[]>(
    []
  );
  const [walkExercisesData, setWalkExercisesData] = useState<
    walkExerciseProps[]
  >([]);
  const [medicineData, setMedicineData] = useState<medicineProps[]>([]);

  const [scheduled, setScheduled] = useState<SchedulesMealElementProps[]>([]);
  const [sleepCyclesData, setSleepCyclesData] = useState<sleepCycleProps[]>([]);
  const [meals, setMeals] = useState<SchedulesMealProps[]>([]);
  const [watering, setWatering] = useState<wateringProps[]>([]);
  const [reliefLogs, setReliefLogs] = useState<reliefProps[]>([]);
  const [fasting, setFasting] = useState<fastingProps[]>([]);

  const getData = () => {
    if (activation.diet_consumption && activation.diet_schedule) {
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
    }

    if (activation.diet_consumption) {
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
    }

    if (activation.watering) {
      BeAPI.getAll("watering")
        .then((res: wateringProps[]) =>
          setWatering(
            res?.sort((a: wateringProps, b: wateringProps) =>
              a.timestamp > b.timestamp ? -1 : 1
            )
          )
        )
        .catch((err) => console.log({ err }));
    }

    if (activation.sport) {
      BeAPI.getAll("sportSessions")
        .then((res: any) =>
          setWalkExercisesData(
            res?.sort((a: walkExerciseProps, b: walkExerciseProps) =>
              a.date > b.date ? -1 : 1
            )
          )
        )
        .catch((err) => console.log({ err }));
    }

    if (activation.sleep) {
      BeAPI.getAll("sleepCycles")
        .then((res: any) =>
          setSleepCyclesData(
            res?.sort((a: sleepCycleProps, b: sleepCycleProps) =>
              a.startTime > b.startTime ? -1 : 1
            )
          )
        )
        .catch((err) => console.log({ err }));
    }

    if (activation.medicine_consumption) {
      BeAPI.getAll("medicine-schedule")
        .then((res: medicineScheduleProps[]) => {
          BeAPI.getAll("medicine")
            .then((resp: medicineProps[]) =>
              setMedicineData(
                resp
                  ?.sort((a: medicineProps, b: medicineProps) =>
                    a.date > b.date ? -1 : 1
                  )
                  .map(({ medicine, ...rest }) => {
                    const med = res.find(({ id }) => id === medicine);

                    return {
                      ...rest,
                      medicine: med?.medicine + " (" + med?.specs + ")" || "",
                    };
                  })
              )
            )
            .catch((err) => console.log({ err }));
        })
        .catch((err) => console.log({ err }));
    }

    if (activation.relief) {
      BeAPI.getAll("relief")
        .then((res: any) =>
          setReliefLogs(
            res?.sort((a: reliefProps, b: reliefProps) =>
              a.time > b.time ? -1 : 1
            )
          )
        )
        .catch((err) => console.log({ err }));
    }

    if (activation.fasting) {
      BeAPI.getAll("fasting")
        .then((res: any) =>
          setFasting(
            res?.sort((a: fastingProps, b: fastingProps) =>
              a.date > b.date ? -1 : 1
            )
          )
        )
        .catch((err) => console.log({ err }));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <PageSection
      title={t("WeeklySummary.Title")}
      desc={t("WeeklySummary.Desc")}
    >
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
        watering={watering}
        walkExercisesData={walkExercisesData}
        medicineData={medicineData}
        sleepCyclesData={sleepCyclesData}
        reliefLogs={reliefLogs}
        fasting={fasting}
      />
    </PageSection>
  );
};

export default WeeklySummary;
