import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as BeAPI from "../../../API";
import Form from "../../../Components/Form";
import MonthlyCalendar from "../../../Components/PageView/MonthlyCalendar";
import PageSection from "../../../Components/PageView/PageSection";
import { dateTotTimeFormat } from "../../../Utils/consts";
import { timeDifference } from "../../../Utils/functions";

export interface reliefProps {
  id?: string;
  startTime: string;
  endTime: string;
  note?: string;
}

export const renderReliefUI =
  (onDelete?: Function) => (event: reliefProps, date: string, id: string) =>
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
            <br />
            {timeDifference(moment(event.startTime), moment(event.endTime))}
          </span>
        ) : (
          ""
        )}
        <small>{event.note}</small>
      </div>
    );

const Relief = () => {
  const { t } = useTranslation();

  const [data, setData] = useState<reliefProps[]>([]);

  const getData = () =>
    BeAPI.getAll("relief")
      .then((res: reliefProps[]) =>
        setData(
          res
            .map(({ endTime, ...rest }) => ({
              ...rest,
              endTime,
              date: moment(endTime).format("yyyy-MM-DD"),
            }))
            ?.sort((a: reliefProps, b: reliefProps) =>
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
      name: "time",
      label: t("Services.Relief.Time"),
      type: "datetime-local",
      required: true,
    },
    {
      name: "type",
      label: t("Services.Relief.Type"),
      type: "select",
      options: [
        { value: "1", label: t("Services.Relief.Number1") },
        { value: "2", label: t("Services.Relief.Number2") },
      ],
      required: true,
    },
    {
      name: "note",
      label: t("Services.Relief.Notes"),
    },
  ];

  const onSubmit = (values: reliefProps) => {
    BeAPI.create("relief", values)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));
  };

  const onDelete = (id: string) =>
    BeAPI.remove("relief", id)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));

  return (
    <PageSection title={t("Services.Relief.Relief")}>
      <Fragment>
        <Form inputs={formInputs} onSubmit={onSubmit} />

        <MonthlyCalendar data={data} renderEvent={renderReliefUI(onDelete)} />
      </Fragment>
    </PageSection>
  );
};

export default Relief;
