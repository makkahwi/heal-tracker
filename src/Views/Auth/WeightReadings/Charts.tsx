import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import {
  HorizontalGridLines,
  LineMarkSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from "react-vis";

import { changeCalculationProps, fullWeightReadingProps } from ".";

interface hoverProps {
  date?: string;
  title?: string;
  value?: number;
}

const WeightReadingCharts = ({ data }: { data: fullWeightReadingProps[] }) => {
  const chart = [
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
    chart?.map(({ data, title }) => {
      const row = data[0];

      return {
        date: String(moment(row?.x).format("DD MMM yyyy")),
        value: parseFloat(String(row?.y)),
        title,
      };
    });

  const [hovered, setHovered] = useState<hoverProps[]>(initialHovered());

  useEffect(() => {
    setHovered(initialHovered());
  }, [data]);

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

  const changeUI = (data?: changeCalculationProps) => (
    <Fragment>
      <td className={"text-" + data?.color}>
        {data?.changeAmount} {data?.unit}
      </td>

      <td className={"text-" + data?.color}>{data?.changePercentage}%</td>

      <td className={"text-" + data?.color}>
        <FontAwesomeIcon icon={data?.icon} />
      </td>
    </Fragment>
  );

  return (
    <div className="row">
      {chart?.map(({ data, title, unit }, x) => {
        const rowData = hovered?.find((h) => h.title === title);
        const changes = data?.find(
          ({ x, y }) =>
            String(moment(x).format("DD MMM yyyy")) === rowData?.date &&
            parseFloat(String(y)) === rowData?.value
        );

        const values = data.map(({ y }) => y);
        const min = Math.min.apply(Math, values);
        const max = Math.max.apply(Math, values);

        return (
          <div className="col-md-6 col-lg-4 my-3 justify-center" key={x}>
            <table
              className="table table-responsive"
              style={{ color: colors[x % colors.length] }}
            >
              <tbody>
                <tr>
                  <td colSpan={4} className="text-center py-3">
                    <XYPlot
                      xType="time"
                      width={300}
                      height={300}
                      yDomain={[min - min * 0.025, max + max * 0.025]}
                    >
                      <VerticalGridLines />
                      <HorizontalGridLines />
                      <XAxis title="Date" />
                      <YAxis
                        title={"Reading" + (unit ? " ( " + unit + " )" : "")}
                      />
                      <LineMarkSeries
                        data={data?.map(({ x, y }) => ({
                          x: moment(x).valueOf(),
                          y,
                        }))}
                        color={colors[x % colors.length]}
                        onValueMouseOver={(v) =>
                          setHovered((current) =>
                            current.map((c) =>
                              c.title === title
                                ? {
                                    date: String(
                                      moment(v.x).format("DD MMM yyyy")
                                    ),
                                    value: parseFloat(String(v.y)),
                                    title,
                                  }
                                : c
                            )
                          )
                        }
                        onValueMouseOut={() => setHovered(initialHovered())}
                      />
                    </XYPlot>
                  </td>
                </tr>

                <tr>
                  <th colSpan={4}>
                    {title} @{" "}
                    <span className="text-decoration-underline">
                      {rowData?.date}
                    </span>
                  </th>
                </tr>

                <tr>
                  <th colSpan={4}>
                    <h4>
                      {rowData?.value} {unit}
                    </h4>
                  </th>
                </tr>

                {changes?.weekly?.icon && (
                  <tr className="text-start">
                    <th>Weekly Change</th>
                    {changeUI(changes?.weekly)}
                  </tr>
                )}

                {changes?.sinceStart?.icon && (
                  <tr className="text-start">
                    <th>Since Start Change</th>
                    {changeUI(changes?.sinceStart)}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default WeightReadingCharts;
