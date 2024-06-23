import { Fragment, useEffect, useState } from "react";
import * as scheduleAPI from "../../API/schedule";
import MealView, { MealViewProps } from "../../Components/MealView";
import PageSection from "../../Components/PageSection";
import Form from "../../Components/Form";
import { meals } from "../../Utils/consts";

const Schedule = () => {
  const [data, setData] = useState<MealViewProps[]>([]);

  useEffect(() => {
    // scheduleAPI.getAll().then((res: MealViewProps[][]) => setData(res));
    setData(scheduleAPI.getAll());
  }, []);

  const formInputs = [
    {
      name: "meal",
      label: "Meal of Day",
      type: "select",
      options: meals,
      required: true,
    },
    {
      name: "contents",
      label: "Meal Contents",
      type: "dynamicList",
      inputs: [
        { name: "element", label: "Element", required: true },
        { name: "count", label: "Count", required: true },
        // {
        //   name: "alternatives",
        //   label: "Alternatives",
        //   type: "dynamicList",
        //   inputs: [
        //     { name: "element", label: "Element", required: true },
        //     { name: "count", label: "Count", required: true },
        //   ],
        //   required: false,
        // },
      ],
      required: true,
    },
  ];

  interface submitProps {
    meal: string;
    contents: MealViewProps[];
  }

  const onSubmit = (values: submitProps) => {
    const finalValue = values?.contents?.map((content) => ({
      ...content,
      meal: values?.meal,
    }));
    setData((current) => [...current, ...finalValue]);
  };

  return (
    <PageSection title="Scheduled Meals">
      <Fragment>
        <Form inputs={formInputs} onSubmit={onSubmit} />

        <table className="table table-responsive table-striped">
          <thead>
            <tr className="align-middle">
              <th>Meal of Day</th>

              <th>Meal Contents</th>
            </tr>
          </thead>

          <tbody>
            {meals.map((meal, x) => (
              <tr key={x}>
                <th>{meal}</th>

                <td>
                  {data
                    .filter((rec) => rec.meal === meal)
                    .map(({ element = "", count = "", alternatives }, y) => (
                      <ul className="text-start" key={y}>
                        <MealView
                          meal={meal}
                          count={count}
                          element={element}
                          alternatives={alternatives}
                          key={y}
                        />
                      </ul>
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    </PageSection>
  );
};

export default Schedule;
