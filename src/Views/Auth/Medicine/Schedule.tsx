import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as BeAPI from "../../../API";
import PageView from "../../../Components/PageView";

export interface medicineScheduleProps {
  id?: string;
  medicine: string;
  specs: string;
  frequency: string;
  duration: number;
  frequencyQuantity: number;
}

const MedicineSchedule = () => {
  const { t } = useTranslation();

  const [data, setData] = useState<medicineScheduleProps[]>([]);

  const getData = () =>
    BeAPI.getAll("medicine-schedule")
      .then((res: medicineScheduleProps[]) => setData(res))
      .catch((err) => console.log({ err }));

  useEffect(() => {
    // scheduleAPI.getAll().then((res: MealViewProps[][]) => setData(res));
    getData();
  }, []);

  const formInputs = [
    {
      name: "medicine",
      label: t("Services.Medicine.Medicine"),
      type: "text",
      required: true,
    },
    {
      name: "specs",
      label: t("Services.Medicine.Specifics (Dose)"),
      type: "text",
      required: true,
    },
    {
      name: "frequency",
      label: t("Services.Medicine.Consumption Frequency"),
      type: "select",
      options: [
        { value: "Daily", label: t("Services.Medicine.Daily") },
        { value: "Bi-Daily", label: t("Services.Medicine.Bi-Daily") },
        { value: "Weekly", label: t("Services.Medicine.Weekly") },
        { value: "Bi-Weekly", label: t("Services.Medicine.Bi-Weekly") },
        { value: "Monthly", label: t("Services.Medicine.Monthly") },
      ],
      required: true,
    },
    {
      name: "duration",
      label: t("Services.Medicine.Duration (Frequency Total Occurrences)"),
      type: "number",
      required: true,
    },
    {
      name: "frequencyQuantity",
      label: t("Services.Medicine.Per Frequency Occurrence Quantity"),
      type: "number",
      required: true,
    },
  ];

  const onSubmit = (values: medicineScheduleProps) => {
    BeAPI.create("medicine-schedule", {
      ...values,
      frequencyQuantity: parseInt(String(values.frequencyQuantity)),
      duration: parseInt(String(values.duration)),
    })
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));
  };

  const onDelete = (id: string) =>
    BeAPI.remove("medicine-schedule", id)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));

  return (
    <PageView
      title={t("Services.Medicine.MedicineSchedule")}
      data={data}
      inputs={formInputs}
      onSubmit={onSubmit}
      onDelete={onDelete}
    />
  );
};

export default MedicineSchedule;
