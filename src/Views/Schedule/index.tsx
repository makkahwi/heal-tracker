import moment from "moment";
import { Fragment, useEffect, useState } from "react";

import * as mealsAPI from "../../API/meals";
import * as scheduleAPI from "../../API/schedule";
import Form from "../../Components/Form";
import MealView, { MealViewProps } from "../../Components/MealView";
import PageSection from "../../Components/PageSection";
import { MealProps } from "../Meals";

const Schedule = () => {
  const [data, setData] = useState<MealViewProps[]>([]);
  const [meals, setMeals] = useState<MealProps[]>([]);

  const getData = () => {
    scheduleAPI.getAll().then((res: any) => setData(res));
    mealsAPI.getAll().then((res: any) => setMeals(res));
  };

  useEffect(() => {
    // scheduleAPI.getAll().then((res: MealViewProps[][]) => setData(res));
    getData();
  }, []);

  const formInputs = [
    {
      name: "meal",
      label: "Meal of Day",
      type: "select",
      options: meals.map(({ meal }) => meal),
      required: true,
    },
    {
      name: "contents",
      label: "Meal Contents",
      type: "dynamicList",
      fullWidth: true,
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

  const onDelete = (id: string) =>
    scheduleAPI.remove(id).then(() => {
      getData();
    });

  return (
    <PageSection title="Scheduled Meals">
      <Fragment>
        <Form inputs={formInputs} onSubmit={onSubmit} />

        <table className="table table-bordered table-responsive table-striped">
          <thead>
            <tr className="align-middle">
              <th>Meal of Day</th>

              <th>Meal Contents</th>
            </tr>
          </thead>

          <tbody>
            {meals
              .filter(
                ({ meal }) => data?.filter((rec) => rec.meal === meal)?.length
              )
              .map(({ meal, time }, x) => (
                <tr key={x}>
                  <th>
                    {meal +
                      " (" +
                      moment("2024-07-01T" + time).format("h:mm a") +
                      ")"}
                  </th>

                  <td>
                    {data
                      ?.sort((a, b) => (a.element > b.element ? 1 : -1))
                      ?.filter((rec) => rec.meal === meal)
                      .map(
                        (
                          { element = "", count = "", alternatives, note, id },
                          y
                        ) => (
                          <ul className="text-start" key={y}>
                            <MealView
                              dark={y % 2 === 1}
                              id={id}
                              meal={meal}
                              count={count}
                              element={element}
                              alternatives={alternatives}
                              note={note}
                              onDelete={onDelete}
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
