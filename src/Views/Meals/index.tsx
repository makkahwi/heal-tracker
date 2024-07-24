import { useEffect, useState } from "react";

import * as BeAPI from "../../API";
import { MealViewProps } from "../../Components/MealView";
import PageView from "../../Components/PageView";
import { timeFormat } from "../../Utils/consts";

export interface MealProps {
  id?: string;
  meal: string;
  time: string;
}

const Meals = () => {
  const [data, setData] = useState<MealProps[]>([]);

  const getData = () =>
    BeAPI.getAll("meals")
      .then((res: any) => setData(res))
      .catch((err) => console.log({ err }));

  useEffect(() => {
    // scheduleAPI.getAll().then((res: MealViewProps[][]) => setData(res));
    getData();
  }, []);

  const formInputs = [
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

  interface submitProps {
    meal: string;
    contents: MealViewProps[];
  }

  const onSubmit = (values: submitProps) => {
    BeAPI.create("meals", values)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));
  };

  const onDelete = (id: string) =>
    BeAPI.remove("meals", id)
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
