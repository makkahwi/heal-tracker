import { useEffect, useState } from "react";

import * as BeAPI from "../../../API";
import PageView from "../../../Components/PageView";

export interface props {
  id?: string;
  date: string;
}

const LabTests = () => {
  const [data, setData] = useState<props[]>([]);

  const getData = () =>
    BeAPI.getAll("labTests")
      .then((res: props[]) =>
        setData(res?.sort((a, b) => (a.date > b.date ? -1 : 1)))
      )
      .catch((err) => console.log({ err }));

  useEffect(() => {
    // scheduleAPI.getAll().then((res: MealViewProps[][]) => setData(res));
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
      name: "tsh",
      label: "TSH",
      type: "number",
      step: "0.01",
      lowEnd: 0.27,
      highEnd: 5.0,
    },
    {
      name: "sgot",
      label: "SGOT (AST)",
      type: "number",
      step: "0.01",
      highEnd: 50,
    },
    {
      name: "sgpt",
      label: "SGPT (ALT)",
      type: "number",
      step: "0.01",
      highEnd: 50,
    },
    {
      name: "ferritin",
      label: "Ferritin",
      type: "number",
      step: "0.01",
      highEnd: 50,
    },
    {
      name: "sugar",
      label: "Fasting Blood Sugar",
      type: "number",
      step: "0.01",
      lowEnd: 70,
      highEnd: 110,
    },
    {
      name: "glucose",
      label: "Glucose",
      type: "number",
      step: "0.01",
      highEnd: 6.1,
    },
    {
      name: "insulin",
      label: "Fasting Insulin",
      type: "number",
      step: "0.01",
      lowEnd: 1.1,
      highEnd: 17.0,
    },
    {
      name: "insulinResistance",
      label: "Insulin Resistance",
      type: "number",
      step: "0.01",
      highEnd: 2.8,
    },
    {
      name: "cholesterolTotal",
      label: "Cholesterol Total",
      type: "number",
      step: "0.01",
      highEnd: 190,
    },
    {
      name: "triglycerides",
      label: "Triglycerides",
      type: "number",
      step: "0.01",
      highEnd: 150,
    },
    {
      name: "cholesterolHdl",
      label: "Cholesterol HDL",
      type: "number",
      step: "0.01",
      lowEnd: 35,
      highEnd: 65,
    },
    {
      name: "cholesterolLdl",
      label: "Cholesterol LDL",
      type: "number",
      step: "0.01",
      highEnd: 130,
    },
    {
      name: "ldl",
      label: "LDL Risk Ratio I",
      type: "number",
      step: "0.01",
      highEnd: 3.22,
    },
    {
      name: "cholesterolT",
      label: "LDL Risk Ratio II",
      type: "number",
      step: "0.01",
      highEnd: 4.44,
    },
    {
      name: "vldl",
      label: "VLDL",
      type: "number",
      step: "0.01",
      lowEnd: 5,
      highEnd: 40,
    },
    {
      name: "hemoglobin",
      label: "Hemoglobin Level",
      type: "number",
      step: "0.01",
      lowEnd: 13.2,
      highEnd: 17.3,
    },
    {
      name: "redCellCount",
      label: "Red Cell Count",
      type: "number",
      step: "0.01",
      lowEnd: 4.3,
      highEnd: 5.7,
    },
    {
      name: "hematocrit",
      label: "Hematocrit",
      type: "number",
      step: "0.01",
      lowEnd: 39,
      highEnd: 49,
    },
    {
      name: "mcv",
      label: "MCV",
      type: "number",
      step: "0.01",
      lowEnd: 80,
      highEnd: 99,
    },
    {
      name: "mch",
      label: "MCH",
      type: "number",
      step: "0.01",
      lowEnd: 27,
      highEnd: 34,
    },
    {
      name: "mchc",
      label: "MCHC",
      type: "number",
      step: "0.01",
      lowEnd: 32,
      highEnd: 37,
    },
    {
      name: "rdwcv",
      label: "RDW-CV",
      type: "number",
      step: "0.01",
      lowEnd: 11,
      highEnd: 16,
    },
    {
      name: "rdwsd",
      label: "RDW-SD",
      type: "number",
      step: "0.01",
      lowEnd: 37,
      highEnd: 54,
    },
    {
      name: "whiteCellCount",
      label: "White Cell Count",
      type: "number",
      step: "0.01",
      lowEnd: 5,
      highEnd: 11,
    },
    {
      name: "neutrophils",
      label: "Neutrophils Segmented",
      type: "number",
      step: "0.01",
      lowEnd: 2,
      highEnd: 7,
    },
    {
      name: "lymphocytes",
      label: "Lymphocytes",
      type: "number",
      step: "0.01",
      lowEnd: 0.8,
      highEnd: 4.8,
    },
    {
      name: "monocytes",
      label: "Monocytes",
      type: "number",
      step: "0.01",
      lowEnd: 0.2,
      highEnd: 1,
    },
    {
      name: "eosinophils",
      label: "Eosinophils",
      type: "number",
      step: "0.01",
      lowEnd: 80,
      highEnd: 360,
    },
    {
      name: "basophils",
      label: "Basophils",
      type: "number",
      step: "0.01",
      lowEnd: 0,
      highEnd: 1,
    },
    {
      name: "plateletsCount",
      label: "Platelets Count",
      type: "number",
      step: "0.01",
      lowEnd: 150,
      highEnd: 450,
    },
    {
      name: "mpv",
      label: "MPV",
      type: "number",
      step: "0.01",
      lowEnd: 0.8,
      highEnd: 12,
    },
    {
      name: "serum",
      label: "Serum",
      type: "number",
      step: "0.01",
      lowEnd: 12.5,
      highEnd: 32.2,
    },
    {
      name: "transferrin",
      label: "Transferrin",
      type: "number",
      step: "0.01",
      lowEnd: 2.0,
      highEnd: 3.6,
    },
    {
      name: "tibc",
      label: "TIBC",
      type: "number",
      step: "0.01",
      lowEnd: 45,
      highEnd: 80,
    },
    {
      name: "urea",
      label: "Urea",
      type: "number",
      step: "0.01",
      lowEnd: 2.8,
      highEnd: 7.2,
    },
    {
      name: "Creatinine",
      label: "Creatinine",
      type: "number",
      step: "0.01",
      lowEnd: 59,
      highEnd: 104,
    },
    {
      name: "uricAcid",
      label: "Uric Acid",
      type: "number",
      step: "0.01",
      lowEnd: 208,
      highEnd: 428,
    },
    {
      name: "sodium",
      label: "Sodium",
      type: "number",
      step: "0.01",
      lowEnd: 136,
      highEnd: 146,
    },
    {
      name: "potassium",
      label: "Potassium",
      type: "number",
      step: "0.01",
      lowEnd: 3.5,
      highEnd: 5.1,
    },
    {
      name: "chloride",
      label: "Chloride",
      type: "number",
      step: "0.01",
      lowEnd: 101,
      highEnd: 109,
    },
    {
      name: "calcium",
      label: "Calcium",
      type: "number",
      step: "0.01",
      lowEnd: 2.2,
      highEnd: 2.65,
    },
    {
      name: "correctedCalcium",
      label: "Corrected Calcium",
      type: "number",
      step: "0.01",
      lowEnd: 2.1,
      highEnd: 2.6,
    },
    {
      name: "phosphorus",
      label: "Phosphorus",
      type: "number",
      step: "0.01",
      lowEnd: 0.81,
      highEnd: 1.45,
    },
    {
      name: "magnesium",
      label: "Magnesium",
      type: "number",
      step: "0.01",
      lowEnd: 0.73,
      highEnd: 1.06,
    },
    {
      name: "bilirubin",
      label: "Bilirubin",
      type: "number",
      step: "0.01",
      lowEnd: 5,
      highEnd: 21,
    },
    {
      name: "protein",
      label: "Protein",
      type: "number",
      step: "0.01",
      lowEnd: 66,
      highEnd: 83,
    },
    {
      name: "albumin",
      label: "Albumin",
      type: "number",
      step: "0.01",
      lowEnd: 32,
      highEnd: 52,
    },
    {
      name: "globulin",
      label: "Globulin",
      type: "number",
      step: "0.01",
      lowEnd: 21,
      highEnd: 40,
    },
    {
      name: "agRatio",
      label: "A/G Ratio",
      type: "number",
      step: "0.01",
      lowEnd: 1.0,
      highEnd: 2.2,
    },
    {
      name: "phosphatase",
      label: "Phosphatase",
      type: "number",
      step: "0.01",
      lowEnd: 43,
      highEnd: 115,
    },
    {
      name: "ggt",
      label: "GGT",
      type: "number",
      step: "0.01",
      highEnd: 55,
    },
    {
      name: "vitamineB12",
      label: "Vitamine B12",
      type: "number",
      step: "0.01",
      lowEnd: 180,
      highEnd: 914,
    },
    {
      name: "vitamineD",
      label: "Vitamine D",
      type: "number",
      step: "0.01",
      lowEnd: 30,
    },
  ];

  const onSubmit = (values: props) => {
    const finalValues = Object.keys(values)
      .filter((key) => (values as any)[key])
      .reduce((final, key) => ({ ...final, [key]: (values as any)[key] }), {});

    BeAPI.create("labTests", finalValues)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));
  };

  const onDelete = (id: string) =>
    BeAPI.remove("labTests", id)
      .then(() => {
        getData();
      })
      .catch((err) => console.log({ err }));

  return (
    <PageView
      title="Lab Tests List"
      data={data}
      inputs={formInputs}
      onSubmit={onSubmit}
      onDelete={onDelete}
    />
  );
};

export default LabTests;
