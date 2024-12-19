import moment from "moment";
import { useTranslation } from "react-i18next";
import { fullWeightReadingProps } from ".";
import AnalysisCharts from "../../../Components/PageView/Charts";

const WeightReadingCharts = ({ data }: { data: fullWeightReadingProps[] }) => {
  const { t } = useTranslation();

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
      minTarget: data[0]?.weightMin,
      maxTarget: data[0]?.weightMax,
      title: "Weight",
      unit: t("Common.Labels.KG"),
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
      minTarget: data[0]?.musclesMin,
      maxTarget: data[0]?.musclesMax,
      unit: t("Common.Labels.KG"),
    },
    {
      data: data?.map(
        ({
          date,
          musclesPercentage,
          musclesPercentageWeeklyChange,
          musclesPercentageSinceStartChange,
          musclesPercentageSinceWorstChange,
          musclesPercentageSinceBestChange,
        }) => ({
          x: date,
          y: parseFloat(String(musclesPercentage)),
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
    //   unit: t("Common.Labels.KG"),
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
      minTarget: data[0]?.waterMin,
      maxTarget: data[0]?.waterMax,
      title: "Water Volume",
      unit: t("Common.Labels.Litre"),
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
      minTarget: data[0]?.fatMin,
      maxTarget: data[0]?.fatMax,
      title: "Fat Weight",
      unit: t("Common.Labels.KG"),
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
      minTarget: data[0]?.waistMin,
      maxTarget: data[0]?.waistMax,
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
