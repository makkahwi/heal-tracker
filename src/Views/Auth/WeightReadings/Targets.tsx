import { Fragment, useEffect, useState } from "react";

import * as BeAPI from "../../../API";
import Form from "../../../Components/Form";
import PageSection from "../../../Components/PageView/PageSection";

export interface weightReadingProps {
  id?: string;
  weightMin: number;
  fatMin: number;
  waterMin: number;
  waistMin: number;
  musclesMin: number;
  weightMax: number;
  fatMax: number;
  waterMax: number;
  waistMax: number;
  musclesMax: number;
}

const WeightReadingTargets = () => {
  const [data, setData] = useState<weightReadingProps>();

  const getData = () =>
    BeAPI.get("WeightReadingTargets")
      .then((res: any) => {
        setData(res.value);
      })
      .catch((err) => console.log({ err }));

  useEffect(() => {
    getData();
  }, []);

  const formInputs = [
    {
      name: "waterMin",
      label: "Water Min Target",
      type: "number",
      step: "0.1",
      unit: "L",
      defaultValue: data?.waterMin,
      required: true,
    },
    {
      name: "waterMax",
      label: "Water Max Target",
      type: "number",
      step: "0.1",
      unit: "L",
      defaultValue: data?.waterMax,
      required: true,
    },
    {
      name: "fatMin",
      label: "Fat Weight Min Target",
      type: "number",
      step: "0.1",
      unit: "KG",
      defaultValue: data?.fatMin,
      required: true,
    },
    {
      name: "fatMax",
      label: "Fat Weight Max Target",
      type: "number",
      step: "0.1",
      unit: "KG",
      defaultValue: data?.fatMax,
      required: true,
    },
    {
      name: "weightMin",
      label: "Weight Min Target",
      type: "number",
      step: "0.1",
      unit: "KG",
      defaultValue: data?.weightMin,
      required: true,
    },
    {
      name: "weightMax",
      label: "Weight Max Target",
      type: "number",
      step: "0.1",
      unit: "KG",
      defaultValue: data?.weightMax,
      required: true,
    },
    {
      name: "musclesMin",
      label: "Muscles Min Target",
      type: "number",
      step: "0.1",
      unit: "KG",
      defaultValue: data?.musclesMin,
      required: true,
    },
    {
      name: "musclesMax",
      label: "Muscles Max Target",
      type: "number",
      step: "0.1",
      unit: "KG",
      defaultValue: data?.musclesMax,
      required: true,
    },
    {
      name: "waistMin",
      label: "Waist Fat Min Target",
      type: "number",
      step: "0.1",
      defaultValue: data?.waistMin,
      required: true,
    },
    {
      name: "waistMax",
      label: "Waist Fat Max Target",
      type: "number",
      step: "0.1",
      defaultValue: data?.waistMax,
      required: true,
    },
  ];

  const onSubmit = (values: weightReadingProps) => {
    BeAPI.update({
      table: "WeightReadingTargets",
      id: "x",
      data: values,
    }).catch((err) => console.log({ err }));
  };

  return (
    <PageSection title="Weight Reading Targets">
      <Fragment>
        <Form inputs={formInputs} onSubmit={onSubmit} />
      </Fragment>
    </PageSection>
  );
};

export default WeightReadingTargets;
