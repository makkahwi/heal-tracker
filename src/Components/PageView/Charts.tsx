import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment, { max } from "moment";
import { Fragment, useEffect, useState } from "react";
import {
  AreaSeries,
  Hint,
  HorizontalGridLines,
  LineMarkSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from "react-vis";

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
            parseFloat(String(y)) === rowData?.value
        );

        const values =
          show.targeted[x] && minTarget && maxTarget
            ? [...data.map(({ y }) => y), minTarget, maxTarget]
            : data.map(({ y }) => y);

        const chartMin = Math.min.apply(Math, values);
        const chartMax = Math.max.apply(Math, values);
        const average = getAverage(data?.map(({ y }) => parseFloat(String(y))));

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
                      yDomain={[
                        chartMin - chartMin * 0.025,
                        chartMax + chartMax * 0.025,
                      ]}
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

                      {/* Values Average */}
                      {show.average[x] && (
                        <LineMarkSeries
                          data={[
                            {
                              x: moment(data[0]?.x).valueOf(),
                              y: average,
                            },
                            {
                              x: moment(data[data?.length - 1]?.x).valueOf(),
                              y: average,
                            },
                          ]}
                          // opacity={0.5}
                          color="red"
                        />
                      )}

                      {show.average[x] && (
                        <Hint
                          value={{
                            x: moment(data[data?.length - 1]?.x).valueOf(),
                            y: average,
                          }}
                          style={{
                            fontSize: 12,
                            value: {
                              color: "red",
                            },
                            // opacity={0.5}
                          }}
                        >
                          <div className="card bg-danger text-white p-1">
                            Average ({average.toFixed(2)})
                          </div>
                        </Hint>
                      )}

                      {/* Change Average */}
                      {show.changeAverage[x] && (
                        <LineMarkSeries
                          data={[
                            {
                              x: moment(data[0]?.x).valueOf(),
                              y: data[0]?.y,
                            },
                            {
                              x: moment(data[data.length - 1]?.x).valueOf(),
                              y: data[data.length - 1]?.y,
                            },
                          ]}
                          color="skyblue"
                          // opacity={0.5}
                        />
                      )}
                      {show.changeAverage[x] && (
                        <Hint
                          value={{
                            x: moment(data[0]?.x).valueOf(),
                            y: data[0]?.y,
                          }}
                          style={{
                            fontSize: 12,
                            value: {
                              color: "skyblue",
                            },
                            // opacity: 0.5,
                          }}
                        >
                          <div className="card bg-info text-white p-1">
                            Change Average
                            <span>
                              <FontAwesomeIcon
                                icon={
                                  data[0]?.y < data[data.length - 1]?.y
                                    ? faArrowDown
                                    : faArrowUp
                                }
                                className="me-1"
                              />
                              {(
                                (data[0]?.y - data[data.length - 1]?.y) /
                                data.length
                              ).toFixed(2)}
                            </span>
                          </div>
                        </Hint>
                      )}

                      {/* Targeted */}
                      {show.targeted[x] && minTarget && (
                        <Hint
                          value={{
                            x:
                              moment(data[data.length - 1]?.x).valueOf() + 2000,
                            y: minTarget,
                          }}
                        >
                          <small
                            className="bg-success text-white p-2"
                            style={{ fontSize: 10 }}
                          >
                            {minTarget === maxTarget
                              ? "Targeted Value"
                              : "Targeted Min Value"}
                            {": "}
                            {minTarget} {unit}
                          </small>
                        </Hint>
                      )}

                      {show.targeted[x] && maxTarget && (
                        <Hint
                          value={{
                            x:
                              moment(data[data.length - 1]?.x).valueOf() + 2000,
                            y: maxTarget,
                          }}
                        >
                          <small
                            className="bg-success text-white p-2"
                            style={{ fontSize: 10 }}
                          >
                            {minTarget === maxTarget
                              ? "Targeted Value"
                              : "Targeted Max Value"}
                            {": "}
                            {maxTarget} {unit}
                          </small>
                        </Hint>
                      )}

                      {show.targeted[x] && minTarget && (
                        <LineMarkSeries
                          color="green"
                          data={[
                            {
                              x: moment(data[0]?.x).valueOf(),
                              y: minTarget,
                            },
                            {
                              x: moment(data[data.length - 1]?.x).valueOf(),
                              y: minTarget,
                            },
                          ]}
                        />
                      )}

                      {show.targeted[x] && maxTarget && (
                        <LineMarkSeries
                          color="green"
                          data={[
                            {
                              x: moment(data[0]?.x).valueOf(),
                              y: maxTarget,
                            },
                            {
                              x: moment(data[data.length - 1]?.x).valueOf(),
                              y: maxTarget,
                            },
                          ]}
                        />
                      )}
                    </XYPlot>
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
                              y === x ? !v : v
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
                              y === x ? !v : v
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
                                y === x ? !v : v
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
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default AnalysisCharts;
