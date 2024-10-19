import moment from "moment";

import { fullWeightReadingProps } from ".";
import AnalysisCharts from "../../../Components/PageView/Charts";

const WeightReadingCharts = ({ data }: { data: fullWeightReadingProps[] }) => {
  const charts = [
    {
      data: data?.map(
        ({
          weight,
          date,
          weightWeeklyChange,
          weightSinceStartChange,
          weightSinceWorstChange,
          weightSinceBestChange,
        }) => ({
          x: date,
          y: weight,
          weekly: weightWeeklyChange,
          sinceStart: weightSinceStartChange,
          sinceWorst: weightSinceWorstChange,
          sinceBest: weightSinceBestChange,
        })
      ),
      title: "Weight",
      unit: "KG",
    },
    {
      data: data?.map(
        ({
          musclesPercentage,
          date,
          musclesPercentageWeeklyChange,
          musclesPercentageSinceStartChange,
          musclesPercentageSinceWorstChange,
          musclesPercentageSinceBestChange,
        }) => ({
          x: date,
          y: parseFloat(musclesPercentage),
          weekly: musclesPercentageWeeklyChange,
          sinceStart: musclesPercentageSinceStartChange,
          sinceWorst: musclesPercentageSinceWorstChange,
          sinceBest: musclesPercentageSinceBestChange,
        })
      ),
      title: "Muscles Percentage",
      unit: "%",
    },
    // {
    //   data: data?.map(
    //     ({
    //       muscles,
    //       date,
    //       musclesWeeklyChange,
    //       musclesSinceStartChange,
    //       musclesSinceWorstChange,
    //       musclesSinceBestChange,
    //     }) => ({
    //       x: date,
    //       y: muscles,
    //       weekly: musclesWeeklyChange,
    //       sinceStart: musclesSinceStartChange,
    //       sinceWorst: musclesSinceWorstChange,
    //       sinceBest: musclesSinceBestChange,
    //     })
    //   ),
    //   title: "Muscles Weight",
    //   unit: "KG",
    // },
    {
      data: data?.map(
        ({
          water,
          date,
          waterWeeklyChange,
          waterSinceStartChange,
          waterSinceWorstChange,
          waterSinceBestChange,
        }) => ({
          x: date,
          y: water,
          weekly: waterWeeklyChange,
          sinceStart: waterSinceStartChange,
          sinceWorst: waterSinceWorstChange,
          sinceBest: waterSinceBestChange,
        })
      ),
      title: "Water Percentage",
      unit: "%",
    },
    {
      data: data?.map(
        ({
          fat,
          date,
          fatWeeklyChange,
          fatSinceStartChange,
          fatSinceWorstChange,
          fatSinceBestChange,
        }) => ({
          x: date,
          y: fat,
          weekly: fatWeeklyChange,
          sinceStart: fatSinceStartChange,
          sinceWorst: fatSinceWorstChange,
          sinceBest: fatSinceBestChange,
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
          fatWeightSinceWorstChange,
          fatWeightSinceBestChange,
        }) => ({
          x: date,
          y: parseFloat(fatWeight),
          weekly: fatWeightWeeklyChange,
          sinceStart: fatWeightSinceStartChange,
          sinceWorst: fatWeightSinceWorstChange,
          sinceBest: fatWeightSinceBestChange,
        })
      ),
      title: "Fat Weight",
      unit: "KG",
    },
    {
      data: data?.map(
        ({
          waist,
          date,
          waistWeeklyChange,
          waistSinceStartChange,
          waistSinceWorstChange,
          waistSinceBestChange,
        }) => ({
          x: date,
          y: waist,
          weekly: waistWeeklyChange,
          sinceStart: waistSinceStartChange,
          sinceWorst: waistSinceWorstChange,
          sinceBest: waistSinceBestChange,
        })
      ),
      title: "Waist",
    },
    {
      data: data?.map(
        ({
          physique,
          date,
          physiqueWeeklyChange,
          physiqueSinceStartChange,
          physiqueSinceWorstChange,
          physiqueSinceBestChange,
        }) => ({
          x: date,
          y: physique,
          weekly: physiqueWeeklyChange,
          sinceStart: physiqueSinceStartChange,
          sinceWorst: physiqueSinceWorstChange,
          sinceBest: physiqueSinceBestChange,
        })
      ),
      title: "Physique Rating",
    },
    {
      data: data?.map(
        ({
          bones,
          date,
          bonesWeeklyChange,
          bonesSinceStartChange,
          bonesSinceWorstChange,
          bonesSinceBestChange,
        }) => ({
          x: date,
          y: bones,
          weekly: bonesWeeklyChange,
          sinceStart: bonesSinceStartChange,
          sinceWorst: bonesSinceWorstChange,
          sinceBest: bonesSinceBestChange,
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
