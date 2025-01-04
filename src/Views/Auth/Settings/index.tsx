import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as BeAPI from "../../../API";
import Form from "../../../Components/Form";
import PageSection from "../../../Components/PageView/PageSection";
import { updateActivation } from "../../../Store/settings";
import { AppDispatch } from "../../../Store/store";

export interface settingProps {
  id: string;
  diet_consumption: boolean;
  diet_schedule: boolean;
  watering: boolean;
  fasting: boolean;
  relief: boolean;
  sport: boolean;
  sleep: boolean;
  medicine_consumption: boolean;
  medicine_schedule: boolean;
  weight_readings: boolean;
  lab_tests: boolean;
}

export const initialSettings = {
  id: "x",
  diet_consumption: false,
  diet_schedule: false,
  watering: false,
  fasting: false,
  relief: false,
  sport: false,
  sleep: false,
  medicine_consumption: false,
  medicine_schedule: false,
  weight_readings: false,
  lab_tests: false,
};

const Settings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [data, setData] = useState<settingProps>(initialSettings);

  const getData = () =>
    BeAPI.get("settings")
      .then((res: any) => {
        dispatch(updateActivation(res.value));
        setData(res.value);
      })
      .catch((err) => console.log({ err }));

  useEffect(() => {
    getData();
  }, []);

  const inputs = [
    {
      name: "diet_consumption",
      label: t("Services.Diet.Consumption.ConsumedMeals"),
      subLabel: t("Services.Diet.Consumption.Desc.Settings"),
      type: "boolean",
      defaultValue: data.diet_consumption,
      required: true,
    },
    {
      name: "diet_schedule",
      label: t("Services.Diet.Schedule.DietSchedules"),
      subLabel: t("Services.Diet.Schedule.Desc.Settings"),
      type: "boolean",
      defaultValue: data.diet_schedule,
      required: true,
    },
    {
      name: "watering",
      label: t("Services.Diet.Watering.Watering"),
      subLabel: t("Services.Diet.Watering.Desc.Settings"),
      type: "boolean",
      defaultValue: data.watering,
      required: true,
    },
    {
      name: "fasting",
      label: t("Services.Diet.Fasting.Fasting"),
      subLabel: t("Services.Diet.Fasting.Desc.Settings"),
      type: "boolean",
      defaultValue: data.fasting,
      required: true,
    },
    {
      name: "relief",
      label: t("Services.Relief.Relief"),
      subLabel: t("Services.Relief.Desc.Settings"),
      type: "boolean",
      defaultValue: data.relief,
      required: true,
    },
    {
      name: "sport",
      label: t("Services.Sports.SportSessions"),
      subLabel: t("Services.Sports.Desc.Settings"),
      type: "boolean",
      defaultValue: data.sport,
      required: true,
    },
    {
      name: "sleep",
      label: t("Services.SleepCycles.SleepCycles"),
      subLabel: t("Services.SleepCycles.Desc.Settings"),
      type: "boolean",
      defaultValue: data.sleep,
      required: true,
    },
    {
      name: "medicine_consumption",
      label: t("Services.Medicine.ConsumedMedicines"),
      subLabel: t("Services.Medicine.Consumption.Desc.Settings"),
      type: "boolean",
      defaultValue: data.medicine_consumption,
      required: true,
    },
    {
      name: "medicine_schedule",
      label: t("Services.Medicine.MedicineSchedule"),
      subLabel: t("Services.Medicine.Schedule.Desc.Settings"),
      type: "boolean",
      defaultValue: data.medicine_schedule,
      required: true,
    },
    {
      name: "weight_readings",
      label: t("Services.WeightReadings.WeightReadings"),
      subLabel: t("Services.WeightReadings.Desc.Settings"),
      type: "boolean",
      defaultValue: data.weight_readings,
      required: true,
    },
    {
      name: "lab_tests",
      label: t("Services.LabTests.LabTestsList"),
      subLabel: t("Services.LabTests.Desc.Settings"),
      type: "boolean",
      defaultValue: data.lab_tests,
      required: true,
    },
  ];

  const onSubmit = (values: settingProps) => {
    BeAPI.update({
      table: "settings",
      id: data.id || "x",
      data: values,
    })
      .then(async () => {
        await getData();
        window.location.reload();
      })
      .catch((err) => console.log({ err }));
  };

  return (
    <PageSection title={t("Settings.Title")}>
      <PageSection title={t("Settings.ServicesActivation.Title")}>
        <Form inputs={inputs} onSubmit={onSubmit} />
      </PageSection>
    </PageSection>
  );
};

export default Settings;
