import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useEffect, useState } from "react";

import * as BeAPI from "../../../../API";
import Form from "../../../../Components/Form";
import { MealViewProps } from "../../../../Components/MealView";
import MonthlyCalendar from "../../../../Components/PageView/MonthlyCalendar";
import PageSection from "../../../../Components/PageView/PageSection";
import { timeFormat } from "../../../../Utils/consts";

export interface props {
  id?: string;
  date: string;
  startTime: string;
  endTime: string;
  distance: number;
}

const WalkExercises = () => {
  const [data, setData] = useState<props[]>([]);

  const getData = () =>
    BeAPI.getAll("WalkExercisesessions")
      .then((res: any) =>
        setData(res?.sort((a: props, b: props) => (a.date > b.date ? -1 : 1)))
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
    BeAPI.create("WalkExercisesessions", values)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));
  };

  const onDelete = (id: string) =>
    BeAPI.remove("WalkExercisesessions", id)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));

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
    <PageSection title="Walk Exercises">
      <Fragment>
        <Form inputs={formInputs} onSubmit={onSubmit} />

        <MonthlyCalendar data={data} renderEvent={renderDistanceEvent} />
      </Fragment>
    </PageSection>
  );
};

export default WalkExercises;
