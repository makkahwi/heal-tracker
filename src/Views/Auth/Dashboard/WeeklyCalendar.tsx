import moment, { Moment } from "moment";
import { Fragment, useEffect, useState } from "react";

import MealView from "../../../Components/MealView";
import { renderEvents } from "../../../Components/PageView/MonthlyCalendar";
import { consumptionFullProps } from "../Diet/Consumption";
import { medicineProps, renderMedicineUI } from "../Medicine";
import { renderExerciseUI, walkExerciseProps } from "../Sports/WalkExercises";

type comprehensiveProps = consumptionFullProps & {
  sports: walkExerciseProps[];
  medicines: medicineProps[];
};

const WeeklyCalendar = ({
  consumptionData,
  walkExercisesData,
  medicineData,
}: {
  consumptionData: consumptionFullProps[];
  walkExercisesData: walkExerciseProps[];
  medicineData: medicineProps[];
}) => {
  const [currentWeek, setCurrentWeek] = useState<Moment[]>([]);
  const [currentDate, setCurrentDate] = useState<Moment>(moment());
  const [currentWeekData, setCurrentWeekData] = useState<comprehensiveProps[]>(
    []
  );

  useEffect(() => {
    generateCurrentWeek(currentDate);
  }, [currentDate]);

  useEffect(() => {
    setCurrentWeekData(
      consumptionData
        ?.filter(({ timestamp }) =>
          moment(timestamp).isBetween(
            moment(currentWeek[0]),
            moment(currentWeek[6]).add(1, "day"),
            undefined,
            "[]"
          )
        )
        .map(({ ...data }) => ({
          ...data,
          sports: walkExercisesData.filter(
            ({ date }) => moment(data.timestamp).format("yyyy-MM-DD") === date
          ),
          medicines: medicineData.filter(
            ({ date }) => moment(data.timestamp).format("yyyy-MM-DD") === date
          ),
        }))
    );
  }, [currentWeek, consumptionData, walkExercisesData, medicineData]);

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
        <button className="btn btn-primary" onClick={handlePreviousWeek}>
          Previous Week
        </button>

        <h2 className="text-center">{"Weekly Calendar"}</h2>

        <button className="btn btn-primary" onClick={handleNextWeek}>
          Next Week
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
            <th rowSpan={2} colSpan={2} className="align-middle">
              Data
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
            ?.map((meal, i) => (
              <tr key={i}>
                {i === 0 && (
                  <Fragment>
                    <th
                      rowSpan={
                        currentWeekData
                          ?.map(({ meal }) => meal)
                          ?.sort((a: any, b: any) => (a.time < b.time ? -1 : 1))
                          ?.map(({ meal }) => meal)
                          .reduce<string[]>(
                            (final, current) =>
                              final.includes(current)
                                ? final
                                : [...final, current],
                            []
                          ).length
                      }
                    >
                      Meals
                    </th>
                  </Fragment>
                )}

                <th className="text-start" style={{ width: "fit-content" }}>
                  {meal}

                  {currentWeekData
                    .find((dat) => meal === dat.meal.meal)
                    ?.supposed?.map(
                      ({ element, count, note, alternatives }, y) => (
                        <MealView
                          dark={y % 2 === 1}
                          meal={meal}
                          count={count}
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
                      {theMeals?.map(({ timestamp, id, note, contents }) => (
                        <Fragment>
                          {timestamp ? (
                            <span className="d-block bg-dark text-white px-2 py-1">
                              {"@ " + moment(timestamp).format("h:mm a")} <br />
                              {note ? "(" + note + ")" : ""}
                            </span>
                          ) : (
                            ""
                          )}

                          {contents?.map(({ element, count, note }, y) => (
                            <MealView
                              dark={y % 2 === 1}
                              meal={meal}
                              count={count}
                              element={element}
                              note={note}
                              key={y}
                            />
                          ))}
                        </Fragment>
                      ))}
                    </td>
                  );
                })}
              </tr>
            ))}

          <tr>
            <th colSpan={2}>Walk Exercises</th>

            {currentWeek?.map((day, x) => {
              const theWalkExercises: comprehensiveProps | undefined =
                currentWeekData?.find(
                  (dat) =>
                    moment(dat.timestamp).format("yyyy-MM-DD") ===
                    day.format("yyyy-MM-DD")
                );

              return (
                <td className="text-start align-top" key={x}>
                  {renderEvents(
                    day.format("YYYY-MM-DD"),
                    renderExerciseUI(),
                    theWalkExercises?.sports
                  )}
                </td>
              );
            })}
          </tr>

          <tr>
            <th colSpan={2}>Medicines</th>

            {currentWeek?.map((day, x) => {
              const theWalkExercises: comprehensiveProps | undefined =
                currentWeekData?.find(
                  (dat) =>
                    moment(dat.timestamp).format("yyyy-MM-DD") ===
                    day.format("yyyy-MM-DD")
                );

              return (
                <td className="text-start align-top" key={x}>
                  {renderEvents(
                    day.format("YYYY-MM-DD"),
                    renderMedicineUI(),
                    theWalkExercises?.medicines
                  )}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WeeklyCalendar;
