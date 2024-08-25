import moment, { MomentInput } from "moment";
import { Fragment, useEffect, useState } from "react";

import * as BeAPI from "../../../../API";
import Form from "../../../../Components/Form";
import PageSection from "../../../../Components/PageView/PageSection";
import { SchedulesMealElementProps } from "../Schedule/Elements";
import { SchedulesMealProps } from "../Schedule/Meals";
import { ScheduleProps } from "../Schedule/Schedules";
import WeeklyCalendar from "./WeeklyCalendar";

export interface consumptionProps {
  id?: string;
  timestamp: MomentInput;
  meal: SchedulesMealProps;
  note?: string;
  contents: SchedulesMealElementProps[];
  supposed: SchedulesMealElementProps[];
}

const Consumption = () => {
  const [data, setData] = useState<consumptionProps[]>([]);
  const [scheduled, setScheduled] = useState<SchedulesMealElementProps[]>([]);
  const [meals, setMeals] = useState<SchedulesMealProps[]>([]);
  const [schedules, setSchedules] = useState<ScheduleProps[]>([]);

  const getData = () => {
    BeAPI.getAll("scheduleMealElements")
      .then((res: SchedulesMealElementProps[]) =>
        setScheduled(res?.sort((a, b) => (a.element > b.element ? 1 : -1)))
      )
      .catch((err) => console.log({ err }));

    BeAPI.getAll("scheduleMeals")
      .then((res: SchedulesMealProps[]) =>
        setMeals(
          res
            .sort((a: SchedulesMealProps, b: SchedulesMealProps) =>
              a.time < b.time ? -1 : 1
            )
            .sort((a: SchedulesMealProps, b: SchedulesMealProps) =>
              a.schedule < b.schedule ? 1 : -1
            )
        )
      )
      .catch((err) => console.log({ err }));

    BeAPI.getAll("schedules")
      .then((res: ScheduleProps[]) =>
        setSchedules(
          res.sort((a: ScheduleProps, b: ScheduleProps) =>
            a.order < b.order ? 1 : -1
          )
        )
      )
      .catch((err) => console.log({ err }));

    BeAPI.getAll("consumed")
      .then((res: consumptionProps[]) =>
        setData(
          res
            ?.sort((a: any, b: any) => (a.timestamp > b.timestamp ? -1 : 1))
            ?.map(({ contents, supposed, meal, ...rest }) => ({
              ...rest,
              meal: meals.find(({ id }) => id === meal),
              contents: contents?.sort((a, b) =>
                a.element > b.element ? 1 : -1
              ),
              supposed: supposed?.sort((a, b) =>
                a.element > b.element ? 1 : -1
              ),
            }))
        )
      )
      .catch((err) => console.log({ err }));
  };

  useEffect(() => {
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
      name: "meal",
      label: "Meal of Day",
      type: "select",
      options: meals?.map(({ id, meal, schedule }) => ({
        value: id || "",
        label:
          meal +
          " of Schedule " +
          schedules.find(({ id }) => id === String(schedule))?.order,
      })),
      onChange: (e: any, setValues: any) => {
        setValues((current: any) => ({
          ...current,
          [e.target.name]: e.target.value,
          contents: scheduled
            ?.filter(({ meal }) => meal === e.target.value)
            .reduce(
              (final: SchedulesMealElementProps[], { alternatives, ...rest }) =>
                alternatives
                  ? [
                      ...final,
                      rest,
                      ...alternatives.map((x) => ({
                        ...x,
                        note: "Alternative",
                      })),
                    ]
                  : [...final, rest],
              []
            ),
        }));
      },
      required: true,
    },
    {
      name: "note",
      label: "Note",
      fullWidth: true,
    },
    {
      name: "contents",
      label: "Meal Contents",
      type: "dynamicList",
      fullWidth: true,
      inputs: [
        { name: "element", label: "Element", required: true },
        { name: "count", label: "Quantity", required: true },
        { name: "note", label: "Note", required: false },
      ],
      required: true,
    },
  ];

  interface submitProps {
    date: string;
    time: string;
    meal: string;
    note?: string;
    contents: SchedulesMealElementProps[];
    supposed: SchedulesMealElementProps[];
  }

  const onSubmit = (values: submitProps) => {
    const date = values.date || moment().format("yyyy-MM-DD");
    const time = values.time || moment().format("HH:mm");

    const finalValue = {
      meal: values.meal,
      contents: values.contents,
      timestamp: moment(date + "T" + time),
      note: values.note,
    };

    BeAPI.create("consumed", finalValue)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));
  };

  const onDelete = (id: string) =>
    BeAPI.remove("consumed", id)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));

  return (
    <PageSection title="Consumed Meals">
      <Fragment>
        <Form inputs={formInputs} onSubmit={onSubmit} />

        <WeeklyCalendar data={data} onDelete={onDelete} />
      </Fragment>
    </PageSection>
  );
};

export default Consumption;
