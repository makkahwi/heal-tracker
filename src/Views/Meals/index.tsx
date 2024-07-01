import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useEffect, useState } from "react";

import * as mealsAPI from "../../API/meals";
import Form from "../../Components/Form";
import { MealViewProps } from "../../Components/MealView";
import PageSection from "../../Components/PageSection";

export interface MealProps {
  id?: string;
  meal: string;
  time: string;
}

const Meals = () => {
  const [data, setData] = useState<MealProps[]>([]);

  const getData = () => mealsAPI.getAll().then((res: any) => setData(res));

  useEffect(() => {
    // scheduleAPI.getAll().then((res: MealViewProps[][]) => setData(res));
    getData();
  }, []);

  const formInputs = [
    {
      name: "meal",
      label: "Meal Name",
      type: "text",
      required: true,
    },
    {
      name: "time",
      label: "Time of Meal",
      type: "time",
      required: true,
    },
  ];

  interface submitProps {
    meal: string;
    contents: MealViewProps[];
  }

  const onSubmit = (values: submitProps) => {
    mealsAPI.create(values).then(() => {
      getData();
    });
  };

  const onDelete = (id: string) =>
    mealsAPI.remove(id).then(() => {
      getData();
    });

  return (
    <PageSection title="Meals List">
      <Fragment>
        <Form inputs={formInputs} onSubmit={onSubmit} />

        <table className="table table-responsive table-striped">
          <thead>
            <tr className="align-middle">
              <th>Meal Name</th>

              <th>Time of Meal</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data
              ?.sort((a, b) => (a.time > b.time ? 1 : -1))
              .map(({ id, time, meal }, y) => (
                <tr key={y}>
                  <td>{meal}</td>
                  <td>{time}</td>
                  <td>
                    {id && (
                      <FontAwesomeIcon
                        icon={faTrash}
                        role="button"
                        className="mx-1 text-danger"
                        onClick={() => onDelete(id)}
                      />
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

export default Meals;
