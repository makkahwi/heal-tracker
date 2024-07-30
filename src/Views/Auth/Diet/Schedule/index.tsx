import { useEffect, useState } from "react";

import * as BeAPI from "../../../../API";
import MealView, { MealViewProps } from "../../../../Components/MealView";
import PageView from "../../../../Components/PageView";
import { timeFormat } from "../../../../Utils/consts";
import { MealProps } from "../Meals";

const Schedule = () => {
  const [data, setData] = useState<MealViewProps[]>([]);
  const [meals, setMeals] = useState<MealProps[]>([]);

  const getData = () => {
    BeAPI.getAll("meals")
      .then((meals: MealProps[]) => {
        setMeals(
          meals.sort((a: MealProps, b: MealProps) => (a.time < b.time ? -1 : 1))
        );

        BeAPI.getAll("schedule")
          .then((res: MealViewProps[]) =>
            setData(
              res.sort((a: MealViewProps, b: MealViewProps) => {
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
      options: meals?.map(({ meal }) => meal),
      render: (row: MealViewProps, i: number) =>
        i > 0 && row.meal === data[i - 1].meal
          ? "^^^^^"
          : row.meal +
            " @ " +
            timeFormat(meals.find(({ meal }) => meal === row.meal)?.time),
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
      BeAPI.create("schedule", value).then(() => {
        getData();
      })
    );
  };

  const onDelete = (id: string) =>
    BeAPI.remove("schedule", id)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));

  return (
    <PageView
      title="Scheduled Meals List"
      data={data}
      inputs={formInputs}
      onSubmit={onSubmit}
      onDelete={onDelete}
    />
  );
};

export default Schedule;
