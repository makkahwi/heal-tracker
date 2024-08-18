import { useEffect, useState } from "react";

import * as BeAPI from "../../../../API";
import PageView from "../../../../Components/PageView";
import { timeFormat } from "../../../../Utils/consts";
import { ScheduleProps } from "./Schedules";

export interface SchedulesMealProps {
  id?: string;
  schedule: number;
  meal: string;
  time: string;
}

const Meals = () => {
  const [data, setData] = useState<SchedulesMealProps[]>([]);
  const [schedules, setSchedules] = useState<ScheduleProps[]>([]);

  const getData = () => {
    BeAPI.getAll("schedulesMeals")
      .then((res: SchedulesMealProps[]) =>
        setData(
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

    BeAPI.getAll("schedules")
      .then((res: ScheduleProps[]) =>
        setSchedules(
          res.sort((a: ScheduleProps, b: ScheduleProps) =>
            a.order < b.order ? 1 : -1
          )
        )
      )
      .catch((err) => console.log({ err }));
  };

  useEffect(() => {
    getData();
  }, []);

  const formInputs = [
    {
      name: "schedule",
      label: "Schedule",
      type: "select",
      options: schedules?.map(
        ({ id, order }) => String(order) || id || "undefined"
      ),
      defaultValue: schedules?.reduce(
        (final, { order }) => (order > final ? order : final),
        0
      ),
      required: true,
    },
    {
      name: "meal",
      label: "Meal Name",
      type: "text",
      required: true,
    },
    {
      name: "time",
      label: "Time of Meal",
      type: "time",
      render: (row: any) => timeFormat(row.time),
      required: true,
    },
  ];

  const onSubmit = (values: SchedulesMealProps) => {
    BeAPI.create("schedulesMeals", values)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));
  };

  const onDelete = (id: string) =>
    BeAPI.remove("schedulesMeals", id)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));

  return (
    <PageView
      title="Meals List"
      data={data}
      inputs={formInputs}
      onSubmit={onSubmit}
      onDelete={onDelete}
    />
  );
};

export default Meals;
