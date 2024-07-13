import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";

import * as medicineAPI from "../../API/medicine";
import Form from "../../Components/Form";
import { MealViewProps } from "../../Components/MealView";
import PageSection from "../../Components/PageSection";

export interface MealProps {
  id?: string;
  date: string;
  time: string;
  quantity: number;
  medicine: string;
}

const Medicine = () => {
  const [data, setData] = useState<MealProps[]>([]);

  const getData = () => medicineAPI.getAll().then((res: any) => setData(res));

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
    <PageSection title="Medicine List">
      <Fragment>
        <Form inputs={formInputs} onSubmit={onSubmit} />

        <table className="table table-bordered table-responsive table-striped">
          <thead>
            <tr className="align-middle">
              <th>Date</th>

              <th>Time</th>

              <th>Medicine</th>

              <th>Quantity</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data
              ?.sort((a, b) => (a.date < b.date ? 1 : -1))
              .map(({ id, time, medicine, quantity, date }, y) => (
                <tr key={y}>
                  <td>{moment(date).format("ddd, D MMM YYYY")}</td>
                  <td>{moment("2024-07-01T" + time).format("h:mm a")}</td>
                  <td>{medicine}</td>
                  <td>{quantity}</td>
                  <td>
                    {id && (
                      <FontAwesomeIcon
                        icon={faTrash}
                        role="button"
                        className="mx-1 text-danger"
                        onClick={() => onDelete(id)}
                      />
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Fragment>
    </PageSection>
  );
};

export default Medicine;
