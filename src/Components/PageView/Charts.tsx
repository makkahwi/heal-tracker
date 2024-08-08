import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { HorizontalGridLines, LineMarkSeries, VerticalGridLines, XAxis, XYPlot, YAxis } from "react-vis";

import { changeCalculationProps } from "../../Views/Auth/WeightReadings";

interface hoverProps {
  date?: string;
  title?: string;
  value?: number;
}

const AnalysisCharts = ({
  charts,
  initialHovered,
  data,
}: {
  charts: {
    data: {
      x: string;
      y: number;
      weekly: changeCalculationProps;
      sinceStart: changeCalculationProps;
    }[];
    title: string;
    unit?: string;
  }[];
  initialHovered: Function;
  data: any[];
}) => {
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
      {charts?.map(({ data, title, unit }, x) => {
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

export default AnalysisCharts;
