import { Fragment } from "react/jsx-runtime";
import MealView from "../../Components/MealView";

const Schedule = () => {
  const meals = ["Breakfast", "Light Meal", "Drink", "Lunch", "Light Meal"];
  const schedule = [
    [
      { element: "Bread", count: "1 Slice" },
      { element: "Various Vegetables", count: "Slices" },
      { element: "Olive", count: "4 Pieces" },
      { element: "Yoghurt", count: "1 Cup" },
      {
        element: "Egg",
        count: "2",
        alternatives: [
          { element: "Labaneh", count: "90gm" },
          { element: "Areesh Cheese", count: "90gm" },
          { element: "Chickpeas", count: "100gm" },
          { element: "Lentil", count: "100gm" },
        ],
      },
    ],
    [
      {
        element: "Salad",
        count: "1",
        alternatives: [{ element: "Various Vegetables", count: "Slices" }],
      },
      { element: "Yoghurt", count: "1 Cup" },
      { element: "Fruit", count: "1 Small Piece" },
      { element: "Walnuts", count: "4 Pieces" },
    ],
    [{ element: "Green Tea", count: "1 Cup" }],
    [
      {
        element: "Chicken Breast",
        count: "120gm",
        alternatives: [
          { element: "Fish", count: "120gm" },
          { element: "Beef", count: "120gm" },
        ],
      },
      {
        element: "Salad",
        count: "1",
      },
      { element: "Rice", count: "300gm" },
    ],
    [{ element: "Yoghurt", count: "1 Cup" }],
  ];

  return (
    <Fragment>
      <h4 className="mb-4">Scheduled Meals</h4>

      <table className="table table-responsive table-striped">
        <thead>
          <tr>
            <th>Meal of Day</th>

            <th>Meal Contents</th>
          </tr>
        </thead>

        <tbody>
          {schedule.map((mealContents, x) => (
            <tr key={x}>
              <th>{meals[x % meals.length]}</th>

              <td>
                <ul className="text-start">
                  {mealContents.map(({ element, count, alternatives }, y) => (
                    <MealView
                      count={count}
                      element={element}
                      alternatives={alternatives}
                      key={y}
                    />
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Schedule;
