import { faCalendar, faCalendarDays, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, ReactNode, useState } from "react";

import { dayDateFormat } from "../../Utils/consts";

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

const WeightReadingsTable = ({
  data,
  onDelete,
}: {
  data: fullProps[];
  onDelete: Function;
}) => {
  const [showData, setShowData] = useState({
    readings: [-1],
    weekly: [-1],
    sinceStart: [-1],
  });

  return (
    <Fragment>
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
                      {dayDateFormat(date)}
                    </td>
                    <td>Reading</td>
                    <td>{weight}</td>
                    <td>{fat}</td>
                    <td>{fatWeight}</td>
                    <td>{water}</td>
                    <td>{waterWeight}</td>
                    <td>{waist}</td>
                    <td>{muscles}</td>
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
                    <td>{dayDateFormat(date)}</td>

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
                    <td>{weight}</td>

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
                    <td>{fat}</td>

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
                    <td>{water}</td>

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
                    <td>{muscles}</td>

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
                    <th>Physique Rating</th>
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
                    <th>Bones Mass</th>
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
  );
};

export default WeightReadingsTable;
