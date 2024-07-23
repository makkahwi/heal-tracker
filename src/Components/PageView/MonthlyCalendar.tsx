import moment, { Moment } from "moment";
import { useState } from "react";

interface props {
  data: object[];
  renderEvent: (event: any, date: string, id: string) => JSX.Element;
}

const renderEvents = (
  date: string,
  events: any[],
  renderFunc: (event: any, date: string, id: string) => JSX.Element
) => {
  return events
    .filter((event) => event.date === date)
    .map((event) => renderFunc(event, date, event.id));
};

const MonthlyCalendar = ({ data, renderEvent }: props) => {
  const [currentMonth, setCurrentMonth] = useState<Moment>(moment());

  const daysOfWeek = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const startOfMonth = currentMonth.clone().startOf("month");
  const endOfMonth = currentMonth.clone().endOf("month");

  // Ensure the calendar starts on the Saturday before the first day of the month, and ends on the Friday after the last day of the month
  const startOfCalendar = startOfMonth.clone().startOf("week").day(6);
  const endOfCalendar = endOfMonth.clone().endOf("week").day(5);

  const weeks: { weekNumber: number; days: Moment[] }[] = [];
  let day = startOfCalendar.clone().subtract(1, "day");

  while (day.isBefore(endOfCalendar, "day")) {
    const week: Moment[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(day.add(1, "day").clone());
    }
    weeks.push({ weekNumber: week[0].isoWeek(), days: week });
  }

  const handlePreviousMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, "month"));
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-2">
        <button className="btn btn-primary" onClick={handlePreviousMonth}>
          Previous Month
        </button>

        <h2 className="text-center">{currentMonth.format("MMMM YYYY")}</h2>

        <button className="btn btn-primary" onClick={handleNextMonth}>
          Next Month
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
            <th>Week</th>

            {daysOfWeek.map((dayName, index) => (
              <th key={index} className="text-center">
                {dayName}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={weekIndex}>
              <td className="fw-bold">{week.weekNumber}</td>
              {week.days.map((day, dayIndex) => (
                <td
                  key={dayIndex}
                  className={
                    day.isSame(currentMonth, "month") ? "" : "bg-light"
                  }
                >
                  {renderEvents(day.format("YYYY-MM-DD"), data, renderEvent)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyCalendar;
