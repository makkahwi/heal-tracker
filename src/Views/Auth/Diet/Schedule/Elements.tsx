import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as BeAPI from "../../../../API";
import MealView from "../../../../Components/MealView";
import PageView from "../../../../Components/PageView";
import { units } from "../../../../util/lists";
import { SchedulesMealProps } from "./Meals";
import { ScheduleProps } from "./Schedules";

export interface SchedulesMealElementProps {
  id?: string;
  meal?: string;
  element: string;
  count: number;
  unit: string;
  note?: string;
  alternatives?: SchedulesMealElementProps[];
}

interface props {
  meals: SchedulesMealProps[];
  schedules: ScheduleProps[];
}

const Elements = ({ meals, schedules }: props) => {
  const { t } = useTranslation();

  const [data, setData] = useState<SchedulesMealElementProps[]>([]);

  const getData = () => {
    BeAPI.getAll("scheduleMealElements")
      .then((res: SchedulesMealElementProps[]) =>
        setData(
          res
            .sort(
              (a: SchedulesMealElementProps, b: SchedulesMealElementProps) => {
                if (a?.meal && b?.meal) {
                  return a?.meal < b?.meal ? 1 : -1;
                }
                return 1;
              }
            )
            .sort(
              (a: SchedulesMealElementProps, b: SchedulesMealElementProps) => {
                const firstMealTime = meals.find(
                  (meal) => meal.meal === a.meal
                )?.time;
                const secondMealTime = meals.find(
                  (meal) => meal.meal === b.meal
                )?.time;

                if (firstMealTime && secondMealTime) {
                  return firstMealTime < secondMealTime ? 1 : -1;
                }

                return 1;
              }
            )
        )
      )
      .catch((err) => console.log({ err }));
  };

  useEffect(() => {
    // BeAPI.getAll().then((res: SchedulesMealElementProps[][]) => setData(res));
    getData();
  }, []);

  const formInputs = [
    {
      name: "meal",
      label: t("Services.Diet.Schedule.MealOfDay"),
      type: "select",
      options: meals?.map(({ id, meal, schedule }) => ({
        value: id || "",
        label:
          meal +
          " of Schedule " +
          schedules.find(({ id }) => id === String(schedule))?.order,
      })),
      render: (row: SchedulesMealElementProps, i: number) => {
        const meal = meals.find(({ id }) => id === String(row.meal));
        const schedule = schedules.find(
          ({ id }) => id === String(meal?.schedule)
        );

        return i > 0 && row.meal === data[i - 1].meal
          ? "^^^^^"
          : meal?.meal + " of Schedule " + schedule?.order;
      },
      required: true,
    },
    {
      name: "element",
      label: t("Services.Diet.Schedule.Element"),
      required: true,
    },
    {
      name: "count",
      label: t("Services.Diet.Schedule.Quantity"),
      type: "number",
      step: 0.1,
      required: true,
    },
    {
      name: "unit",
      label: t("Services.Diet.Schedule.Unit"),
      required: true,
      type: "select",
      options: units,
    },
    {
      name: "alternatives",
      label: t("Services.Diet.Schedule.Alternatives"),
      type: "dynamicList",
      fullWidth: true,
      render: (row: SchedulesMealElementProps) => <MealView {...row} />,
      inputs: [
        {
          name: "element",
          label: t("Services.Diet.Schedule.Element"),
          required: true,
        },
        {
          name: "count",
          label: t("Services.Diet.Schedule.Quantity"),
          type: "number",
          step: 0.1,
          required: true,
        },
        {
          name: "unit",
          label: t("Services.Diet.Schedule.Unit"),
          required: true,
          type: "select",
          options: units,
        },
      ],
      required: true,
    },
  ];

  const onSubmit = (values: SchedulesMealElementProps) => {
    BeAPI.create("scheduleMealElements", {
      ...values,
      count: parseFloat(String(values.count)),
      alternatives: values?.alternatives?.map(({ count, ...rest }) => ({
        ...rest,
        count: parseFloat(String(count)),
      })),
    }).then(() => {
      getData();
    });
  };

  const onDelete = (id: string) =>
    BeAPI.remove("scheduleMealElements", id)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));

  return (
    <PageView
      title={t("Services.Diet.Schedule.MealElementsList")}
      data={data}
      inputs={formInputs}
      onSubmit={onSubmit}
      onDelete={onDelete}
    />
  );
};

export default Elements;
