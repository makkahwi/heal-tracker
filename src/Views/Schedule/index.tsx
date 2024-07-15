import moment from "moment";
import { useEffect, useState } from "react";

import * as mealsAPI from "../../API/meals";
import * as scheduleAPI from "../../API/schedule";
import MealView, { MealViewProps } from "../../Components/MealView";
import PageView from "../../Components/PageView";
import { MealProps } from "../Meals";

const Schedule = () => {
  const [data, setData] = useState<MealViewProps[]>([]);
  const [meals, setMeals] = useState<MealProps[]>([]);

  const getData = () => {
    mealsAPI.getAll().then((meals: MealProps[]) => {
      setMeals(meals);

      scheduleAPI
        .getAll()
        .then((res: MealViewProps[]) =>
          setData(res.sort((a: any, b: any) => (a.meal < b.meal ? -1 : 1)))
        );
    });
  };

  useEffect(() => {
    // scheduleAPI.getAll().then((res: MealViewProps[][]) => setData(res));
    getData();
  }, []);

  const formInputs = [
    {
      name: "meal",
      label: "Meal of Day",
      type: "select",
      options: meals.map(({ meal }) => meal),
      render: (row: MealViewProps, i: number) =>
        i > 0 && row.meal === data[i - 1].meal
          ? "^^^^^"
          : row.meal +
            " @ " +
            moment(
              "2022-01-01T" + meals.find(({ meal }) => meal === row.meal)?.time
            ).format("h:mm a"),
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
        { name: "count", label: "Count", required: true },
        // {
        //   name: "alternatives",
        //   label: "Alternatives",
        //   type: "dynamicList",
        //   inputs: [
        //     { name: "element", label: "Element", required: true },
        //     { name: "count", label: "Count", required: true },
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
      scheduleAPI.create(value).then(() => {
        getData();
      })
    );
  };

  const onDelete = (id: string) =>
    scheduleAPI.remove(id).then(() => {
      getData();
    });

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
