import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";

import * as BeAPI from "../../../../API";
import Form from "../../../../Components/Form";
import MonthlyCalendar from "../../../../Components/PageView/MonthlyCalendar";
import PageSection from "../../../../Components/PageView/PageSection";
import { dateTotTimeFormat } from "../../../../Utils/consts";

export interface wateringProps {
  id?: string;
  timestamp: string;
  quantity: number;
}

export const renderWateringUI =
  (onDelete?: Function) => (event: wateringProps, date: string, id: string) => {
    return (
      <div>
        {date ? (
          <span className="d-block bg-dark text-white p-2 my-2">
            @ {dateTotTimeFormat(event.timestamp)}{" "}
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
        <small>{event.quantity} Cup(s)</small>
      </div>
    );
  };

const Watering = () => {
  const [data, setData] = useState<wateringProps[]>([]);

  const getData = () =>
    BeAPI.getAll("watering")
      .then((res: wateringProps[]) =>
        setData(
          res
            .map(({ timestamp, ...rest }) => ({
              ...rest,
              timestamp,
              date: moment(timestamp).format("yyyy-MM-DD"),
            }))
            ?.sort((a: wateringProps, b: wateringProps) =>
              a.timestamp > b.timestamp ? -1 : 1
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
      name: "timestamp",
      label: "Time",
      type: "datetime-local",
      required: true,
    },
    {
      name: "quantity",
      label: "Quantity 'In Cup(s)'",
      helpTip: "Enter the amount in cups (e.g., 1 cup = 250 ml).",
      type: "number",
      step: 0.1,
    },
  ];

  const onSubmit = (values: wateringProps) => {
    BeAPI.create("watering", values)
      .then(() => {
        getData();
      })
      .catch((err: any) => console.log({ err }));
  };

  const onDelete = (id: string) =>
    BeAPI.remove("watering", id)
      .then(() => {
        getData();
      })
      .catch((err: any) => console.log({ err }));

  return (
    <PageSection title="Watering">
      <Fragment>
        <Form inputs={formInputs} onSubmit={onSubmit} />

        <MonthlyCalendar data={data} renderEvent={renderWateringUI(onDelete)} />
      </Fragment>
    </PageSection>
  );
};

export default Watering;
