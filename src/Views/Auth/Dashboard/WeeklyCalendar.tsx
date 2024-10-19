import moment, { Moment } from "moment";
import { Fragment, useEffect, useState } from "react";

import { getSummary } from "../../../API/ChatGPT";
import MealView from "../../../Components/MealView";
import { renderEvents } from "../../../Components/PageView/MonthlyCalendar";
import { consumptionFullProps } from "../Diet/Consumption";
import { renderWateringUI, wateringProps } from "../Diet/Watering";
import { medicineProps, renderMedicineUI } from "../Medicine";
import { renderSleepCycleUI, sleepCycleProps } from "../SleepCycles";
import { renderExerciseUI, walkExerciseProps } from "../Sports";

export interface SummaryProps {
  week: string;
  daily: { date: string; content: string }[];
}

export type comprehensiveProps = consumptionFullProps & {
  sports: walkExerciseProps[];
  medicines: medicineProps[];
  sleeps: sleepCycleProps[];
  watering: wateringProps[];
};

const WeeklyCalendar = ({
  consumptionData,
  walkExercisesData,
  medicineData,
  sleepCyclesData,
  summaries,
  watering,
}: {
  consumptionData: consumptionFullProps[];
  walkExercisesData: walkExerciseProps[];
  medicineData: medicineProps[];
  sleepCyclesData: sleepCycleProps[];
  summaries: SummaryProps[];
  watering: wateringProps[];
}) => {
  const [currentWeek, setCurrentWeek] = useState<Moment[]>([]);
  const [currentDate, setCurrentDate] = useState<Moment>(moment());
  const [currentWeekData, setCurrentWeekData] = useState<comprehensiveProps[]>(
    []
  );
  const [currentWeekSummary, setCurrentWeekSummary] = useState<SummaryProps>({
    week: "",
    daily: [
      { date: "", content: "" },
      { date: "", content: "" },
      { date: "", content: "" },
      { date: "", content: "" },
      { date: "", content: "" },
      { date: "", content: "" },
      { date: "", content: "" },
    ],
  });

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
          watering: [
            {
              date: moment(data.timestamp).format("yyyy-MM-DD"),
              timestamp: moment(data.timestamp).format("yyyy-MM-DD"),
              quantity: watering
                .filter(
                  ({ timestamp }) =>
                    moment(data.timestamp).format("yyyy-MM-DD") ===
                    moment(timestamp).format("yyyy-MM-DD")
                )
                .map(({ timestamp, ...rest }) => ({
                  ...rest,
                  timestamp,
                  date: moment(timestamp).format("yyyy-MM-DD"),
                }))
                .reduce(
                  (final, { quantity }) =>
                    (final += parseFloat(String(quantity))),
                  0
                ),
            },
          ],
          // .reduce((final, { quantity }) => (final += quantity), 0)
          sleeps: sleepCyclesData.filter(
            ({ endTime }) =>
              moment(data.timestamp).format("yyyy-MM-DD") ===
              moment(endTime).format("yyyy-MM-DD")
          ),
        }))
    );
  }, [
    currentWeek,
    consumptionData,
    walkExercisesData,
    medicineData,
    sleepCyclesData,
  ]);

  const generateSummary = () =>
    getSummary(currentWeekData).then((res) => setCurrentWeekSummary(res.data));

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
            <th rowSpan={2} className="align-middle" style={{ width: "20%" }}>
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
                              <span className="d-block bg-dark text-white px-2 py-1">
                                {"@ " + moment(timestamp).format("h:mm a")}{" "}
                                <br />
                                {note ? "(" + note + ")" : ""}
                              </span>
                            ) : (
                              ""
                            )}

                            {contents?.map(
                              ({ element, count, unit, note }, y) => (
                                <MealView
                                  dark={y % 2 === 1}
                                  meal={meal}
                                  count={count}
                                  unit={unit}
                                  element={element}
                                  note={note}
                                  key={y}
                                  supposed={supposed?.find(
                                    (s) =>
                                      s.element === element ||
                                      s.alternatives?.find(
                                        (a) => a.element === element
                                      )
                                  )}
                                  compare
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

          <tr>
            <th>Watering</th>

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
                    renderWateringUI(),
                    theWalkExercises?.watering
                  )}
                </td>
              );
            })}
          </tr>

          <tr>
            <th>Sport Sessions</th>

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
            <th>Medicines</th>

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

          <tr>
            <th>Sleep Cycles</th>

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
                    renderSleepCycleUI(),
                    theWalkExercises?.sleeps.map(({ endTime, ...rest }) => ({
                      ...rest,
                      date: moment(endTime).format("yyyy-MM-DD"),
                      endTime,
                    }))
                  )}
                </td>
              );
            })}
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <th rowSpan={2}>
              <button
                className="btn btn-primary"
                disabled={summaries.length > 0}
                onClick={() => generateSummary()}
              >
                Generate Summary
              </button>
            </th>

            {currentWeekSummary.daily.map(({ date, content }, x) => (
              <th key={x}>{content}</th>
            ))}
          </tr>

          <tr>
            <th colSpan={7}>{currentWeekSummary.week}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default WeeklyCalendar;
