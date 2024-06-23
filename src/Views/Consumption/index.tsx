import MealView from "../../Components/MealView";
import PageSection from "../../Components/PageSection";

const Consumption = () => {
  const consumption = [
    {
      timestamp: new Date(),
      meal: "Breakfast",
      contents: [
        { element: "Bread", count: "1 Slice" },
        { element: "Various Vegetables", count: "Slices" },
        { element: "Olive", count: "4 Pieces" },
        { element: "Yoghurt", count: "1 Cup" },
        {
          element: "Egg",
          count: "2",
        },
      ],
      supposed: [
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
    },
    {
      timestamp: new Date(),
      meal: "Lunch",
      contents: [
        { element: "Various Vegetables", count: "Slices" },
        { element: "Olive", count: "4 Pieces" },
      ],
      supposed: [
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
    },
  ];

  return (
    <PageSection title="Consumed Meals">
      <table className="table table-responsive table-striped">
        <thead>
          <tr>
            <th>Date</th>

            <th>Time</th>

            <th>Meal of Day</th>

            <th>Consumed Meal Contents</th>

            <th>Supposed To Consume Meal Contents</th>

            <th>Missed Supposes</th>

            <th>Added Consumptions</th>
          </tr>
        </thead>

        <tbody>
          {consumption.map(({ timestamp, meal, contents, supposed }, x) => (
            <tr key={x}>
              <td>{timestamp.getDate()}</td>
              <td>{timestamp.getTime()}</td>
              <td>{meal}</td>

              <td>
                <ul className="text-start">
                  {contents.map(({ element, count }, y) => (
                    <MealView count={count} element={element} key={y} />
                  ))}
                </ul>
              </td>

              <td>
                <ul className="text-start">
                  {supposed.map(({ element, count, alternatives }, y) => (
                    <MealView
                      count={count}
                      element={element}
                      alternatives={alternatives}
                      key={y}
                    />
                  ))}
                </ul>
              </td>

              <td>
                <ul className="text-start">
                  {contents
                    .filter(
                      ({ element, count }) =>
                        element !==
                          supposed.find((sup) => sup.element === element)
                            ?.element ||
                        count !==
                          supposed.find((sup) => sup.element === element)?.count
                    )
                    .map(({ element, count }, y) => (
                      <MealView count={count} element={element} key={y} />
                    ))}
                </ul>
              </td>

              <td>
                <ul className="text-start">
                  {supposed
                    .filter(
                      ({ element, count }) =>
                        element !==
                          contents.find((cont) => cont.element === element)
                            ?.element ||
                        count !==
                          contents.find((cont) => cont.element === element)
                            ?.count
                    )
                    .map(({ element, count, alternatives }, y) => (
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

export default Consumption;
