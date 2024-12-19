import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const formInputs = [
    {
      name: "schedule",
      label: t("Services.Diet.Schedule.Schedule"),
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
      label: t("Services.Diet.Schedule.MealName"),
      type: "text",
      required: true,
    },
    {
      name: "time",
      label: t("Services.Diet.Schedule.TimeOfMeal"),
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
      title={t("Services.Diet.Schedule.MealsList")}
      data={data}
      inputs={formInputs}
      onSubmit={onSubmit}
      onDelete={onDelete}
    />
  );
};

export default Meals;
