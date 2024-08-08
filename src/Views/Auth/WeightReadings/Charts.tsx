import moment from "moment";

import { fullWeightReadingProps } from ".";
import AnalysisCharts from "../../../Components/PageView/Charts";

const WeightReadingCharts = ({ data }: { data: fullWeightReadingProps[] }) => {
  const charts = [
    {
      data: data?.map(
        ({ weight, date, weightWeeklyChange, weightSinceStartChange }) => ({
          x: date,
          y: weight,
          weekly: weightWeeklyChange,
          sinceStart: weightSinceStartChange,
        })
      ),
      title: "Weight",
      unit: "KG",
    },
    {
      data: data?.map(
        ({ fat, date, fatWeeklyChange, fatSinceStartChange }) => ({
          x: date,
          y: fat,
          weekly: fatWeeklyChange,
          sinceStart: fatSinceStartChange,
        })
      ),
      title: "Fat Percentage",
      unit: "%",
    },
    {
      data: data?.map(
        ({
          fatWeight,
          date,
          fatWeightWeeklyChange,
          fatWeightSinceStartChange,
        }) => ({
          x: date,
          y: parseFloat(fatWeight),
          weekly: fatWeightWeeklyChange,
          sinceStart: fatWeightSinceStartChange,
        })
      ),
      title: "Fat Weight",
      unit: "KG",
    },
    {
      data: data?.map(
        ({ water, date, waterWeeklyChange, waterSinceStartChange }) => ({
          x: date,
          y: water,
          weekly: waterWeeklyChange,
          sinceStart: waterSinceStartChange,
        })
      ),
      title: "Water Percentage",
      unit: "%",
    },
    {
      data: data?.map(
        ({ waist, date, waistWeeklyChange, waistSinceStartChange }) => ({
          x: date,
          y: waist,
          weekly: waistWeeklyChange,
          sinceStart: waistSinceStartChange,
        })
      ),
      title: "Waist",
    },
    {
      data: data?.map(
        ({ muscles, date, musclesWeeklyChange, musclesSinceStartChange }) => ({
          x: date,
          y: muscles,
          weekly: musclesWeeklyChange,
          sinceStart: musclesSinceStartChange,
        })
      ),
      title: "Muscles Weight",
      unit: "KG",
    },
    {
      data: data?.map(
        ({
          musclesPercentage,
          date,
          musclesPercentageWeeklyChange,
          musclesPercentageSinceStartChange,
        }) => ({
          x: date,
          y: parseFloat(musclesPercentage),
          weekly: musclesPercentageWeeklyChange,
          sinceStart: musclesPercentageSinceStartChange,
        })
      ),
      title: "Muscles Percentage",
      unit: "%",
    },
    {
      data: data?.map(
        ({
          physique,
          date,
          physiqueWeeklyChange,
          physiqueSinceStartChange,
        }) => ({
          x: date,
          y: physique,
          weekly: physiqueWeeklyChange,
          sinceStart: physiqueSinceStartChange,
        })
      ),
      title: "Physique Rating",
    },
    {
      data: data?.map(
        ({ bones, date, bonesWeeklyChange, bonesSinceStartChange }) => ({
          x: date,
          y: bones,
          weekly: bonesWeeklyChange,
          sinceStart: bonesSinceStartChange,
        })
      ),
      title: "Bones Mass",
    },
  ];

  const initialHovered = () =>
    charts?.map(({ data, title }) => {
      const row = data[0];

      return {
        date: String(moment(row?.x).format("DD MMM yyyy")),
        value: parseFloat(String(row?.y)),
        title,
      };
    });

  return (
    <AnalysisCharts
      charts={charts}
      initialHovered={initialHovered}
      data={data}
    />
  );
};

export default WeightReadingCharts;
