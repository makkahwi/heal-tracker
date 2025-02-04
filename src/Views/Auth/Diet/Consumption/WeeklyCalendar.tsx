import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment, { Moment } from "moment";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { consumptionFullProps } from ".";
import MealView from "../../../../Components/MealView";

const WeeklyCalendar = ({
  data,
  onDelete,
}: {
  data: consumptionFullProps[];
  onDelete: Function;
}) => {
  const { t } = useTranslation();

  const [currentWeek, setCurrentWeek] = useState<Moment[]>([]);
  const [currentDate, setCurrentDate] = useState<Moment>(moment());
  const [currentWeekData, setCurrentWeekData] = useState<
    consumptionFullProps[]
  >([]);

  useEffect(() => {
    generateCurrentWeek(currentDate);
  }, [currentDate]);

  useEffect(() => {
    setCurrentWeekData(
      data?.filter(({ timestamp }) =>
        moment(timestamp).isBetween(
          moment(currentWeek[0]),
          moment(currentWeek[6]).add(1, "day"),
          undefined,
          "[]"
        )
      )
    );
  }, [currentWeek, data]);

  const generateCurrentWeek = (date: Moment) => {
    // Adjust to get the previous or current Saturday
    const startOfWeek = date.clone().startOf("week").isoWeekday(6);
    const days: Moment[] = [];

    for (let i = 0; i < 7; i++) {
      days.push(startOfWeek.clone().add(i, "days"));
    }

    setCurrentWeek(days);
  };

  const handlePreviousWeek = () => {
    setCurrentDate(currentDate.clone().subtract(1, "week"));
  };

  const handleNextWeek = () => {
    setCurrentDate(currentDate.clone().add(1, "week"));
  };

  return (
    <div className="overflow-auto">
      <div className="d-flex justify-content-between mb-2">
        <button
          className="btn btn-primary text-white"
          onClick={handlePreviousWeek}
        >
          {t("Services.Diet.Consumption.PreviousWeek")}
        </button>

        <h2 className="text-center">{t("Dashboard.WeeklyCalendar")}</h2>

        <button className="btn btn-primary text-white" onClick={handleNextWeek}>
          {t("Services.Diet.Consumption.NextWeek")}
        </button>
      </div>

      <table
        className="table table-bordered table-striped bg-white"
        style={{
          minWidth: "1000px",
        }}
      >
        <thead>
          <tr>
            <th rowSpan={2} className="align-middle">
              {t("Services.Diet.Consumption.Meal")}
            </th>

            {currentWeek?.map((day, i) => (
              <td key={i}>{day.format("ddd")}</td>
            ))}
          </tr>

          <tr>
            {currentWeek?.map((day, i) => (
              <th key={i}>{day.format("D MMM YY")}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {currentWeekData
            ?.map(({ meal }) => meal)
            ?.sort((a: any, b: any) => (a.time < b.time ? -1 : 1))
            ?.map(({ meal }) => meal)
            .reduce<string[]>(
              (final, current) =>
                final.includes(current) ? final : [...final, current],
              []
            )
            // meals
            //   ?.map(({ meal }) => meal)
            ?.map((meal, i) => (
              <tr key={i}>
                <th className="text-start">
                  {meal}

                  {currentWeekData
                    .find((dat) => meal === dat.meal.meal)
                    ?.supposed?.map(
                      ({ element, count, note, unit, alternatives }, y) => (
                        <MealView
                          dark={y % 2 === 1}
                          meal={meal}
                          count={count}
                          unit={unit}
                          element={element}
                          note={note}
                          alternatives={alternatives}
                          key={y}
                        />
                      )
                    ) || ""}
                </th>

                {currentWeek?.map((day, x) => {
                  const theMeals: consumptionFullProps[] | undefined =
                    currentWeekData
                      ?.filter(
                        (dat) =>
                          meal === dat.meal.meal &&
                          moment(dat.timestamp).format("yyyy-MM-DD") ===
                            day.format("yyyy-MM-DD")
                      )
                      ?.sort((a: any, b: any) =>
                        a.timestamp < b.timestamp ? -1 : 1
                      );

                  return (
                    <td className="text-start align-top" key={x}>
                      {theMeals?.map(
                        ({ timestamp, id, note, contents, supposed }) => (
                          <Fragment>
                            {timestamp ? (
                              <span
                                style={{ minWidth: "max-content" }}
                                className="d-block bg-dark text-white px-2 py-1"
                              >
                                {"@ " + moment(timestamp).format("h:mm a")}{" "}
                                <FontAwesomeIcon
                                  icon={faTrashCan}
                                  className="mt-1 text-danger"
                                  role="button"
                                  onClick={() => onDelete(id)}
                                />
                                <br />
                                {note ? "(" + note + ")" : ""}
                              </span>
                            ) : (
                              ""
                            )}

                            {contents?.map(
                              ({ element, count, note, unit }, y) => (
                                <MealView
                                  dark={y % 2 === 1}
                                  meal={meal}
                                  count={count}
                                  element={element}
                                  unit={unit}
                                  note={note}
                                  supposed={supposed?.find(
                                    (s) =>
                                      s.element === element ||
                                      s.alternatives?.find(
                                        (a) => a.element === element
                                      )
                                  )}
                                  compare
                                  key={y}
                                />
                              )
                            )}
                          </Fragment>
                        )
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeeklyCalendar;
