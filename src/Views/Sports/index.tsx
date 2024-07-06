import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useEffect, useState } from "react";

import * as sessionsAPI from "../../API/sessions";
import Form from "../../Components/Form";
import { MealViewProps } from "../../Components/MealView";
import PageSection from "../../Components/PageSection";
import moment from "moment";

export interface MealProps {
  id?: string;
  date: string;
  startTime: string;
  endTime: string;
  distance: number;
}

const Sports = () => {
  const [data, setData] = useState<MealProps[]>([]);

  const getData = () => sessionsAPI.getAll().then((res: any) => setData(res));

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
      name: "startTime",
      label: "Start Time",
      type: "time",
      defaultValue: moment().format("HH:mm"),
      required: true,
    },
    {
      name: "endTime",
      label: "End Time",
      type: "time",
      defaultValue: moment().format("HH:mm"),
      required: true,
    },
    {
      name: "distance",
      label: "Distance",
      type: "number",
      defaultValue: 6,
      step: "0.1",
      required: true,
    },
  ];

  interface submitProps {
    date: string;
    contents: MealViewProps[];
  }

  const onSubmit = (values: submitProps) => {
    console.log({ values });

    sessionsAPI.create(values).then(() => {
      getData();
    });
  };

  const onDelete = (id: string) =>
    sessionsAPI.remove(id).then(() => {
      getData();
    });

  return (
    <PageSection title="Sport Sessions List">
      <Fragment>
        <Form inputs={formInputs} onSubmit={onSubmit} />

        <table className="table table-bordered table-responsive table-striped">
          <thead>
            <tr className="align-middle">
              <th>Date</th>

              <th>Start Time</th>

              <th>End Time</th>

              <th>Distance</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data
              ?.sort((a, b) => (a.date > b.date ? 1 : -1))
              .map(({ id, startTime, endTime, distance, date }, y) => (
                <tr key={y}>
                  <td>{moment(date).format("ddd, D MMM YYYY")}</td>
                  <td>{moment("2024-07-01T" + startTime).format("h:mm a")}</td>
                  <td>{moment("2024-07-01T" + endTime).format("h:mm a")}</td>
                  <td>{distance + " KM"}</td>
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

export default Sports;
