import moment from "moment";
import { useEffect, useState } from "react";

import * as medicineAPI from "../../API/medicine";
import { MealViewProps } from "../../Components/MealView";
import PageView from "../../Components/PageView";

export interface props {
  id?: string;
  date: string;
  time: string;
  quantity: number;
  medicine: string;
}

const Medicine = () => {
  const [data, setData] = useState<props[]>([]);

  const getData = () =>
    medicineAPI
      .getAll()
      .then((res: any) =>
        setData(res.sort((a: props, b: props) => (a.date > b.date ? -1 : 1)))
      );

  useEffect(() => {
    // scheduleAPI.getAll().then((res: MealViewProps[][]) => setData(res));
    getData();
  }, []);

  const formInputs = [
    {
      name: "date",
      label: "Date",
      type: "date",
      defaultValue: moment().format("yyyy-MM-DD"),
      required: true,
    },
    {
      name: "time",
      label: "Time",
      type: "time",
      defaultValue: moment().format("HH:mm"),
      required: true,
    },
    {
      name: "quantity",
      label: "Quantity",
      type: "number",
      defaultValue: 2,
      required: true,
    },
    {
      name: "medicine",
      label: "Medicine",
      type: "select",
      options: ["Vitamine D"],
      defaultValue: "Vitamine D",
      required: true,
    },
  ];

  interface submitProps {
    date: string;
    contents: MealViewProps[];
  }

  const onSubmit = (values: submitProps) => {
    medicineAPI.create(values).then(() => {
      getData();
    });
  };

  const onDelete = (id: string) =>
    medicineAPI.remove(id).then(() => {
      getData();
    });

  return (
    <PageView
      title="Medicine List"
      data={data}
      inputs={formInputs}
      onSubmit={onSubmit}
      onDelete={onDelete}
    />
  );
};

export default Medicine;
