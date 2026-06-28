import {
  faCircleDown,
  faCircleUp,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { getAverage } from "../../Utils/functions";
import { changeCalculationProps } from "../../Views/Auth/WeightReadings";

interface hoverProps {
  date?: string;
  title?: string;
  value?: number;
}

interface props {
  charts: {
    data: {
      x: string;
      y: number;
      weekly: changeCalculationProps;
      sinceStart: changeCalculationProps;
      sinceWorst: changeCalculationProps;
      sinceBest: changeCalculationProps;
    }[];
    minTarget?: number;
    maxTarget?: number;
    title: string;
    unit?: string;
  }[];
  initialHovered: Function;
  data: any[];
}

const AnalysisCharts = ({ charts, initialHovered, data }: props) => {
  const [hovered, setHovered] = useState<hoverProps[]>(initialHovered());
  const [show, setShow] = useState({
    data: data.map(() => true),
    average: data.map(() => false),
    changeAverage: data.map(() => false),
    targeted: data.map(() => false),
  });

  useEffect(() => {
    setHovered(initialHovered());
    setShow({
      data: data.map(() => true),
      average: data.map(() => false),
      changeAverage: data.map(() => false),
      targeted: data.map(() => false),
    });
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
      {charts?.map(({ data, title, unit, minTarget, maxTarget }, x) => {
        const rowData = hovered?.find((h) => h.title === title);
        const changes = data?.find(
          ({ x, y }) =>
            String(moment(x).format("DD MMM yyyy")) === rowData?.date &&
            parseFloat(String(y)) === rowData?.value,
        );

        const values =
          show.targeted[x] && minTarget && maxTarget
            ? [...data.map(({ y }) => y), minTarget, maxTarget]
            : data.map(({ y }) => y);

        const chartMin = Math.min.apply(Math, values);
        const chartMax = Math.max.apply(Math, values);
        const yPadding = Math.max((chartMax - chartMin) * 0.02, 0.5);
        const average = getAverage(data?.map(({ y }) => parseFloat(String(y))));
        const chartData = data.map((point) => ({
          ...point,
          dateLabel: moment(point.x).format("DD MMM yyyy"),
        }));

        return (
          <div className="col-md-6 col-lg-4 my-3 justify-center" key={x}>
            <table
              className="table table-responsive"
              style={{ color: colors[x % colors.length] }}
            >
              <tbody>
                <tr>
                  <td colSpan={4} className="text-center py-3 w-100">
                    <div className="w-100" style={{ height: 300 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={chartData}
                          margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
                          onMouseMove={(state: any) => {
                            const point = state?.activePayload?.[0]?.payload;
                            if (!point) {
                              return;
                            }

                            setHovered((current) =>
                              current.map((c) =>
                                c.title === title
                                  ? {
                                      date: point.dateLabel,
                                      value: parseFloat(String(point.y)),
                                      title,
                                    }
                                  : c,
                              ),
                            );
                          }}
                          onMouseLeave={() => setHovered(initialHovered())}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="x"
                            tickFormatter={(v) => moment(v).format("MMM YY")}
                          >
                            <Label
                              position="insideBottom"
                              offset={-5}
                              value="Date"
                            />
                          </XAxis>
                          <YAxis
                            domain={[chartMin - yPadding, chartMax + yPadding]}
                          >
                            <Label
                              value={
                                "Reading" + (unit ? " ( " + unit + " )" : "")
                              }
                              angle={-90}
                              position="insideLeft"
                              style={{ textAnchor: "middle" }}
                            />
                          </YAxis>
                          <Tooltip content={() => null} />

                          {show.data[x] && (
                            <Line
                              type="monotone"
                              dataKey="y"
                              stroke={colors[x % colors.length]}
                              strokeWidth={2}
                              dot={{ r: 3 }}
                              activeDot={{ r: 5 }}
                            />
                          )}

                          {show.average[x] && (
                            <ReferenceLine
                              y={average}
                              stroke="red"
                              strokeDasharray="4 4"
                            >
                              <Label
                                value={`Average (${average.toFixed(2)})`}
                                position="insideTopRight"
                                fill="red"
                                fontSize={11}
                              />
                            </ReferenceLine>
                          )}

                          {show.changeAverage[x] && (
                            <ReferenceLine
                              segment={[
                                { x: data[0]?.x, y: data[0]?.y },
                                {
                                  x: data[data.length - 1]?.x,
                                  y: data[data.length - 1]?.y,
                                },
                              ]}
                              stroke="skyblue"
                              strokeWidth={2}
                            >
                              <Label
                                value={`Change Avg ${
                                  data[0]?.y < data[data.length - 1]?.y
                                    ? "▼"
                                    : "▲"
                                } ${((data[0]?.y - data[data.length - 1]?.y) / data.length).toFixed(2)}`}
                                position="insideTopLeft"
                                fill="skyblue"
                                fontSize={11}
                              />
                            </ReferenceLine>
                          )}

                          {show.targeted[x] && minTarget !== undefined && (
                            <ReferenceLine
                              y={minTarget}
                              stroke="green"
                              strokeDasharray="4 4"
                            >
                              <Label
                                value={`${
                                  minTarget === maxTarget
                                    ? "Targeted Value"
                                    : "Targeted Min Value"
                                }: ${minTarget} ${unit || ""}`}
                                position="insideBottomLeft"
                                fill="green"
                                fontSize={10}
                              />
                            </ReferenceLine>
                          )}

                          {show.targeted[x] &&
                            maxTarget !== undefined &&
                            maxTarget !== minTarget && (
                              <ReferenceLine
                                y={maxTarget}
                                stroke="green"
                                strokeDasharray="4 4"
                              >
                                <Label
                                  value={`Targeted Max Value: ${maxTarget} ${unit || ""}`}
                                  position="insideTopLeft"
                                  fill="green"
                                  fontSize={10}
                                />
                              </ReferenceLine>
                            )}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </td>
                </tr>

                <tr>
                  <th colSpan={4}>
                    <div className="btn-group">
                      <button
                        className={
                          "btn btn-sm border border-warning btn-danger " +
                          (show.average[x] ? "active" : "")
                        }
                        onClick={() =>
                          setShow((current) => ({
                            ...current,
                            average: current.average.map((v, y) =>
                              y === x ? !v : v,
                            ),
                          }))
                        }
                      >
                        Average
                      </button>

                      <button
                        className={
                          "btn btn-sm border border-warning btn-info " +
                          (show.changeAverage[x] ? "active" : "")
                        }
                        onClick={() =>
                          setShow((current) => ({
                            ...current,
                            changeAverage: current.changeAverage.map((v, y) =>
                              y === x ? !v : v,
                            ),
                          }))
                        }
                      >
                        Change Average
                      </button>

                      {minTarget && maxTarget && (
                        <button
                          className={
                            "btn btn-sm border border-warning btn-success " +
                            (show.targeted[x] ? "active" : "")
                          }
                          onClick={() =>
                            setShow((current) => ({
                              ...current,
                              targeted: current.targeted.map((v, y) =>
                                y === x ? !v : v,
                              ),
                            }))
                          }
                        >
                          Targeted Value(s)
                        </button>
                      )}
                    </div>
                  </th>
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
                    <th>Week Change</th>
                    {changeUI(changes?.weekly)}
                  </tr>
                )}

                {changes?.sinceStart?.icon && (
                  <tr className="text-start">
                    <th>Since Start Change</th>
                    {changeUI(changes?.sinceStart)}
                  </tr>
                )}

                {changes?.sinceWorst?.icon && (
                  <tr className="text-start">
                    <th>Since Worst Point Change</th>
                    {changeUI(changes?.sinceWorst)}
                  </tr>
                )}

                {changes?.sinceBest?.icon && (
                  <tr className="text-start">
                    <th>Since Best Point Change</th>
                    {changeUI(changes?.sinceBest)}
                  </tr>
                )}

                <tr className="text-start">
                  <th>Best Point Reading</th>
                  {changeUI({
                    changeAmount: ["Weight", "Fat Weight", "Waist"].includes(
                      title,
                    )
                      ? chartMin
                      : chartMax,
                    unit,
                    color: (
                      ["Weight", "Fat Weight", "Waist"].includes(title)
                        ? chartMin < values[values.length - 1]
                        : chartMax > values[values.length - 1]
                    )
                      ? "success"
                      : "dark",
                    changePercentage: String(
                      Math.abs(
                        100 -
                          ((["Weight", "Fat Weight", "Waist"].includes(title)
                            ? chartMin
                            : chartMax) /
                            values[values.length - 1]) *
                            100,
                      ).toFixed(2),
                    ),
                    icon: (
                      ["Weight", "Fat Weight", "Waist"].includes(title)
                        ? chartMin < values[values.length - 1]
                        : chartMax > values[values.length - 1]
                    )
                      ? ["Weight", "Fat Weight", "Waist"].includes(title)
                        ? faCircleDown
                        : faCircleUp
                      : faMinusCircle,
                  })}
                </tr>

                <tr className="text-start">
                  <th>Start Point Reading</th>
                  {changeUI({
                    changeAmount: values[values.length - 1],
                    unit,
                    color: "dark",
                    changePercentage: "0.00",
                    icon: faMinusCircle,
                  })}
                </tr>

                <tr className="text-start">
                  <th>Worst Point Reading</th>
                  {changeUI({
                    changeAmount: ["Weight", "Fat Weight", "Waist"].includes(
                      title,
                    )
                      ? chartMax
                      : chartMin,
                    unit,
                    color: (
                      ["Weight", "Fat Weight", "Waist"].includes(title)
                        ? chartMax > values[values.length - 1]
                        : chartMin < values[values.length - 1]
                    )
                      ? "danger"
                      : "dark",
                    changePercentage: String(
                      (
                        100 -
                        ((["Weight", "Fat Weight", "Waist"].includes(title)
                          ? chartMax
                          : chartMin) /
                          values[values.length - 1]) *
                          100
                      ).toFixed(2),
                    ),
                    icon: (
                      ["Weight", "Fat Weight", "Waist"].includes(title)
                        ? chartMax > values[values.length - 1]
                        : chartMin < values[values.length - 1]
                    )
                      ? ["Weight", "Fat Weight", "Waist"].includes(title)
                        ? faCircleUp
                        : faCircleDown
                      : faMinusCircle,
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default AnalysisCharts;
