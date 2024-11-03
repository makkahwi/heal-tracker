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
          date,
          muscles,
          musclesWeeklyChange,
          musclesSinceStartChange,
          musclesSinceWorstChange,
          musclesSinceBestChange,
        }) => ({
          x: date,
          y: parseFloat(String(muscles)),
          weekly: musclesWeeklyChange,
          sinceStart: musclesSinceStartChange,
          sinceWorst: musclesSinceWorstChange,
          sinceBest: musclesSinceBestChange,
        })
      ),
      title: "Muscles Weight",
      unit: "KG",
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
      title: "Water Volume",
      unit: "L",
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
