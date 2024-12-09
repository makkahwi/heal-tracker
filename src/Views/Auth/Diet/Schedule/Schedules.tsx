import * as BeAPI from "../../../../API";
import PageView from "../../../../Components/PageView";

export interface ScheduleProps {
  id?: string;
  order: number;
}

interface props {
  data: ScheduleProps[];
  getData: () => any;
}

const Schedules = ({ data, getData }: props) => {
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
    BeAPI.create("schedules", {
      ...values,
      order: parseFloat(String(values.order)),
    })
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
