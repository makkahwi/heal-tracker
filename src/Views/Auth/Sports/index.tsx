import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";

import * as BeAPI from "../../../API";
import Form from "../../../Components/Form";
import MonthlyCalendar from "../../../Components/PageView/MonthlyCalendar";
import PageSection from "../../../Components/PageView/PageSection";
import { timeFormat } from "../../../Utils/consts";
import { timeDifference } from "../../../Utils/functions";

export interface walkExerciseProps {
  id?: string;
  date: string;
  startTime: string;
  endTime: string;
  type: string;
  measure: string;
  note?: string;
}

interface sportNoteProps {
  id: string;
  value: string;
}

export const renderExerciseUI =
  (onDelete?: Function) =>
  (event: walkExerciseProps, date: string, id: string) =>
    (
      <div>
        {date ? (
          <span className="d-block bg-dark text-white p-2 my-2">
            @ {timeFormat(event.startTime)} - {timeFormat(event.endTime)}{" "}
            {onDelete && (
              <FontAwesomeIcon
                icon={faTrashCan}
                className="mt-1 text-danger"
                role="button"
                onClick={() => onDelete(id)}
              />
            )}
            <br />
            {timeDifference(
              moment("2024-08-06T" + event.startTime),
              moment("2024-08-06T" + event.endTime)
            )}
          </span>
        ) : (
          ""
        )}
        <div className="fw-bold">
          {event.measure} of {event.type}
        </div>
        <small>{event.note}</small>
      </div>
    );

const WalkExercises = () => {
  const [data, setData] = useState<walkExerciseProps[]>([]);
  const [sportNote, setSportNote] = useState<sportNoteProps>({
    id: "",
    value: "",
  });

  const getData = () => {
    BeAPI.getAll("sportSessions")
      .then((res: any) =>
        setData(
          res?.sort((a: walkExerciseProps, b: walkExerciseProps) =>
            a.date > b.date ? -1 : 1
          )
        )
      )
      .catch((err) => console.log({ err }));

    BeAPI.get("sportNote")
      .then((res: any) => setSportNote(res))
      .catch((err) => console.log({ err }));
  };

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
      name: "type",
      label: "Sport Type",
      type: "select",
      options: [
        {
          value: "Swimming",
        },
        {
          value: "Jogging",
        },
        {
          value: "Walking",
        },
      ],
      required: true,
      defaultValue: "Swimming",
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
      name: "measure",
      label: "Measure (Walked Distance, Swimming Time, ...etc)",
      helpTip: "Provide specific details like distance walked or time swum.",
      type: "text",
      defaultValue: sportNote.value,
      step: "0.1",
      required: true,
    },
    {
      name: "note",
      label: "Notes",
      fullWidth: true,
    },
  ];

  interface submitSportNoteProps {
    note: string;
  }

  const onSubmit = (values: walkExerciseProps) => {
    BeAPI.create("sportSessions", values)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));
  };

  const onSportNoteSubmit = (values: submitSportNoteProps) => {
    BeAPI.update({ table: "sportNote", id: sportNote.id, data: values.note })
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));
  };

  const onDelete = (id: string) =>
    BeAPI.remove("sportSessions", id)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));

  return (
    <PageSection title="Sport Sessions">
      <Fragment>
        <Form
          inputs={[
            {
              name: "note",
              label: "Sport Note",
              defaultValue: sportNote.value,
              fullWidth: true,
              required: true,
            },
          ]}
          onSubmit={onSportNoteSubmit}
        />

        <Form inputs={formInputs} onSubmit={onSubmit} />

        <MonthlyCalendar data={data} renderEvent={renderExerciseUI(onDelete)} />
      </Fragment>
    </PageSection>
  );
};

export default WalkExercises;
