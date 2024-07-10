import {
  faArrowCircleDown,
  faArrowCircleUp,
  faCalendar,
  faCalendarDays,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";

import * as weightAPI from "../../API/weight";
import Form from "../../Components/Form";
import PageSection from "../../Components/PageSection";

export interface props {
  id?: string;
  date: string;
  weight: number;
  fat: number;
  water: number;
  waist: number;
  muscles: number;
  x: number;
  y: number;
}

const WeightReadings = () => {
  const [data, setData] = useState<props[]>([]);
  const [showData, setShowData] = useState({
    readings: [-1],
    weekly: [-1],
    sinceStart: [-1],
  });

  const getData = () =>
    weightAPI
      .getAll()
      .then((res: props[]) =>
        setData(res?.sort((a: props, b: props) => (a.date < b.date ? 1 : -1)))
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
      defaultValue: moment().format("yyyy-MM-DD"),
      required: true,
    },
    {
      name: "fat",
      label: "Fat Reading",
      type: "number",
      step: "0.1",
      required: true,
    },
    {
      name: "weight",
      label: "Weight",
      type: "number",
      step: "0.1",
      required: true,
    },
    {
      name: "water",
      label: "Water Reading",
      type: "number",
      step: "0.1",
      required: true,
    },
    {
      name: "waist",
      label: "Waist Fat Reading",
      type: "number",
      step: "0.1",
      required: true,
    },
    {
      name: "muscles",
      label: "Muscles Reading",
      type: "number",
      step: "0.1",
      required: true,
    },
    {
      name: "x",
      label: "X Reading",
      type: "number",
      step: "0.1",
      required: true,
    },
    {
      name: "y",
      label: "Y Reading",
      type: "number",
      step: "0.1",
      required: true,
    },
  ];

  const onSubmit = (values: props) => {
    console.log({ values });

    weightAPI.create(values).then(() => {
      getData();
    });
  };

  const onDelete = (id: string) =>
    weightAPI.remove(id).then(() => {
      getData();
    });

  const changeCalculator = (
    first: number,
    second: number,
    flip: boolean,
    unit?: string
  ) => {
    let icon = faArrowCircleUp;
    let color = flip ? "success" : "danger";

    if (first > second) {
      icon = faArrowCircleDown;
      color = flip ? "danger" : "success";
    }

    const changeAmount = parseFloat((second - first).toFixed(2));
    const changePercentage = ((changeAmount / first) * 100).toFixed(2);

    return (
      <span className={"text-" + color}>
        {changeAmount} {unit}
        <br />
        {changePercentage + "%"}
        <br />
        <FontAwesomeIcon icon={icon} />
      </span>
    );
  };

  return (
    <PageSection title="Weight Readings List">
      <Fragment>
        <Form inputs={formInputs} onSubmit={onSubmit} />

        <div className="d-none d-lg-block">
          <table className="table table-bordered table-responsive table-striped">
            <thead>
              <tr className="align-middle">
                <th colSpan={2}>Date</th>
                <th>Weight</th>
                <th>Fat Reading</th>
                <th>Fat Weight</th>
                <th>Water Reading</th>
                <th>Water Weight</th>
                <th>Waist Fat</th>
                <th>Muscles Reading</th>
                <th>Muscles Percentage</th>
                <th>X</th>
                <th>Y</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map(
                ({ id, date, weight, fat, water, waist, muscles, x, y }, i) => (
                  <Fragment key={i}>
                    <tr className="align-middle">
                      <td
                        rowSpan={
                          1 +
                          (showData.weekly.includes(i) ? 1 : 0) +
                          (showData.sinceStart.includes(i) ? 1 : 0)
                        }
                      >
                        {moment(date).format("ddd, D MMM YYYY")}
                      </td>
                      <td>Reading</td>
                      <td>{weight + " KG"}</td>
                      <td>{fat + "%"}</td>
                      <td>
                        {(Math.round(fat * weight) / 100).toFixed(2) + " KG"}
                      </td>
                      <td>{water + "%"}</td>
                      <td>
                        {(Math.round(water * weight) / 100).toFixed(2) + " KG"}
                      </td>
                      <td>{waist}</td>
                      <td>{muscles + " KG"}</td>
                      <td>
                        {Math.round((muscles / weight) * 100).toFixed(2) + "%"}
                      </td>
                      <td>{x}</td>
                      <td>{y}</td>
                      <td
                        rowSpan={
                          1 +
                          (showData.weekly.includes(i) ? 1 : 0) +
                          (showData.sinceStart.includes(i) ? 1 : 0)
                        }
                      >
                        {id && (
                          <FontAwesomeIcon
                            icon={faTrash}
                            role="button"
                            className="mx-1 text-danger"
                            onClick={() => onDelete(id)}
                          />
                        )}

                        {i < data.length - 1 ? (
                          <Fragment>
                            <FontAwesomeIcon
                              role="button"
                              onClick={() =>
                                !showData.weekly.includes(i)
                                  ? setShowData((current) => ({
                                      ...current,
                                      weekly: [...current.weekly, i],
                                    }))
                                  : setShowData((current) => ({
                                      ...current,
                                      weekly: current.weekly.filter(
                                        (idx) => idx !== i
                                      ),
                                    }))
                              }
                              icon={faCalendarDays}
                              className={
                                "me-1 text-" +
                                (!showData.weekly.includes(i)
                                  ? "success"
                                  : "danger")
                              }
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Weekly Change"
                            />

                            <FontAwesomeIcon
                              role="button"
                              onClick={() =>
                                !showData.sinceStart.includes(i)
                                  ? setShowData((current) => ({
                                      ...current,
                                      sinceStart: [...current.sinceStart, i],
                                    }))
                                  : setShowData((current) => ({
                                      ...current,
                                      sinceStart: current.sinceStart.filter(
                                        (idx) => idx !== i
                                      ),
                                    }))
                              }
                              icon={faCalendar}
                              className={
                                "me-1 text-" +
                                (!showData.sinceStart.includes(i)
                                  ? "success"
                                  : "danger")
                              }
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Since-Start Change"
                            />
                          </Fragment>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>

                    {showData.weekly.includes(i) ? (
                      <tr className="align-middle">
                        <td>
                          Weekly
                          <br />
                          Change
                        </td>
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                data[i + 1]?.weight,
                                weight,
                                false,
                                " KG"
                              )
                            : "-"}
                        </td>
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                data[i + 1]?.fat,
                                fat,
                                false,
                                "%"
                              )
                            : "-"}
                        </td>
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                parseFloat(
                                  (
                                    Math.round(
                                      data[i + 1]?.fat * data[i + 1]?.weight
                                    ) / 100
                                  ).toFixed(2)
                                ),
                                parseFloat(
                                  (Math.round(fat * weight) / 100).toFixed(2)
                                ),
                                false,
                                " KG"
                              )
                            : "-"}
                        </td>
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                data[i + 1]?.water,
                                water,
                                true,
                                "%"
                              )
                            : "-"}
                        </td>
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                parseFloat(
                                  (
                                    Math.round(
                                      data[i + 1]?.water * data[i + 1]?.weight
                                    ) / 100
                                  ).toFixed(2)
                                ),
                                parseFloat(
                                  (Math.round(water * weight) / 100).toFixed(2)
                                ),
                                true,
                                " KG"
                              )
                            : ""}
                        </td>
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(data[i + 1]?.waist, waist, false)
                            : "-"}
                        </td>
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                data[i + 1]?.muscles,
                                muscles,
                                true,
                                " KG"
                              )
                            : "-"}
                        </td>
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                parseFloat(
                                  Math.round(
                                    (data[i + 1]?.muscles /
                                      data[i + 1]?.weight) *
                                      100
                                  ).toFixed(2)
                                ),
                                parseFloat(
                                  Math.round((muscles / weight) * 100).toFixed(
                                    2
                                  )
                                ),
                                true,
                                "%"
                              )
                            : "-"}
                        </td>
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(data[i + 1]?.x, x, true)
                            : "-"}
                        </td>
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(data[i + 1]?.y, y, true)
                            : "-"}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}

                    {showData.sinceStart.includes(i) ? (
                      <tr className="align-middle">
                        <td>
                          Since-Start
                          <br />
                          Change
                        </td>
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                data[data.length - 1]?.weight,
                                weight,
                                false,
                                " KG"
                              )
                            : "-"}
                        </td>
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                data[data.length - 1]?.fat,
                                fat,
                                false,
                                "%"
                              )
                            : "-"}
                        </td>
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                parseFloat(
                                  (
                                    Math.round(
                                      data[data.length - 1]?.fat *
                                        data[data.length - 1]?.weight
                                    ) / 100
                                  ).toFixed(2)
                                ),
                                parseFloat(
                                  (Math.round(fat * weight) / 100).toFixed(2)
                                ),
                                false,
                                " KG"
                              )
                            : "-"}
                        </td>
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                data[data.length - 1]?.water,
                                water,
                                true,
                                "%"
                              )
                            : "-"}
                        </td>
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                parseFloat(
                                  (
                                    Math.round(
                                      data[data.length - 1]?.water *
                                        data[data.length - 1]?.weight
                                    ) / 100
                                  ).toFixed(2)
                                ),
                                parseFloat(
                                  (Math.round(water * weight) / 100).toFixed(2)
                                ),
                                true,
                                " KG"
                              )
                            : ""}
                        </td>
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                data[data.length - 1]?.waist,
                                waist,
                                false
                              )
                            : "-"}
                        </td>
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                data[data.length - 1]?.muscles,
                                muscles,
                                true,
                                " KG"
                              )
                            : "-"}
                        </td>
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                parseFloat(
                                  Math.round(
                                    (data[data.length - 1]?.muscles /
                                      data[data.length - 1]?.weight) *
                                      100
                                  ).toFixed(2)
                                ),
                                parseFloat(
                                  Math.round((muscles / weight) * 100).toFixed(
                                    2
                                  )
                                ),
                                true,
                                "%"
                              )
                            : "-"}
                        </td>
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                data[data.length - 1]?.x,
                                x,
                                true
                              )
                            : "-"}
                        </td>
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                data[data.length - 1]?.y,
                                y,
                                true
                              )
                            : "-"}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}
                  </Fragment>
                )
              )}
            </tbody>
          </table>
        </div>

        <div className="d-block d-lg-none">
          {data.map(
            ({ id, date, weight, fat, water, waist, muscles, x, y }, i) => (
              <div className="card p-3 py-4 my-4 w-100" key={x}>
                <table className="table table-bordered table-responsive table-striped">
                  <tbody>
                    <tr className="align-middle">
                      <th>Date</th>
                      <td>{moment(date).format("ddd, D MMM YYYY")}</td>

                      {showData.weekly.includes(i) ? (
                        <td>
                          Weekly
                          <br />
                          Change
                        </td>
                      ) : (
                        ""
                      )}

                      {showData.sinceStart.includes(i) ? (
                        <td>
                          Since-Start
                          <br />
                          Change
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>

                    <tr className="align-middle">
                      <th>Weight</th>
                      <td>{weight + " KG"}</td>

                      {showData.weekly.includes(i) ? (
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                data[i + 1]?.weight,
                                weight,
                                false,
                                " KG"
                              )
                            : "-"}
                        </td>
                      ) : (
                        ""
                      )}

                      {showData.sinceStart.includes(i) ? (
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                data[data.length - 1]?.weight,
                                weight,
                                false,
                                " KG"
                              )
                            : "-"}
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>

                    <tr className="align-middle">
                      <th>Fat Reading</th>
                      <td>{fat + "%"}</td>

                      {showData.weekly.includes(i) ? (
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                data[i + 1]?.fat,
                                fat,
                                false,
                                "%"
                              )
                            : "-"}
                        </td>
                      ) : (
                        ""
                      )}

                      {showData.sinceStart.includes(i) ? (
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                data[data.length - 1]?.fat,
                                fat,
                                false,
                                "%"
                              )
                            : "-"}
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>

                    <tr className="align-middle">
                      <th>Fat Weight</th>
                      <td>
                        {(Math.round(fat * weight) / 100).toFixed(2) + " KG"}
                      </td>

                      {showData.weekly.includes(i) ? (
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                parseFloat(
                                  (
                                    Math.round(
                                      data[i + 1]?.fat * data[i + 1]?.weight
                                    ) / 100
                                  ).toFixed(2)
                                ),
                                parseFloat(
                                  (Math.round(fat * weight) / 100).toFixed(2)
                                ),
                                false,
                                " KG"
                              )
                            : "-"}
                        </td>
                      ) : (
                        ""
                      )}

                      {showData.sinceStart.includes(i) ? (
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                parseFloat(
                                  (
                                    Math.round(
                                      data[data.length - 1]?.fat *
                                        data[data.length - 1]?.weight
                                    ) / 100
                                  ).toFixed(2)
                                ),
                                parseFloat(
                                  (Math.round(fat * weight) / 100).toFixed(2)
                                ),
                                false,
                                " KG"
                              )
                            : "-"}
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>

                    <tr className="align-middle">
                      <th>Water Reading</th>
                      <td>{water + "%"}</td>

                      {showData.weekly.includes(i) ? (
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                data[i + 1]?.water,
                                water,
                                true,
                                "%"
                              )
                            : "-"}
                        </td>
                      ) : (
                        ""
                      )}

                      {showData.sinceStart.includes(i) ? (
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                data[data.length - 1]?.water,
                                water,
                                true,
                                "%"
                              )
                            : "-"}
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>

                    <tr className="align-middle">
                      <th>Water Weight</th>
                      <td>
                        {(Math.round(water * weight) / 100).toFixed(2) + " KG"}
                      </td>

                      {showData.weekly.includes(i) ? (
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                parseFloat(
                                  (
                                    Math.round(
                                      data[i + 1]?.water * data[i + 1]?.weight
                                    ) / 100
                                  ).toFixed(2)
                                ),
                                parseFloat(
                                  (Math.round(water * weight) / 100).toFixed(2)
                                ),
                                true,
                                " KG"
                              )
                            : ""}
                        </td>
                      ) : (
                        ""
                      )}

                      {showData.sinceStart.includes(i) ? (
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                parseFloat(
                                  (
                                    Math.round(
                                      data[data.length - 1]?.water *
                                        data[data.length - 1]?.weight
                                    ) / 100
                                  ).toFixed(2)
                                ),
                                parseFloat(
                                  (Math.round(water * weight) / 100).toFixed(2)
                                ),
                                true,
                                " KG"
                              )
                            : ""}
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>

                    <tr className="align-middle">
                      <th>Waist Fat</th>
                      <td>{waist}</td>

                      {showData.weekly.includes(i) ? (
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(data[i + 1]?.waist, waist, false)
                            : "-"}
                        </td>
                      ) : (
                        ""
                      )}

                      {showData.sinceStart.includes(i) ? (
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                data[data.length - 1]?.waist,
                                waist,
                                false
                              )
                            : "-"}
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>

                    <tr className="align-middle">
                      <th>Muscles Reading</th>
                      <td>{muscles + " KG"}</td>

                      {showData.weekly.includes(i) ? (
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                data[i + 1]?.muscles,
                                muscles,
                                true,
                                " KG"
                              )
                            : "-"}
                        </td>
                      ) : (
                        ""
                      )}

                      {showData.sinceStart.includes(i) ? (
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                data[data.length - 1]?.muscles,
                                muscles,
                                true,
                                " KG"
                              )
                            : "-"}
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>

                    <tr className="align-middle">
                      <th>Muscles Percentage</th>
                      <td>
                        {Math.round((muscles / weight) * 100).toFixed(2) + "%"}
                      </td>

                      {showData.weekly.includes(i) ? (
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                parseFloat(
                                  Math.round(
                                    (data[i + 1]?.muscles /
                                      data[i + 1]?.weight) *
                                      100
                                  ).toFixed(2)
                                ),
                                parseFloat(
                                  Math.round((muscles / weight) * 100).toFixed(
                                    2
                                  )
                                ),
                                true,
                                "%"
                              )
                            : "-"}
                        </td>
                      ) : (
                        ""
                      )}

                      {showData.sinceStart.includes(i) ? (
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                parseFloat(
                                  Math.round(
                                    (data[data.length - 1]?.muscles /
                                      data[data.length - 1]?.weight) *
                                      100
                                  ).toFixed(2)
                                ),
                                parseFloat(
                                  Math.round((muscles / weight) * 100).toFixed(
                                    2
                                  )
                                ),
                                true,
                                "%"
                              )
                            : "-"}
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>

                    <tr className="align-middle">
                      <th>X</th>
                      <td>{x}</td>

                      {showData.weekly.includes(i) ? (
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(data[i + 1]?.x, x, true)
                            : "-"}
                        </td>
                      ) : (
                        ""
                      )}

                      {showData.sinceStart.includes(i) ? (
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                data[data.length - 1]?.x,
                                x,
                                true
                              )
                            : "-"}
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>

                    <tr className="align-middle">
                      <th>Y</th>
                      <td>{y}</td>

                      {showData.weekly.includes(i) ? (
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(data[i + 1]?.y, y, true)
                            : "-"}
                        </td>
                      ) : (
                        ""
                      )}

                      {showData.sinceStart.includes(i) ? (
                        <td>
                          {i < data.length - 1
                            ? changeCalculator(
                                data[data.length - 1]?.y,
                                y,
                                true
                              )
                            : "-"}
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>

                    <tr className="align-middle">
                      <th>Actions</th>
                      <td
                        colSpan={
                          1 +
                          (showData.weekly.includes(i) ? 1 : 0) +
                          (showData.sinceStart.includes(i) ? 1 : 0)
                        }
                      >
                        {id && (
                          <FontAwesomeIcon
                            icon={faTrash}
                            role="button"
                            className="mx-1 text-danger"
                            onClick={() => onDelete(id)}
                          />
                        )}

                        {i < data.length - 1 ? (
                          <Fragment>
                            <FontAwesomeIcon
                              role="button"
                              onClick={() =>
                                !showData.weekly.includes(i)
                                  ? setShowData((current) => ({
                                      ...current,
                                      weekly: [...current.weekly, i],
                                    }))
                                  : setShowData((current) => ({
                                      ...current,
                                      weekly: current.weekly.filter(
                                        (idx) => idx !== i
                                      ),
                                    }))
                              }
                              icon={faCalendarDays}
                              className={
                                "me-1 text-" +
                                (!showData.weekly.includes(i)
                                  ? "success"
                                  : "danger")
                              }
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Weekly Change"
                            />

                            <FontAwesomeIcon
                              role="button"
                              onClick={() =>
                                !showData.sinceStart.includes(i)
                                  ? setShowData((current) => ({
                                      ...current,
                                      sinceStart: [...current.sinceStart, i],
                                    }))
                                  : setShowData((current) => ({
                                      ...current,
                                      sinceStart: current.sinceStart.filter(
                                        (idx) => idx !== i
                                      ),
                                    }))
                              }
                              icon={faCalendar}
                              className={
                                "me-1 text-" +
                                (!showData.sinceStart.includes(i)
                                  ? "success"
                                  : "danger")
                              }
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Since-Start Change"
                            />
                          </Fragment>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      </Fragment>
    </PageSection>
  );
};

export default WeightReadings;
