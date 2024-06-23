import { useEffect, useState } from "react";
import * as scheduleAPI from "../../API/schedule";
import MealView, { MealViewProps } from "../../Components/MealView";
import PageSection from "../../Components/PageSection";

const Schedule = () => {
  const [data, setData] = useState<MealViewProps[][]>([]);
  const meals = ["Breakfast", "Light Meal", "Drink", "Lunch", "Light Meal"];

  useEffect(() => {
    // scheduleAPI.getAll().then((res: MealViewProps[][]) => setData(res));
    setData(scheduleAPI.getAll());
  }, []);

  return (
    <PageSection title="Scheduled Meals">
      <table className="table table-responsive table-striped">
        <thead>
          <tr className="align-middle">
            <th>Meal of Day</th>

            <th>Meal Contents</th>
          </tr>
        </thead>

        <tbody>
          {data.map((mealContents, x) => (
            <tr key={x}>
              <th>{meals[x % meals.length]}</th>

              <td>
                <ul className="text-start">
                  {mealContents?.map(({ element, count, alternatives }, y) => (
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
    </PageSection>
  );
};

export default Schedule;
