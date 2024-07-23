import moment from "moment";
import { useEffect, useState } from "react";

import * as testsAPI from "../../API/tests";
import PageView from "../../Components/PageView";

export interface props {
  id?: string;
  date: string;
}

const LabTests = () => {
  const [data, setData] = useState<props[]>([]);

  const getData = () =>
    testsAPI
      .getAll()
      .then((res: props[]) =>
        setData(res.sort((a, b) => (a.date > b.date ? -1 : 1)))
      );

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
      required: true,
    },
    {
      name: "sgot",
      label: "SGOT (AST)",
      type: "number",
      step: "0.01",
      highEnd: 50,
      required: true,
    },
    {
      name: "sgpt",
      label: "SGPT (ALT)",
      type: "number",
      step: "0.01",
      highEnd: 50,
      required: true,
    },
    {
      name: "ferritin",
      label: "Ferritin",
      type: "number",
      step: "0.01",
      highEnd: 50,
      required: true,
    },
    {
      name: "sugar",
      label: "Fasting Blood Sugar",
      type: "number",
      step: "0.01",
      lowEnd: 70,
      highEnd: 110,
      required: true,
    },
    {
      name: "glucose",
      label: "Glucose",
      type: "number",
      step: "0.01",
      highEnd: 6.1,
      required: true,
    },
    {
      name: "insulin",
      label: "Fasting Insulin",
      type: "number",
      step: "0.01",
      lowEnd: 1.1,
      highEnd: 17.0,
      required: true,
    },
    {
      name: "insulinResistance",
      label: "Insulin Resistance",
      type: "number",
      step: "0.01",
      highEnd: 2.8,
      required: true,
    },
    {
      name: "cholesterolTotal",
      label: "Cholesterol Total",
      type: "number",
      step: "0.01",
      highEnd: 190,
      required: true,
    },
    {
      name: "triglycerides",
      label: "Triglycerides",
      type: "number",
      step: "0.01",
      highEnd: 150,
      required: true,
    },
    {
      name: "cholesterolHdl",
      label: "Cholesterol HDL",
      type: "number",
      step: "0.01",
      lowEnd: 35,
      highEnd: 65,
      required: true,
    },
    {
      name: "cholesterolLdl",
      label: "Cholesterol LDL",
      type: "number",
      step: "0.01",
      highEnd: 130,
      required: true,
    },
    {
      name: "ldl",
      label: "LDL Risk Ratio I",
      type: "number",
      step: "0.01",
      highEnd: 3.22,
      required: true,
    },
    {
      name: "cholesterolT",
      label: "LDL Risk Ratio II",
      type: "number",
      step: "0.01",
      highEnd: 4.44,
      required: true,
    },
    {
      name: "vldl",
      label: "VLDL",
      type: "number",
      step: "0.01",
      lowEnd: 5,
      highEnd: 40,
      required: true,
    },
    {
      name: "hemoglobin",
      label: "Hemoglobin Level",
      type: "number",
      step: "0.01",
      lowEnd: 13.2,
      highEnd: 17.3,
      required: true,
    },
    {
      name: "redCellCount",
      label: "Red Cell Count",
      type: "number",
      step: "0.01",
      lowEnd: 4.3,
      highEnd: 5.7,
      required: true,
    },
    {
      name: "hematocrit",
      label: "Hematocrit",
      type: "number",
      step: "0.01",
      lowEnd: 39,
      highEnd: 49,
      required: true,
    },
    {
      name: "mcv",
      label: "MCV",
      type: "number",
      step: "0.01",
      lowEnd: 80,
      highEnd: 99,
      required: true,
    },
    {
      name: "mch",
      label: "MCH",
      type: "number",
      step: "0.01",
      lowEnd: 27,
      highEnd: 34,
      required: true,
    },
    {
      name: "mchc",
      label: "MCHC",
      type: "number",
      step: "0.01",
      lowEnd: 32,
      highEnd: 37,
      required: true,
    },
    {
      name: "rdwcv",
      label: "RDW-CV",
      type: "number",
      step: "0.01",
      lowEnd: 11,
      highEnd: 16,
      required: true,
    },
    {
      name: "rdwsd",
      label: "RDW-SD",
      type: "number",
      step: "0.01",
      lowEnd: 37,
      highEnd: 54,
      required: true,
    },
    {
      name: "whiteCellCount",
      label: "White Cell Count",
      type: "number",
      step: "0.01",
      lowEnd: 5,
      highEnd: 11,
      required: true,
    },
    {
      name: "neutrophils",
      label: "Neutrophils Segmented",
      type: "number",
      step: "0.01",
      lowEnd: 2,
      highEnd: 7,
      required: true,
    },
    {
      name: "lymphocytes",
      label: "Lymphocytes",
      type: "number",
      step: "0.01",
      lowEnd: 0.8,
      highEnd: 4.8,
      required: true,
    },
    {
      name: "monocytes",
      label: "Monocytes",
      type: "number",
      step: "0.01",
      lowEnd: 0.2,
      highEnd: 1,
      required: true,
    },
    {
      name: "eosinophils",
      label: "Eosinophils",
      type: "number",
      step: "0.01",
      lowEnd: 80,
      highEnd: 360,
      required: true,
    },
    {
      name: "basophils",
      label: "Basophils",
      type: "number",
      step: "0.01",
      lowEnd: 0,
      highEnd: 1,
      required: true,
    },
    {
      name: "plateletsCount",
      label: "Platelets Count",
      type: "number",
      step: "0.01",
      lowEnd: 150,
      highEnd: 450,
      required: true,
    },
    {
      name: "mpv",
      label: "MPV",
      type: "number",
      step: "0.01",
      lowEnd: 0.8,
      highEnd: 12,
      required: true,
    },
    {
      name: "serum",
      label: "Serum",
      type: "number",
      step: "0.01",
      lowEnd: 12.5,
      highEnd: 32.2,
      required: true,
    },
    {
      name: "transferrin",
      label: "Transferrin",
      type: "number",
      step: "0.01",
      lowEnd: 2.0,
      highEnd: 3.6,
      required: true,
    },
    {
      name: "tibc",
      label: "TIBC",
      type: "number",
      step: "0.01",
      lowEnd: 45,
      highEnd: 80,
      required: true,
    },
    {
      name: "urea",
      label: "Urea",
      type: "number",
      step: "0.01",
      lowEnd: 2.8,
      highEnd: 7.2,
      required: true,
    },
    {
      name: "Creatinine",
      label: "Creatinine",
      type: "number",
      step: "0.01",
      lowEnd: 59,
      highEnd: 104,
      required: true,
    },
    {
      name: "uricAcid",
      label: "Uric Acid",
      type: "number",
      step: "0.01",
      lowEnd: 208,
      highEnd: 428,
      required: true,
    },
    {
      name: "sodium",
      label: "Sodium",
      type: "number",
      step: "0.01",
      lowEnd: 136,
      highEnd: 146,
      required: true,
    },
    {
      name: "potassium",
      label: "Potassium",
      type: "number",
      step: "0.01",
      lowEnd: 3.5,
      highEnd: 5.1,
      required: true,
    },
    {
      name: "chloride",
      label: "Chloride",
      type: "number",
      step: "0.01",
      lowEnd: 101,
      highEnd: 109,
      required: true,
    },
    {
      name: "calcium",
      label: "Calcium",
      type: "number",
      step: "0.01",
      lowEnd: 2.2,
      highEnd: 2.65,
      required: true,
    },
    {
      name: "correctedCalcium",
      label: "Corrected Calcium",
      type: "number",
      step: "0.01",
      lowEnd: 2.1,
      highEnd: 2.6,
      required: true,
    },
    {
      name: "phosphorus",
      label: "Phosphorus",
      type: "number",
      step: "0.01",
      lowEnd: 0.81,
      highEnd: 1.45,
      required: true,
    },
    {
      name: "magnesium",
      label: "Magnesium",
      type: "number",
      step: "0.01",
      lowEnd: 0.73,
      highEnd: 1.06,
      required: true,
    },
    {
      name: "bilirubin",
      label: "Bilirubin",
      type: "number",
      step: "0.01",
      lowEnd: 5,
      highEnd: 21,
      required: true,
    },
    {
      name: "protein",
      label: "Protein",
      type: "number",
      step: "0.01",
      lowEnd: 66,
      highEnd: 83,
      required: true,
    },
    {
      name: "albumin",
      label: "Albumin",
      type: "number",
      step: "0.01",
      lowEnd: 32,
      highEnd: 52,
      required: true,
    },
    {
      name: "globulin",
      label: "Globulin",
      type: "number",
      step: "0.01",
      lowEnd: 21,
      highEnd: 40,
      required: true,
    },
    {
      name: "agRatio",
      label: "A/G Ratio",
      type: "number",
      step: "0.01",
      lowEnd: 1.0,
      highEnd: 2.2,
      required: true,
    },
    {
      name: "phosphatase",
      label: "Phosphatase",
      type: "number",
      step: "0.01",
      lowEnd: 43,
      highEnd: 115,
      required: true,
    },
    {
      name: "ggt",
      label: "GGT",
      type: "number",
      step: "0.01",
      highEnd: 55,
      required: true,
    },
    {
      name: "vitamineB12",
      label: "Vitamine B12",
      type: "number",
      step: "0.01",
      lowEnd: 180,
      highEnd: 914,
      required: true,
    },
    {
      name: "vitamineD",
      label: "Vitamine D",
      type: "number",
      step: "0.01",
      lowEnd: 30,
      required: true,
    },
  ];

  const onSubmit = (values: props) => {
    testsAPI.create(values).then(() => {
      getData();
    });
  };

  const onDelete = (id: string) =>
    testsAPI.remove(id).then(() => {
      getData();
    });

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
