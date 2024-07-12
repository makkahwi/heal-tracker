import moment, { Moment } from "moment";
import { useEffect, useState } from "react";

import MealView from "../../Components/MealView";
import { props } from "../../Views/Consumption";
import { MealProps } from "../../Views/Meals";

const WeeklyCalendar = ({
  meals,
  data,
}: {
  meals: MealProps[];
  data: props[];
}) => {
  const [currentWeek, setCurrentWeek] = useState<Moment[]>([]);
  const [currentDate, setCurrentDate] = useState<Moment>(moment());
  const [currentWeekData, setCurrentWeekData] = useState<props[]>([]);

  useEffect(() => {
    generateCurrentWeek(currentDate);
  }, [currentDate]);

  useEffect(() => {
    setCurrentWeekData(
      data.filter(({ timestamp }) =>
        moment(timestamp).isBetween(
          moment(currentWeek[0]).subtract(1, "days"),
          moment(currentWeek[6])
        )
      )
    );
  }, [currentWeek, data]);

  const generateCurrentWeek = (date: Moment) => {
    const startOfWeek = date.clone().isoWeekday(6); // Start of the week is Sunday by default
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
    <table className="table table-bordered table-responsive table-striped bg-white">
      <tr>
        <th>
          <button className="btn btn-secondary" onClick={handlePreviousWeek}>
            Previous
          </button>
        </th>

        <th colSpan={6} className="h3 py-4">
          Weekly Calendar
        </th>

        <th>
          <button className="btn btn-secondary" onClick={handleNextWeek}>
            Next
          </button>
        </th>
      </tr>

      <tr>
        <th rowSpan={2}>Meal</th>

        {currentWeek.map((day, i) => (
          <td key={i}>{day.format("ddd")}</td>
        ))}
      </tr>

      <tr>
        {currentWeek.map((day, i) => (
          <th key={i}>{day.format("D MMM YY")}</th>
        ))}
      </tr>

      {currentWeekData
        .map(({ meal }) => meal)
        .sort((a: any, b: any) => (a.time < b.time ? -1 : 1))
        .map(({ meal }) => meal)
        .reduce<string[]>(
          (final, current) =>
            final.includes(current) ? final : [...final, current],
          []
        )
        // meals
        //   .map(({ meal }) => meal)
        .map((meal, i) => (
          <tr key={i}>
            <th className="text-start">
              {meal}

              {currentWeekData
                .find((dat) => meal === dat.meal.meal)
                ?.supposed.map(({ element, count, note }, y) => (
                  <MealView
                    dark={y % 2 === 1}
                    meal={meal}
                    count={count}
                    element={element}
                    note={note}
                    key={y}
                  />
                )) || ""}
            </th>

            {currentWeek.map((day, x) => {
              const theMeal: props | undefined = currentWeekData.find(
                (dat) =>
                  meal === dat.meal.meal &&
                  moment(dat.timestamp).format("yyyy-MM-DD") ===
                    day.format("yyyy-MM-DD")
              );

              return (
                <td className="text-start align-top" key={x}>
                  {theMeal?.timestamp ? (
                    <span className="d-block bg-dark text-white">
                      {"@ " + moment(theMeal?.timestamp).format("h:mm a")}
                    </span>
                  ) : (
                    ""
                  )}

                  {theMeal?.contents.map(({ element, count, note }, y) => (
                    <MealView
                      dark={y % 2 === 1}
                      meal={meal}
                      count={count}
                      element={element}
                      note={note}
                      key={y}
                    />
                  ))}
                </td>
              );
            })}
          </tr>
        ))}
    </table>
  );
};

export default WeeklyCalendar;
