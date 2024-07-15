import { faArrowCircleDown, faArrowCircleUp, faCalendar, faCalendarDays, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Fragment, ReactNode, useEffect, useState } from "react";

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

const WeightReadings = () => {
  const [data, setData] = useState<fullProps[]>([]);
  const [showData, setShowData] = useState({
    readings: [-1],
    weekly: [-1],
    sinceStart: [-1],
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

  const getData = () =>
    weightAPI.getAll().then((res: props[]) => {
      const sortedRes = res?.sort((a: props, b: props) =>
        a.date < b.date ? 1 : -1
      );

      setData(
        sortedRes.map(
          (
            { id, date, weight, fat, water, waist, muscles, physique, bones },
            i
          ) => ({
            id,
            date,
            weight,
            fat,
            water,
            waist,
            muscles,
            physique,
            bones,
            fatWeight: (Math.round(fat * weight) / 100).toFixed(2) + " KG",
            waterWeight: (Math.round(water * weight) / 100).toFixed(2) + " KG",
            musclesPercentage:
              Math.round((muscles / weight) * 100).toFixed(2) + "%",
            weightWeeklyChange:
              i < sortedRes.length - 1
                ? changeCalculator(
                    sortedRes[i + 1]?.weight,
                    weight,
                    false,
                    " KG"
                  )
                : "-",
            fatWeeklyChange:
              i < sortedRes.length - 1
                ? changeCalculator(sortedRes[i + 1]?.fat, fat, false, "%")
                : "-",
            fatWeightWeeklyChange:
              i < sortedRes.length - 1
                ? changeCalculator(
                    parseFloat(
                      (
                        Math.round(
                          sortedRes[i + 1]?.fat * sortedRes[i + 1]?.weight
                        ) / 100
                      ).toFixed(2)
                    ),
                    parseFloat((Math.round(fat * weight) / 100).toFixed(2)),
                    false,
                    " KG"
                  )
                : "-",
            waterWeeklyChange:
              i < sortedRes.length - 1
                ? changeCalculator(sortedRes[i + 1]?.water, water, true, "%")
                : "-",
            waterWeightWeeklyChange:
              i < sortedRes.length - 1
                ? changeCalculator(
                    parseFloat(
                      (
                        Math.round(
                          sortedRes[i + 1]?.water * sortedRes[i + 1]?.weight
                        ) / 100
                      ).toFixed(2)
                    ),
                    parseFloat((Math.round(water * weight) / 100).toFixed(2)),
                    true,
                    " KG"
                  )
                : "-",
            waistWeeklyChange:
              i < sortedRes.length - 1
                ? changeCalculator(sortedRes[i + 1]?.waist, waist, false)
                : "-",
            musclesWeeklyChange:
              i < sortedRes.length - 1
                ? changeCalculator(
                    sortedRes[i + 1]?.muscles,
                    muscles,
                    true,
                    " KG"
                  )
                : "-",
            musclesPercentageWeeklyChange:
              i < sortedRes.length - 1
                ? changeCalculator(
                    parseFloat(
                      Math.round(
                        (sortedRes[i + 1]?.muscles / sortedRes[i + 1]?.weight) *
                          100
                      ).toFixed(2)
                    ),
                    parseFloat(Math.round((muscles / weight) * 100).toFixed(2)),
                    true,
                    "%"
                  )
                : "-",
            physiqueWeeklyChange:
              i < sortedRes.length - 1
                ? changeCalculator(sortedRes[i + 1]?.physique, physique, true)
                : "-",
            bonesWeeklyChange:
              i < sortedRes.length - 1
                ? changeCalculator(sortedRes[i + 1]?.bones, bones, true)
                : "-",
            weightSinceStartChange:
              i < sortedRes.length - 2
                ? changeCalculator(
                    sortedRes[sortedRes.length - 1]?.weight,
                    weight,
                    false,
                    " KG"
                  )
                : "-",
            fatSinceStartChange:
              i < sortedRes.length - 2
                ? changeCalculator(
                    sortedRes[sortedRes.length - 1]?.fat,
                    fat,
                    false,
                    "%"
                  )
                : "-",
            fatWeightSinceStartChange:
              i < sortedRes.length - 2
                ? changeCalculator(
                    parseFloat(
                      (
                        Math.round(
                          sortedRes[sortedRes.length - 1]?.fat *
                            sortedRes[sortedRes.length - 1]?.weight
                        ) / 100
                      ).toFixed(2)
                    ),
                    parseFloat((Math.round(fat * weight) / 100).toFixed(2)),
                    false,
                    " KG"
                  )
                : "-",
            waterSinceStartChange:
              i < sortedRes.length - 2
                ? changeCalculator(
                    sortedRes[sortedRes.length - 1]?.water,
                    water,
                    true,
                    "%"
                  )
                : "-",
            waterWeightSinceStartChange:
              i < sortedRes.length - 2
                ? changeCalculator(
                    parseFloat(
                      (
                        Math.round(
                          sortedRes[sortedRes.length - 1]?.water *
                            sortedRes[sortedRes.length - 1]?.weight
                        ) / 100
                      ).toFixed(2)
                    ),
                    parseFloat((Math.round(water * weight) / 100).toFixed(2)),
                    true,
                    " KG"
                  )
                : "-",
            waistSinceStartChange:
              i < sortedRes.length - 2
                ? changeCalculator(
                    sortedRes[sortedRes.length - 1]?.waist,
                    waist,
                    false
                  )
                : "-",
            musclesSinceStartChange:
              i < sortedRes.length - 2
                ? changeCalculator(
                    sortedRes[sortedRes.length - 1]?.muscles,
                    muscles,
                    true,
                    " KG"
                  )
                : "-",
            musclesPercentageSinceStartChange:
              i < sortedRes.length - 2
                ? changeCalculator(
                    parseFloat(
                      Math.round(
                        (sortedRes[sortedRes.length - 1]?.muscles /
                          sortedRes[sortedRes.length - 1]?.weight) *
                          100
                      ).toFixed(2)
                    ),
                    parseFloat(Math.round((muscles / weight) * 100).toFixed(2)),
                    true,
                    "%"
                  )
                : "-",
            physiqueSinceStartChange:
              i < sortedRes.length - 2
                ? changeCalculator(
                    sortedRes[sortedRes.length - 1]?.physique,
                    physique,
                    true
                  )
                : "-",
            bonesSinceStartChange:
              i < sortedRes.length - 2
                ? changeCalculator(
                    sortedRes[sortedRes.length - 1]?.bones,
                    bones,
                    true
                  )
                : "-",
          })
        )
      );
    });

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
      name: "physique",
      label: "Physique Rating",
      type: "number",
      step: "0.1",
      required: true,
    },
    {
      name: "bones",
      label: "Bones Mass",
      type: "number",
      step: "0.1",
      required: true,
    },
  ];

  const onSubmit = (values: props) => {
    weightAPI.create(values).then(() => {
      getData();
    });
  };

  const onDelete = (id: string) =>
    weightAPI.remove(id).then(() => {
      getData();
    });

  return (
    <PageSection title="Weight Readings List">
      <Fragment>
        <Form inputs={formInputs} onSubmit={onSubmit} />

        <div className="d-none d-xl-block">
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
                <th>Physique Rating</th>
                <th>Bones Mass</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map(
                (
                  {
                    id,
                    date,
                    weight,
                    fat,
                    water,
                    waist,
                    muscles,
                    fatWeight,
                    waterWeight,
                    musclesPercentage,
                    weightWeeklyChange,
                    fatWeeklyChange,
                    fatWeightWeeklyChange,
                    waterWeeklyChange,
                    waterWeightWeeklyChange,
                    waistWeeklyChange,
                    musclesWeeklyChange,
                    musclesPercentageWeeklyChange,
                    physiqueWeeklyChange,
                    bonesWeeklyChange,
                    weightSinceStartChange,
                    fatSinceStartChange,
                    fatWeightSinceStartChange,
                    waterSinceStartChange,
                    waterWeightSinceStartChange,
                    waistSinceStartChange,
                    musclesSinceStartChange,
                    musclesPercentageSinceStartChange,
                    physiqueSinceStartChange,
                    bonesSinceStartChange,
                    physique,
                    bones,
                  },
                  i
                ) => (
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
                      <td>{fatWeight}</td>
                      <td>{water + "%"}</td>
                      <td>{waterWeight}</td>
                      <td>{waist}</td>
                      <td>{muscles + " KG"}</td>
                      <td>{musclesPercentage}</td>
                      <td>{physique}</td>
                      <td>{bones}</td>
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

                            {i < data.length - 2 ? (
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
                            ) : (
                              ""
                            )}
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
                        <td>{weightWeeklyChange}</td>
                        <td>{fatWeeklyChange}</td>
                        <td>{fatWeightWeeklyChange}</td>
                        <td>{waterWeeklyChange}</td>
                        <td>{waterWeightWeeklyChange}</td>
                        <td>{waistWeeklyChange}</td>
                        <td>{musclesWeeklyChange}</td>
                        <td>{musclesPercentageWeeklyChange}</td>
                        <td>{physiqueWeeklyChange}</td>
                        <td>{bonesWeeklyChange}</td>
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
                        <td>{weightSinceStartChange}</td>
                        <td>{fatSinceStartChange}</td>
                        <td>{fatWeightSinceStartChange}</td>
                        <td>{waterSinceStartChange}</td>
                        <td>{waterWeightSinceStartChange}</td>
                        <td>{waistSinceStartChange}</td>
                        <td>{musclesSinceStartChange}</td>
                        <td>{musclesPercentageSinceStartChange}</td>
                        <td>{physiqueSinceStartChange}</td>
                        <td>{bonesSinceStartChange}</td>
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

        <div className="d-block d-xl-none">
          {data.map(
            (
              {
                id,
                date,
                weight,
                fat,
                water,
                waist,
                muscles,
                fatWeight,
                waterWeight,
                musclesPercentage,
                weightWeeklyChange,
                fatWeeklyChange,
                fatWeightWeeklyChange,
                waterWeeklyChange,
                waterWeightWeeklyChange,
                waistWeeklyChange,
                musclesWeeklyChange,
                musclesPercentageWeeklyChange,
                physiqueWeeklyChange,
                bonesWeeklyChange,
                weightSinceStartChange,
                fatSinceStartChange,
                fatWeightSinceStartChange,
                waterSinceStartChange,
                waterWeightSinceStartChange,
                waistSinceStartChange,
                musclesSinceStartChange,
                musclesPercentageSinceStartChange,
                physiqueSinceStartChange,
                bonesSinceStartChange,
                physique,
                bones,
              },
              i
            ) => (
              <div className="card p-3 py-4 my-4 w-100" key={i}>
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
                        <td>{weightWeeklyChange}</td>
                      ) : (
                        ""
                      )}

                      {showData.sinceStart.includes(i) ? (
                        <td>{weightSinceStartChange}</td>
                      ) : (
                        ""
                      )}
                    </tr>

                    <tr className="align-middle">
                      <th>Fat Reading</th>
                      <td>{fat + "%"}</td>

                      {showData.weekly.includes(i) ? (
                        <td>{fatWeeklyChange}</td>
                      ) : (
                        ""
                      )}

                      {showData.sinceStart.includes(i) ? (
                        <td>{fatSinceStartChange}</td>
                      ) : (
                        ""
                      )}
                    </tr>

                    <tr className="align-middle">
                      <th>Fat Weight</th>
                      <td>{fatWeight}</td>

                      {showData.weekly.includes(i) ? (
                        <td>{fatWeightWeeklyChange}</td>
                      ) : (
                        ""
                      )}

                      {showData.sinceStart.includes(i) ? (
                        <td>{fatWeightSinceStartChange}</td>
                      ) : (
                        ""
                      )}
                    </tr>

                    <tr className="align-middle">
                      <th>Water Reading</th>
                      <td>{water + "%"}</td>

                      {showData.weekly.includes(i) ? (
                        <td>{waterWeeklyChange}</td>
                      ) : (
                        ""
                      )}

                      {showData.sinceStart.includes(i) ? (
                        <td>{waterSinceStartChange}</td>
                      ) : (
                        ""
                      )}
                    </tr>

                    <tr className="align-middle">
                      <th>Water Weight</th>
                      <td>{waterWeight}</td>

                      {showData.weekly.includes(i) ? (
                        <td>{waterWeightWeeklyChange}</td>
                      ) : (
                        ""
                      )}

                      {showData.sinceStart.includes(i) ? (
                        <td>{waterWeightSinceStartChange}</td>
                      ) : (
                        ""
                      )}
                    </tr>

                    <tr className="align-middle">
                      <th>Waist Fat</th>
                      <td>{waist}</td>

                      {showData.weekly.includes(i) ? (
                        <td>{waistWeeklyChange}</td>
                      ) : (
                        ""
                      )}

                      {showData.sinceStart.includes(i) ? (
                        <td>{waistSinceStartChange}</td>
                      ) : (
                        ""
                      )}
                    </tr>

                    <tr className="align-middle">
                      <th>Muscles Reading</th>
                      <td>{muscles + " KG"}</td>

                      {showData.weekly.includes(i) ? (
                        <td>{musclesWeeklyChange}</td>
                      ) : (
                        ""
                      )}

                      {showData.sinceStart.includes(i) ? (
                        <td>{musclesSinceStartChange}</td>
                      ) : (
                        ""
                      )}
                    </tr>

                    <tr className="align-middle">
                      <th>Muscles Percentage</th>
                      <td>{musclesPercentage}</td>

                      {showData.weekly.includes(i) ? (
                        <td>{musclesPercentageWeeklyChange}</td>
                      ) : (
                        ""
                      )}

                      {showData.sinceStart.includes(i) ? (
                        <td>{musclesPercentageSinceStartChange}</td>
                      ) : (
                        ""
                      )}
                    </tr>

                    <tr className="align-middle">
                      <th>X</th>
                      <td>{physique}</td>

                      {showData.weekly.includes(i) ? (
                        <td>{physiqueWeeklyChange}</td>
                      ) : (
                        ""
                      )}

                      {showData.sinceStart.includes(i) ? (
                        <td>{physiqueSinceStartChange}</td>
                      ) : (
                        ""
                      )}
                    </tr>

                    <tr className="align-middle">
                      <th>Y</th>
                      <td>{bones}</td>

                      {showData.weekly.includes(i) ? (
                        <td>{bonesWeeklyChange}</td>
                      ) : (
                        ""
                      )}

                      {showData.sinceStart.includes(i) ? (
                        <td>{bonesSinceStartChange}</td>
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

                            {i < data.length - 2 ? (
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
                            ) : (
                              ""
                            )}
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
