import { Fragment } from "react/jsx-runtime";

const Schedule = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const meals = ["Breakfast", "Light Meal", "Drink", "Lunch", "Light Meal"];
  const schedule = [
    ["Breakfast", "Light Meal", "Drink", "Lunch", "Light Meal"],
    ["Breakfast", "Light Meal", "Drink", "Lunch", "Light Meal"],
    ["Breakfast", "Light Meal", "Drink", "Lunch", "Light Meal"],
    ["Breakfast", "Light Meal", "Drink", "Lunch", "Light Meal"],
    ["Breakfast", "Light Meal", "Drink", "Lunch", "Light Meal"],
    ["Breakfast", "Light Meal", "Drink", "Lunch", "Light Meal"],
    ["Breakfast", "Light Meal", "Drink", "Lunch", "Light Meal"],
  ];

  return (
    <Fragment>
      <h4 className="mb-4">Scheduled Meals</h4>

      <table className="table table-responsive table-striped">
        <thead>
          <tr>
            <th>Day</th>

            {meals.map((meal, i) => (
              <th key={i}>{meal}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {schedule.map((daySchedule, i) => (
            <tr key={i}>
              <th>{days[i % days.length]}</th>

              {daySchedule.map((meal, y) => (
                <td key={y}>{meal}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Schedule;
