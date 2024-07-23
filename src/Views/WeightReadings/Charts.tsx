import moment from "moment";
import { ReactNode, useState } from "react";
import {
  HorizontalGridLines,
  LineMarkSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from "react-vis";

export interface props {
  id?: string;
  date: string;
  weight: number;
  fat: number;
  water: number;
  waist: number;
  muscles: number;
  physique: number;
  bones: number;
}

interface calculationsProps {
  fatWeight: string;
  waterWeight: string;
  musclesPercentage: string;

  weightWeeklyChange: ReactNode;
  fatWeeklyChange: ReactNode;
  fatWeightWeeklyChange: ReactNode;
  waterWeeklyChange: ReactNode;
  waterWeightWeeklyChange: ReactNode;
  waistWeeklyChange: ReactNode;
  musclesWeeklyChange: ReactNode;
  musclesPercentageWeeklyChange: ReactNode;
  physiqueWeeklyChange: ReactNode;
  bonesWeeklyChange: ReactNode;

  weightSinceStartChange: ReactNode;
  fatSinceStartChange: ReactNode;
  fatWeightSinceStartChange: ReactNode;
  waterSinceStartChange: ReactNode;
  waterWeightSinceStartChange: ReactNode;
  waistSinceStartChange: ReactNode;
  musclesSinceStartChange: ReactNode;
  musclesPercentageSinceStartChange: ReactNode;
  physiqueSinceStartChange: ReactNode;
  bonesSinceStartChange: ReactNode;
}

type fullProps = props & calculationsProps;

const WeightReadingCharts = ({ data }: { data: fullProps[] }) => {
  const [hovered, setHovered] = useState<{
    date?: string;
    title?: string;
    value?: number;
  }>({});

  const chart = [
    {
      data: data.map(({ weight, date }) => ({ x: date, y: weight })),
      title: "Weight",
    },
    {
      data: data.map(({ fat, date }) => ({
        x: date,
        y: fat,
      })),
      title: "Fat",
    },
    {
      data: data.map(({ fatWeight, date }) => ({
        x: date,
        y: parseFloat(fatWeight),
      })),
      title: "Fat Weight",
    },
    {
      data: data.map(({ water, date }) => ({
        x: date,
        y: water,
      })),
      title: "Water",
    },
    {
      data: data.map(({ waterWeight, date }) => ({
        x: date,
        y: parseFloat(waterWeight),
      })),
      title: "Water Weight",
    },
    {
      data: data.map(({ waist, date }) => ({
        x: date,
        y: waist,
      })),
      title: "Waist",
    },
    {
      data: data.map(({ muscles, date }) => ({
        x: date,
        y: muscles,
      })),
      title: "Muscles",
    },
    {
      data: data.map(({ musclesPercentage, date }) => ({
        x: date,
        y: parseFloat(musclesPercentage),
      })),
      title: "Muscles Percentage",
    },
    {
      data: data.map(({ physique, date }) => ({
        x: date,
        y: physique,
      })),
      title: "Physique",
    },
    {
      data: data.map(({ bones, date }) => ({
        x: date,
        y: bones,
      })),
      title: "Bones",
    },
  ];

  const colors = [
    "#184e77",
    "#1e6091",
    "#1a759f",
    "#168aad",
    "#34a0a4",
    "#52b69a",
    "#76c893",
    "#99d98c",
  ];

  return (
    <div className="row">
      {chart.map(({ data, title }, x) => (
        <div className="col-md-6 col-lg-4 col-xl-3 my-3 justify-center" key={x}>
          <XYPlot xType="time" width={300} height={300}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title="Date" />
            <YAxis title="Reading" />
            <LineMarkSeries
              data={data.map(({ x, y }) => ({ x: moment(x).valueOf(), y }))}
              color={colors[x % colors.length]}
              onValueMouseOver={(v) =>
                setHovered({
                  date: String(moment(v.x).format("DD MMM yyyy")),
                  value: parseFloat(String(v.y)),
                  title,
                })
              }
              onValueMouseOut={() => setHovered({})}
            />
          </XYPlot>

          <div style={{ color: colors[x % colors.length] }}>
            {hovered?.title === title && (
              <label>
                {hovered?.date} | {hovered?.value} |
              </label>
            )}{" "}
            {title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeightReadingCharts;
