import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as BeAPI from "../../../API";
import Form from "../../../Components/Form";
import PageSection from "../../../Components/PageView/PageSection";
import { AppDispatch } from "../../../Store/store";

export interface settingProps {
  diet_consumption: boolean;
  diet_schedule: boolean;
  watering: boolean;
  fasting: boolean;
  relief: boolean;
  sport: boolean;
  sleep: boolean;
  medicine_schedule: boolean;
  medicine_consumption: boolean;
  weight_readings: boolean;
  lab_tests: boolean;
}

const Settings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [data, setData] = useState<settingProps>({
    diet_consumption: false,
    diet_schedule: false,
    watering: false,
    fasting: false,
    relief: false,
    sport: false,
    sleep: false,
    medicine_schedule: false,
    medicine_consumption: false,
    weight_readings: false,
    lab_tests: false,
  });

  const getData = () =>
    BeAPI.get("settings")
      .then((res: any) => setData(res))
      .catch((err) => console.log({ err }));

  useEffect(() => {
    getData();
  }, []);

  const inputs = [
    {
      name: "diet_consumption",
      label: t("Services.Diet.Consumption.Consumed Meals"),
      type: "boolean",
      defaultValue: data.diet_consumption,
      required: true,
    },
    {
      name: "diet_schedule",
      label: t("Services.Diet.Schedule.DietSchedules"),
      type: "boolean",
      defaultValue: data.diet_schedule,
      required: true,
    },
    {
      name: "watering",
      label: t("Services.Diet.Watering.Watering"),
      type: "boolean",
      defaultValue: data.watering,
      required: true,
    },
    {
      name: "fasting",
      label: t("Services.Diet.Fasting.Fasting"),
      type: "boolean",
      defaultValue: data.fasting,
      required: true,
    },
    {
      name: "relief",
      label: t("Services.Relief.Relief"),
      type: "boolean",
      defaultValue: data.relief,
      required: true,
    },
    {
      name: "sport",
      label: t("Services.Sports.SportSessions"),
      type: "boolean",
      defaultValue: data.sport,
      required: true,
    },
    {
      name: "sleep",
      label: t("Services.SleepCycles.SleepCycles"),
      type: "boolean",
      defaultValue: data.sleep,
      required: true,
    },
    {
      name: "medicine_consumption",
      label: t("Services.Medicine.ConsumedMedicines"),
      type: "boolean",
      defaultValue: data.medicine_consumption,
      required: true,
    },
    {
      name: "medicine_schedule",
      label: t("Services.Medicine.MedicineSchedule"),
      type: "boolean",
      defaultValue: data.medicine_schedule,
      required: true,
    },
    {
      name: "weight_readings",
      label: t("Services.WeightReadings.WeightReadings"),
      type: "boolean",
      defaultValue: data.weight_readings,
      required: true,
    },
    {
      name: "lab_tests",
      label: t("Services.LabTests.LabTestsList"),
      type: "boolean",
      defaultValue: data.lab_tests,
      required: true,
    },
  ];

  const onSubmit = (values: settingProps) => {
    // dispatch(signIn(values))
    //   .then(() => {
    //     getData();
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <PageSection title={t("Settings.Title")}>
      <Form inputs={inputs} onSubmit={onSubmit} />
    </PageSection>
  );
};

export default Settings;
