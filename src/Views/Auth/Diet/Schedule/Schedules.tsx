import { useEffect, useState } from "react";

import * as BeAPI from "../../../../API";
import PageView from "../../../../Components/PageView";

export interface ScheduleProps {
  id?: string;
  order: number;
}

const Schedules = () => {
  const [data, setData] = useState<ScheduleProps[]>([]);

  const getData = () => {
    BeAPI.getAll("schedules")
      .then((res: ScheduleProps[]) =>
        setData(res.sort((a, b) => (a.order < b.order ? 1 : -1)))
      )
      .catch((err) => console.log({ err }));
  };

  useEffect(() => {
    // scheduleAPI.getAll().then((res: MealViewProps[][]) => setData(res));
    getData();
  }, []);

  const formInputs = [
    {
      name: "order",
      label: "Schedule Order",
      type: "number",
      required: true,
    },
    {
      name: "date",
      label: "Giving Date",
      type: "date",
      required: true,
    },
  ];

  const onSubmit = (values: ScheduleProps) => {
    BeAPI.create("schedules", values)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));
  };

  const onDelete = (id: string) =>
    BeAPI.remove("schedules", id)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));

  return (
    <PageView
      title="Schedules List"
      data={data}
      inputs={formInputs}
      onSubmit={onSubmit}
      onDelete={onDelete}
    />
  );
};

export default Schedules;
