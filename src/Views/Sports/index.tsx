import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useEffect, useState } from "react";

import * as sessionsAPI from "../../API/sessions";
import Form from "../../Components/Form";
import { MealViewProps } from "../../Components/MealView";
import MonthlyCalendar from "../../Components/PageView/MonthlyCalendar";
import PageSection from "../../Components/PageView/PageSection";
import { timeFormat } from "../../Utils/consts";

export interface props {
  id?: string;
  date: string;
  startTime: string;
  endTime: string;
  distance: number;
}

const Sports = () => {
  const [data, setData] = useState<props[]>([]);

  const getData = () =>
    sessionsAPI
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
      required: true,
    },
    {
      name: "startTime",
      label: "Start Time",
      type: "time",
      required: true,
    },
    {
      name: "endTime",
      label: "End Time",
      type: "time",
      required: true,
    },
    {
      name: "distance",
      label: "Distance",
      type: "number",
      defaultValue: 6,
      step: "0.1",
      unit: "KM",
      required: true,
      total: true,
    },
  ];

  interface submitProps {
    date: string;
    contents: MealViewProps[];
  }

  const onSubmit = (values: submitProps) => {
    sessionsAPI.create(values).then(() => {
      getData();
    });
  };

  const onDelete = (id: string) =>
    sessionsAPI.remove(id).then(() => {
      getData();
    });

  const renderDistanceEvent = (event: any, date: string, id: string) => (
    <div>
      {date ? (
        <span className="d-block bg-dark text-white p-2 my-2">
          @ {timeFormat(event.startTime)} - {timeFormat(event.endTime)}{" "}
        </span>
      ) : (
        ""
      )}
      <div className="fw-bold">
        {event.distance} km{" "}
        <FontAwesomeIcon
          icon={faTrashCan}
          className="mt-1 text-danger"
          role="button"
          onClick={() => onDelete(id)}
        />
      </div>
    </div>
  );

  return (
    <PageSection title="Sport Sessions List">
      <Fragment>
        <Form inputs={formInputs} onSubmit={onSubmit} />

        <MonthlyCalendar data={data} renderEvent={renderDistanceEvent} />
      </Fragment>
    </PageSection>
  );
};

export default Sports;
