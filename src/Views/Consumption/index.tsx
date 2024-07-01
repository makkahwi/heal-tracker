import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment, { MomentInput } from "moment";
import { Fragment, useEffect, useState } from "react";

import * as consumptionAPI from "../../API/consumption";
import * as mealsAPI from "../../API/meals";
import * as scheduleAPI from "../../API/schedule";
import Form from "../../Components/Form";
import MealView, { MealViewProps } from "../../Components/MealView";
import PageSection from "../../Components/PageSection";
import { MealProps } from "../Meals";

interface props {
  id?: string;
  timestamp: MomentInput;
  meal: MealProps;
  contents: MealViewProps[];
  supposed: MealViewProps[];
}

const Consumption = () => {
  const [data, setData] = useState<props[]>([]);
  const [showCount, setShowCount] = useState(5);
  const [scheduled, setScheduled] = useState<MealViewProps[]>([]);
  const [meals, setMeals] = useState<MealProps[]>([]);

  const getData = () => {
    scheduleAPI
      .getAll()
      .then((res: MealViewProps[]) =>
        setScheduled(res?.sort((a, b) => (a.element > b.element ? 1 : -1)))
      );
    consumptionAPI.getAll().then((res: props[]) =>
      setData(
        res
          .sort((a: any, b: any) => (a.timestamp > b.timestamp ? -1 : 1))
          .map(({ contents, supposed, ...rest }) => ({
            ...rest,
            contents: contents.sort((a, b) => (a.element > b.element ? 1 : -1)),
            supposed: supposed.sort((a, b) => (a.element > b.element ? 1 : -1)),
          }))
      )
    );
    mealsAPI.getAll().then((res: any) => setMeals(res));
  };

  useEffect(() => {
    getData();
  }, []);

  const formInputs = [
    {
      name: "date",
      label: "Date",
      type: "date",
      defaultValue: moment().format("yyyy-MM-DD"),
      required: true,
    },
    {
      name: "time",
      label: "Time",
      type: "time",
      defaultValue: moment().format("HH:mm"),
      required: true,
    },
    {
      name: "meal",
      label: "Meal of Day",
      type: "select",
      options: meals.map(({ meal }) => meal),
      onChange: (e: any, setValues: any) => {
        setValues((current: any) => ({
          ...current,
          [e.target.name]: e.target.value,
          contents: scheduled.filter(({ meal }) => meal === e.target.value),
        }));
      },
      required: true,
    },
    {
      name: "contents",
      label: "Meal Contents",
      type: "dynamicList",
      inputs: [
        { name: "element", label: "Element", required: true },
        { name: "count", label: "Count", required: true },
        { name: "note", label: "Note", required: false },
      ],
      required: true,
    },
  ];

  interface submitProps {
    date: string;
    time: string;
    meal: string;
    contents: MealViewProps[];
    supposed: MealViewProps[];
  }

  const onSubmit = (values: submitProps) => {
    const date = values.date || moment().format("yyyy-MM-DD");
    const time = values.time || moment().format("HH:mm");

    const finalValue = {
      meal: meals.find((m) => m.meal == values.meal),
      contents: values.contents,
      supposed: scheduled.filter(({ meal }) => meal === values.meal),
      timestamp: moment(date + "T" + time),
    };

    consumptionAPI.create(finalValue).then(() => {
      getData();
    });
  };

  const onDelete = (id: string) =>
    consumptionAPI.remove(id).then(() => {
      getData();
    });

  return (
    <PageSection title="Consumed Meals">
      <Fragment>
        <Form inputs={formInputs} onSubmit={onSubmit} />

        <div className="d-none d-md-block">
          <table className="table table-responsive table-striped">
            <thead>
              <tr className="align-middle">
                <th>Date</th>

                <th>Meal of Day</th>

                <th>Time</th>

                <th>Consumed Meal Contents</th>

                <th>Supposed To Consume Meal Contents</th>

                {/* <th>Added Consumptions</th>

              <th>Missed Supposes</th> */}

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {data
                ?.filter((_, i) => i < showCount)
                ?.map(({ timestamp, meal, contents, supposed, id }, x) => (
                  <tr key={x}>
                    <td>{moment(timestamp).format("ddd, D MMM YYYY")}</td>

                    <td>
                      {meal.meal +
                        " (" +
                        moment(
                          "2024-07-01T" +
                            meals.find((m) => m.meal == meal.meal)?.time
                        ).format("h:mm a") +
                        ")"}
                    </td>

                    <td>{moment(timestamp).format("h:mm a")}</td>

                    <td>
                      <ul className="text-start">
                        {contents.map(({ element, count, note }, y) => (
                          <MealView
                            dark={y % 2 == 1}
                            meal={meal.meal}
                            count={count}
                            element={element}
                            note={note}
                            key={y}
                          />
                        ))}
                      </ul>
                    </td>

                    <td>
                      <ul className="text-start">
                        {supposed.map(({ element, count, alternatives }, y) => (
                          <MealView
                            dark={y % 2 == 1}
                            meal={meal.meal}
                            count={count}
                            element={element}
                            alternatives={alternatives}
                            key={y}
                          />
                        ))}
                      </ul>
                    </td>

                    {/* <td>
                  <ul className="text-start">
                    {contents
                      .filter(
                        ({ element, count }) =>
                          element !==
                          supposed.find((sup) => sup.element === element)
                            ?.element
                      )
                      .map(({ element, count }, y) => (
                        <MealView
                          meal={meal}
                          count={count}
                          element={element}
                          key={y}
                        />
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
                            ?.element
                      )
                      .map(({ element, count, alternatives }, y) => (
                        <MealView
                          meal={meal}
                          count={count}
                          element={element}
                          alternatives={alternatives}
                          key={y}
                        />
                      ))}
                  </ul>
                </td> */}

                    <td>
                      <FontAwesomeIcon
                        icon={faTrash}
                        role="button"
                        className="mx-1 text-danger"
                        onClick={() => onDelete(id || "")}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="d-block d-md-none">
          {data
            ?.filter((_, i) => i < showCount)
            ?.map(({ timestamp, meal, contents, supposed, id }, x) => (
              <div className="card p-3 py-4 my-4 w-100" key={x}>
                <table className="table table-responsive m-0">
                  <tbody>
                    <tr>
                      <th className="w-25">Date</th>
                      <td className="text-start">
                        {moment(timestamp).format("ddd, D MMM YYYY")}
                      </td>
                    </tr>

                    <tr>
                      <th>Time</th>
                      <td className="text-start">
                        {moment(timestamp).format("h:mm a")}
                      </td>
                    </tr>

                    <tr>
                      <th>Meal</th>
                      <td className="text-start">{meal.meal}</td>
                    </tr>

                    <tr>
                      <th>Consumed</th>
                      <td className="text-start">
                        <ul>
                          {contents.map(({ element, count, note }, y) => (
                            <MealView
                              dark={y % 2 == 1}
                              meal={meal.meal}
                              count={count}
                              element={element}
                              note={note}
                              key={y}
                            />
                          ))}
                        </ul>
                      </td>
                    </tr>

                    <tr>
                      <th>Supposed</th>
                      <td className="text-start">
                        <ul>
                          {supposed.map(
                            ({ element, count, alternatives }, y) => (
                              <MealView
                                dark={y % 2 == 1}
                                meal={meal.meal}
                                count={count}
                                element={element}
                                alternatives={alternatives}
                                key={y}
                              />
                            )
                          )}
                        </ul>
                      </td>
                    </tr>

                    {/* <td>
                  <ul className="text-start">
                    {contents
                      .filter(
                        ({ element, count }) =>
                          element !==
                          supposed.find((sup) => sup.element === element)
                            ?.element
                      )
                      .map(({ element, count }, y) => (
                        <MealView
                          meal={meal}
                          count={count}
                          element={element}
                          key={y}
                        />
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
                            ?.element
                      )
                      .map(({ element, count, alternatives }, y) => (
                        <MealView
                          meal={meal}
                          count={count}
                          element={element}
                          alternatives={alternatives}
                          key={y}
                        />
                      ))}
                  </ul>
                </td> */}

                    <tr>
                      <th>Actions</th>
                      <td className="text-start">
                        <FontAwesomeIcon
                          icon={faTrash}
                          role="button"
                          className="mx-1 text-danger"
                          onClick={() => onDelete(id || "")}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
        </div>

        {data.length > showCount ? (
          <button
            className="btn btn-light"
            onClick={() => setShowCount((current) => current + 5)}
          >
            Show More
          </button>
        ) : (
          ""
        )}
      </Fragment>
    </PageSection>
  );
};

export default Consumption;
