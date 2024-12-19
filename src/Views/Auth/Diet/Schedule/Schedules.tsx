import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const formInputs = [
    {
      name: "order",
      label: t("Services.Diet.Schedule.ScheduleOrder"),
      type: "number",
      required: true,
    },
    {
      name: "date",
      label: t("Services.Diet.Schedule.GivingDate"),
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
      title={t("Services.Diet.Schedule.SchedulesList")}
      data={data}
      inputs={formInputs}
      onSubmit={onSubmit}
      onDelete={onDelete}
    />
  );
};

export default Schedules;
