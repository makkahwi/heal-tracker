import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";

import * as BeAPI from "../../../API";
import Form from "../../../Components/Form";
import MonthlyCalendar from "../../../Components/PageView/MonthlyCalendar";
import PageSection from "../../../Components/PageView/PageSection";
import { dateTotTimeFormat, timeFormat } from "../../../Utils/consts";

export interface sleepCycleProps {
  id?: string;
  startTime: string;
  endTime: string;
  note?: string;
}

export const renderSleepCycleUI =
  (onDelete?: Function) => (event: sleepCycleProps, date: string, id: string) =>
    (
      <div>
        {date ? (
          <span className="d-block bg-dark text-white p-2 my-2">
            @ {dateTotTimeFormat(event.startTime)} -{" "}
            {dateTotTimeFormat(event.endTime)}{" "}
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
        <small>{event.note}</small>
      </div>
    );

const SleepCycles = () => {
  const [data, setData] = useState<sleepCycleProps[]>([]);

  const getData = () =>
    BeAPI.getAll("sleepCycles")
      .then((res: sleepCycleProps[]) =>
        setData(
          res
            .map(({ startTime, ...rest }) => ({
              ...rest,
              startTime,
              date: moment(startTime).format("yyyy-MM-DD"),
            }))
            ?.sort((a: sleepCycleProps, b: sleepCycleProps) =>
              a.startTime > b.startTime ? -1 : 1
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
      name: "startTime",
      label: "Start Time",
      type: "datetime-local",
      required: true,
    },
    {
      name: "endTime",
      label: "End Time",
      type: "datetime-local",
      required: true,
    },
    {
      name: "note",
      label: "Notes",
    },
  ];

  const onSubmit = (values: sleepCycleProps) => {
    BeAPI.create("sleepCycles", values)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));
  };

  const onDelete = (id: string) =>
    BeAPI.remove("sleepCycles", id)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));

  return (
    <PageSection title="Sleep Cycles">
      <Fragment>
        <Form inputs={formInputs} onSubmit={onSubmit} />

        <MonthlyCalendar
          data={data}
          renderEvent={renderSleepCycleUI(onDelete)}
        />
      </Fragment>
    </PageSection>
  );
};

export default SleepCycles;
