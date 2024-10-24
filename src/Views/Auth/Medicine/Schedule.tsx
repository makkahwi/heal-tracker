import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useEffect, useState } from "react";

import * as BeAPI from "../../../API";
import Form from "../../../Components/Form";
import { MealViewProps } from "../../../Components/MealView";
import MonthlyCalendar from "../../../Components/PageView/MonthlyCalendar";
import PageSection from "../../../Components/PageView/PageSection";
import { timeFormat } from "../../../Utils/consts";

export interface medicineProps {
  id?: string;
  medicine: string;
  perDayQuantity: number;
  totalQuantity: number;
}

const MedicineSchedule = () => {
  const [data, setData] = useState<medicineProps[]>([]);

  const getData = () =>
    BeAPI.getAll("medicine-schedule")
      .then((res: any) => setData(res))
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
      name: "perDayQuantity",
      label: "Per Day Quantity",
      type: "number",
      required: true,
    },
    {
      name: "totalQuantity",
      label: "Total Quantity",
      type: "number",
      required: true,
    },
  ];

  const onSubmit = (values: medicineProps) => {
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
    <PageSection title="Medicine Schedule">
      <Fragment>
        <Form inputs={formInputs} onSubmit={onSubmit} />

        {JSON.stringify(data)}
      </Fragment>
    </PageSection>
  );
};

export default MedicineSchedule;
