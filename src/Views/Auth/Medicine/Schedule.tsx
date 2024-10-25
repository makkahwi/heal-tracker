import { useEffect, useState } from "react";

import * as BeAPI from "../../../API";
import PageView from "../../../Components/PageView";

export interface medicineScheduleProps {
  id?: string;
  medicine: string;
  perDayQuantity: number;
  totalQuantity: number;
}

const MedicineSchedule = () => {
  const [data, setData] = useState<medicineScheduleProps[]>([]);

  const getData = () =>
    BeAPI.getAll("medicine-schedule")
      .then((res: medicineScheduleProps[]) => setData(res))
      .catch((err) => console.log({ err }));

  useEffect(() => {
    // scheduleAPI.getAll().then((res: MealViewProps[][]) => setData(res));
    getData();
  }, []);

  const formInputs = [
    {
      name: "medicine",
      label: "Medicine",
      type: "text",
      required: true,
    },
    {
      name: "frequency",
      label: "Consumption Frequency",
      type: "select",
      options: [
        { value: "Daily" },
        { value: "Bi-Daily" },
        { value: "Weekly" },
        { value: "Bi-Weekly" },
        { value: "Monthly" },
      ],
      required: true,
    },
    {
      name: "duration",
      label: "Duration (Frequency Total Occurrences)",
      type: "number",
      required: true,
    },
    {
      name: "frequencyQuantity",
      label: "Per Frequency Occurrence Quantity",
      type: "number",
      required: true,
    },
  ];

  const onSubmit = (values: medicineScheduleProps) => {
    BeAPI.create("medicine-schedule", {
      ...values,
      totalQuantity: parseInt(String(values.totalQuantity)),
      perDayQuantity: parseInt(String(values.perDayQuantity)),
    })
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));
  };

  const onDelete = (id: string) =>
    BeAPI.remove("medicine-schedule", id)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));

  return (
    <PageView
      title="Medicine Schedule"
      data={data}
      inputs={formInputs}
      onSubmit={onSubmit}
      onDelete={onDelete}
    />
  );
};

export default MedicineSchedule;
