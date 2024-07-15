import moment from "moment";
import { useEffect, useState } from "react";

import * as sessionsAPI from "../../API/sessions";
import { MealViewProps } from "../../Components/MealView";
import PageView from "../../Components/PageView";

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
      render: (row: any) => moment(row.date).format("ddd, D MMM YYYY"),
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
    sessionsAPI.create(values).then(() => {
      getData();
    });
  };

  const onDelete = (id: string) =>
    sessionsAPI.remove(id).then(() => {
      getData();
    });

  return (
    <PageView
      title="Sport Sessions List"
      data={data}
      inputs={formInputs}
      onSubmit={onSubmit}
      onDelete={onDelete}
    />
  );
};

export default Sports;
