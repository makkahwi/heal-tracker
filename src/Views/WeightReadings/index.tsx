import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";

import * as weightAPI from "../../API/weight";
import Form from "../../Components/Form";
import PageSection from "../../Components/PageSection";

export interface props {
  id?: string;
  date: string;
  weight: number;
  fat: number;
  water: number;
  waist: number;
  muscles: number;
  x: number;
  y: number;
}

const WeightReadings = () => {
  const [data, setData] = useState<props[]>([]);

  const getData = () => weightAPI.getAll().then((res: any) => setData(res));

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
      name: "fat",
      label: "Fat Reading",
      type: "number",
      step: "0.1",
      required: true,
    },
    {
      name: "weight",
      label: "Weight",
      type: "number",
      step: "0.1",
      required: true,
    },
    {
      name: "water",
      label: "Water Reading",
      type: "number",
      step: "0.1",
      required: true,
    },
    {
      name: "waist",
      label: "Waist Fat Reading",
      type: "number",
      step: "0.1",
      required: true,
    },
    {
      name: "muscles",
      label: "Muscles Reading",
      type: "number",
      step: "0.1",
      required: true,
    },
    {
      name: "x",
      label: "X Reading",
      type: "number",
      step: "0.1",
      required: true,
    },
    {
      name: "y",
      label: "Y Reading",
      type: "number",
      step: "0.1",
      required: true,
    },
  ];

  const onSubmit = (values: props) => {
    console.log({ values });

    weightAPI.create(values).then(() => {
      getData();
    });
  };

  const onDelete = (id: string) =>
    weightAPI.remove(id).then(() => {
      getData();
    });

  return (
    <PageSection title="Weight Readings List">
      <Fragment>
        <Form inputs={formInputs} onSubmit={onSubmit} />

        <table className="table table-bordered table-responsive table-striped">
          <thead>
            <tr className="align-middle">
              <th>Date</th>
              <th>Weight</th>
              <th>Fat Reading</th>
              <th>Fat Weight</th>
              <th>Water Reading</th>
              <th>Water Weight</th>
              <th>Waist Fat</th>
              <th>Muscles Reading</th>
              <th>Muscles Percentage</th>
              <th>X</th>
              <th>Y</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data
              ?.sort((a, b) => (a.date < b.date ? 1 : -1))
              .map(
                ({ id, date, weight, fat, water, waist, muscles, x, y }, i) => (
                  <tr key={i}>
                    <td>{moment(date).format("ddd, D MMM YYYY")}</td>
                    <td>{weight + " KG"}</td>
                    <td>{fat + "%"}</td>
                    <td>
                      {(Math.round(fat * weight) / 100).toFixed(2) + " KG"}
                    </td>
                    <td>{water + "%"}</td>
                    <td>
                      {(Math.round(water * weight) / 100).toFixed(2) + " KG"}
                    </td>
                    <td>{waist}</td>
                    <td>{muscles + " KG"}</td>
                    <td>
                      {Math.round((muscles / weight) * 100).toFixed(2) + "%"}
                    </td>
                    <td>{x}</td>
                    <td>{y}</td>
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
                )
              )}
          </tbody>
        </table>
      </Fragment>
    </PageSection>
  );
};

export default WeightReadings;
