import moment from "moment";
import { useEffect, useState } from "react";

import * as mealsAPI from "../../API/meals";
import { MealViewProps } from "../../Components/MealView";
import PageView from "../../Components/PageView";

export interface MealProps {
  id?: string;
  meal: string;
  time: string;
}

const Meals = () => {
  const [data, setData] = useState<MealProps[]>([]);

  const getData = () => mealsAPI.getAll().then((res: any) => setData(res));

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
      render: (row: any) => moment("2024-07-01T" + row.time).format("h:mm a"),
      required: true,
    },
  ];

  interface submitProps {
    meal: string;
    contents: MealViewProps[];
  }

  const onSubmit = (values: submitProps) => {
    mealsAPI.create(values).then(() => {
      getData();
    });
  };

  const onDelete = (id: string) =>
    mealsAPI.remove(id).then(() => {
      getData();
    });

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
