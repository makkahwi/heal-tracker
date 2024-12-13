import { useEffect } from "react";

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

interface props {
  data: SchedulesMealProps[];
  schedules: ScheduleProps[];
  getData: () => any;
}

const Meals = ({ data, schedules, getData }: props) => {
  const formInputs = [
    {
      name: "schedule",
      label: "Schedule",
      type: "select",
      options: schedules?.map(({ id, order }) => ({
        value: id || "",
        label: String(order),
      })),
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
    BeAPI.create("scheduleMeals", values)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));
  };

  const onDelete = (id: string) =>
    BeAPI.remove("scheduleMeals", id)
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
