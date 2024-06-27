import { Fragment, useEffect, useState } from "react";

import * as scheduleAPI from "../../API/schedule";
import Form from "../../Components/Form";
import MealView, { MealViewProps } from "../../Components/MealView";
import PageSection from "../../Components/PageSection";
import { meals } from "../../Utils/consts";

const Schedule = () => {
  const [data, setData] = useState<MealViewProps[]>([]);

  const getData = () => scheduleAPI.getAll().then((res: any) => setData(res));

  useEffect(() => {
    // scheduleAPI.getAll().then((res: MealViewProps[][]) => setData(res));
    getData();
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

    finalValue.forEach((value) =>
      scheduleAPI.create(value).then(() => {
        getData();
      })
    );
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
                    ?.filter((rec) => rec.meal === meal)
                    .map(
                      ({ element = "", count = "", alternatives, note }, y) => (
                        <ul className="text-start" key={y}>
                          <MealView
                            meal={meal}
                            count={count}
                            element={element}
                            alternatives={alternatives}
                            note={note}
                            key={y}
                          />
                        </ul>
                      )
                    )}
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
