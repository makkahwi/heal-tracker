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
  date: string;
  time: string;
  quantity: number;
  medicine: string;
}

export const renderMedicineUI =
  (onDelete?: Function) => (event: medicineProps, date: string, id: string) =>
    (
      <div>
        {date ? (
          <span className="d-block bg-dark text-white p-2 my-2">
            @ {timeFormat(event.time)}{" "}
            {onDelete && (
              <FontAwesomeIcon
                icon={faTrashCan}
                className="mt-1 text-danger"
                role="button"
                onClick={() => onDelete(id)}
              />
            )}
          </span>
        ) : (
          ""
        )}
        <div className="fw-bold">
          {event.quantity} of {event.medicine}
        </div>
      </div>
    );

const Medicine = () => {
  const [data, setData] = useState<medicineProps[]>([]);

  const getData = () =>
    BeAPI.getAll("medicine")
      .then((res: any) =>
        setData(
          res?.sort((a: medicineProps, b: medicineProps) =>
            a.date > b.date ? -1 : 1
          )
        )
      )
      .catch((err) => console.log({ err }));

  useEffect(() => {
    // scheduleAPI.getAll().then((res: MealViewProps[][]) => setData(res));
    getData();
  }, []);

  const formInputs = [
    {
      name: "date",
      label: "Date",
      type: "date",
      required: true,
    },
    {
      name: "time",
      label: "Time",
      type: "time",
      required: true,
    },
    {
      name: "quantity",
      label: "Quantity",
      type: "number",
      defaultValue: 1,
      required: true,
    },
    {
      name: "medicine",
      label: "Medicine",
      type: "select",
      options: [{ value: "Vitamine D" }, { value: "Sleeping Bills" }],
      defaultValue: "Vitamine D",
      required: true,
    },
  ];

  interface submitProps {
    date: string;
    contents: MealViewProps[];
  }

  const onSubmit = (values: submitProps) => {
    BeAPI.create("medicine", values)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));
  };

  const onDelete = (id: string) =>
    BeAPI.remove("medicine", id)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));

  return (
    <PageSection title="Medicine List">
      <Fragment>
        <Form inputs={formInputs} onSubmit={onSubmit} />

        <MonthlyCalendar data={data} renderEvent={renderMedicineUI(onDelete)} />
      </Fragment>
    </PageSection>
  );
};

export default Medicine;
