import { Fragment } from "react/jsx-runtime";

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
    },
    {
      timestamp: new Date(),
      meal: "Lunch",
      contents: [
        { element: "Various Vegetables", count: "Slices" },
        { element: "Olive", count: "4 Pieces" },
      ],
    },
  ];

  return (
    <Fragment>
      <h4 className="mb-4">Consumed Meals</h4>

      <table className="table table-responsive table-striped">
        <thead>
          <tr>
            <th>Date</th>

            <th>Time</th>

            <th>Meal of Day</th>

            <th>Consumed Meal Contents</th>
          </tr>
        </thead>

        <tbody>
          {consumption.map(({ timestamp, meal, contents }, x) => (
            <tr key={x}>
              <td>{timestamp.getDate()}</td>
              <td>{timestamp.getTime()}</td>
              <td>{meal}</td>

              <td>
                <ul className="text-start">
                  {contents.map(({ element, count }, y) => (
                    <li key={y}>{count + " of " + element}</li>
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

export default Consumption;
