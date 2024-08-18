import * as BeAPI from "../../../../API";
import MealView, { MealViewProps } from "../../../../Components/MealView";
import PageView from "../../../../Components/PageView";
import { SchedulesMealProps } from "./Meals";
import { ScheduleProps } from "./Schedules";
import { useEffect, useState } from "react";

const Elements = () => {
  const [data, setData] = useState<MealViewProps[]>([]);
  const [meals, setMeals] = useState<SchedulesMealProps[]>([]);
  const [schedules, setSchedules] = useState<ScheduleProps[]>([]);

  const getData = () => {
    BeAPI.getAll("scheduleMeals")
      .then((meals: SchedulesMealProps[]) => {
        setMeals(
          meals
            .sort((a: SchedulesMealProps, b: SchedulesMealProps) =>
              a.time < b.time ? -1 : 1
            )
            .sort((a: SchedulesMealProps, b: SchedulesMealProps) =>
              a.schedule < b.schedule ? 1 : -1
            )
        );

        BeAPI.getAll("scheduleMealElements")
          .then((res: MealViewProps[]) =>
            setData(
              res
                .sort((a: MealViewProps, b: MealViewProps) => {
                  if (a?.meal && b?.meal) {
                    return a?.meal < b?.meal ? -1 : 1;
                  }
                  return 1;
                })
                .sort((a: MealViewProps, b: MealViewProps) => {
                  const firstMealTime = meals.find(
                    (meal) => meal.meal === a.meal
                  )?.time;
                  const secondMealTime = meals.find(
                    (meal) => meal.meal === b.meal
                  )?.time;

                  if (firstMealTime && secondMealTime) {
                    return firstMealTime < secondMealTime ? -1 : 1;
                  }

                  return 1;
                })
            )
          )
          .catch((err) => console.log({ err }));
      })
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
    // BeAPI.getAll().then((res: MealViewProps[][]) => setData(res));
    getData();
  }, []);

  const formInputs = [
    {
      name: "meal",
      label: "Meal of Day",
      type: "select",
      options: meals?.map(({ id, meal, schedule }) => ({
        value: id || "",
        label:
          meal +
          " of Schedule " +
          schedules.find(({ id }) => id === String(schedule))?.order,
      })),
      render: (row: MealViewProps, i: number) => {
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
      name: "contents",
      label: "Meal Contents",
      type: "dynamicList",
      fullWidth: true,
      render: (row: MealViewProps) => <MealView {...row} />,
      inputs: [
        { name: "element", label: "Element", required: true },
        { name: "count", label: "Quantity", required: true },
        // {
        //   name: "alternatives",
        //   label: "Alternatives",
        //   type: "dynamicList",
        //   inputs: [
        //     { name: "element", label: "Element", required: true },
        //     { name: "count", label: "Quantity", required: true },
        //   ],
        //   required: false,
        // },
      ],
      required: true,
    },
  ];

  interface submitProps {
    meal: string;
    contents: MealViewProps[];
  }

  const onSubmit = (values: submitProps) => {
    const finalValue = values?.contents?.map((content) => ({
      ...content,
      meal: values?.meal,
    }));

    finalValue.forEach((value) =>
      BeAPI.create("scheduleMealElements", value).then(() => {
        getData();
      })
    );
  };

  const onDelete = (id: string) =>
    BeAPI.remove("scheduleMealElements", id)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));

  return (
    <PageView
      title="Meal Elements List"
      data={data}
      inputs={formInputs}
      onSubmit={onSubmit}
      onDelete={onDelete}
    />
  );
};

export default Elements;
