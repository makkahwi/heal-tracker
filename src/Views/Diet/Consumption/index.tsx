import moment, { MomentInput } from "moment";
import { Fragment, useEffect, useState } from "react";

import * as BeAPI from "../../../API";
import Form from "../../../Components/Form";
import { MealViewProps } from "../../../Components/MealView";
import PageSection from "../../../Components/PageView/PageSection";
import { MealProps } from "../Meals";
import WeeklyCalendar from "./WeeklyCalendar";

export interface props {
  id?: string;
  timestamp: MomentInput;
  meal: MealProps;
  note?: string;
  contents: MealViewProps[];
  supposed: MealViewProps[];
}

const Consumption = () => {
  const [data, setData] = useState<props[]>([]);
  const [scheduled, setScheduled] = useState<MealViewProps[]>([]);
  const [meals, setMeals] = useState<MealProps[]>([]);

  const getData = () => {
    BeAPI.getAll("schedule")
      .then((res: MealViewProps[]) =>
        setScheduled(res?.sort((a, b) => (a.element > b.element ? 1 : -1)))
      )
      .catch((err) => console.log({ err }));
    BeAPI.getAll("consumption")
      .then((res: props[]) =>
        setData(
          res
            ?.sort((a: any, b: any) => (a.timestamp > b.timestamp ? -1 : 1))
            ?.map(({ contents, supposed, ...rest }) => ({
              ...rest,
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
    BeAPI.getAll("meals")
      .then((res: any) => setMeals([...res, { meal: "Other" }]))
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
      options: meals?.map(({ meal }) => meal),
      onChange: (e: any, setValues: any) => {
        setValues((current: any) => ({
          ...current,
          [e.target.name]: e.target.value,
          contents: scheduled
            ?.filter(({ meal }) => meal === e.target.value)
            .reduce(
              (final: MealViewProps[], { alternatives, ...rest }) =>
                alternatives
                  ? [...final, rest, ...alternatives]
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
        { name: "count", label: "Count", required: true },
        { name: "note", label: "Note", required: false },
      ],
      required: true,
    },
  ];

  interface submitProps {
    date: string;
    time: string;
    meal: string;
    contents: MealViewProps[];
    supposed: MealViewProps[];
  }

  const onSubmit = (values: submitProps) => {
    const date = values.date || moment().format("yyyy-MM-DD");
    const time = values.time || moment().format("HH:mm");

    const finalValue = {
      meal: meals.find((m) => m.meal === values.meal),
      contents: values.contents,
      supposed: scheduled?.filter(({ meal }) => meal === values.meal),
      timestamp: moment(date + "T" + time),
    };

    BeAPI.create("consumption", finalValue)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));
  };

  const onDelete = (id: string) =>
    BeAPI.remove("consumption", id)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));

  return (
    <PageSection title="Consumed Meals">
      <Fragment>
        <Form inputs={formInputs} onSubmit={onSubmit} />

        <div className="overflow-auto">
          <WeeklyCalendar data={data} onDelete={onDelete} />
        </div>
      </Fragment>
    </PageSection>
  );
};

export default Consumption;
