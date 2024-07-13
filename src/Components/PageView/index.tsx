import {
  faArrowCircleDown,
  faArrowCircleUp,
  faCheckCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";

import Form, { inputProps } from "../../Components/Form";
import PageSection from "../../Components/PageSection";

export interface props {
  title: string;
  data: { id?: string }[];
  inputs: inputProps[];
  onSubmit: (x: any) => void;
  onDelete: Function;
}

const PageView = ({ title, data, inputs, onSubmit, onDelete }: props) => {
  const symbol = String.fromCodePoint(8734);

  return (
    <PageSection title={title}>
      <Fragment>
        <Form inputs={inputs} onSubmit={onSubmit} />

        <div className={"d-none " + (inputs.length > 15 ? "" : "d-lg-block")}>
          <table className="table table-bordered table-responsive table-striped">
            <thead>
              <tr className="align-middle">
                {inputs.map(({ label, lowEnd, highEnd }, x) => (
                  <th key={x}>
                    {lowEnd || highEnd
                      ? (lowEnd || symbol) +
                        " > " +
                        label +
                        " < " +
                        (highEnd || symbol)
                      : label}
                  </th>
                ))}

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map(({ id, ...row }, i) => (
                <tr className="align-middle" key={i}>
                  {inputs.map(({ name, render, lowEnd, highEnd }, x) => (
                    <td
                      className={
                        "fw-bold " +
                        (lowEnd && highEnd
                          ? parseFloat((row as any)[name]) >= lowEnd &&
                            parseFloat((row as any)[name]) <= highEnd
                            ? "text-success"
                            : "text-danger"
                          : lowEnd
                          ? parseFloat((row as any)[name]) >= lowEnd
                            ? "text-success"
                            : "text-danger"
                          : highEnd
                          ? parseFloat((row as any)[name]) <= highEnd
                            ? "text-success"
                            : "text-danger"
                          : "")
                      }
                      key={x}
                    >
                      {render ? render(row) : (row as any)[name]}

                      {(lowEnd || highEnd) && (row as any)[name] ? (
                        <FontAwesomeIcon
                          className="ms-1"
                          icon={
                            lowEnd
                              ? parseFloat((row as any)[name]) >= lowEnd
                                ? faCheckCircle
                                : faArrowCircleDown
                              : highEnd
                              ? parseFloat((row as any)[name]) <= highEnd
                                ? faCheckCircle
                                : faArrowCircleUp
                              : faCheckCircle
                          }
                        />
                      ) : (
                        ""
                      )}
                    </td>
                  ))}

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
        </div>

        <div className={"d-block " + (inputs.length > 15 ? "" : "d-lg-none")}>
          {data.map(({ id, ...row }, i) => (
            <div className="card mb-4" key={i}>
              <table className="table table-bordered table-responsive table-striped m-0">
                <tbody>
                  {inputs
                    .filter(({ name, render }) =>
                      render ? render(row) : (row as any)[name]
                    )
                    .map(({ label, name, render, lowEnd, highEnd }, x) => (
                      <tr className="align-middle" key={x}>
                        <th>
                          {lowEnd || highEnd
                            ? (lowEnd || symbol) +
                              " > " +
                              label +
                              " < " +
                              (highEnd || symbol)
                            : label}
                        </th>

                        <td
                          className={
                            "fw-bold " +
                            (lowEnd && highEnd
                              ? parseFloat((row as any)[name]) >= lowEnd &&
                                parseFloat((row as any)[name]) <= highEnd
                                ? "text-success"
                                : "text-danger"
                              : lowEnd
                              ? parseFloat((row as any)[name]) >= lowEnd
                                ? "text-success"
                                : "text-danger"
                              : highEnd
                              ? parseFloat((row as any)[name]) <= highEnd
                                ? "text-success"
                                : "text-danger"
                              : "")
                          }
                        >
                          {render ? render(row) : (row as any)[name]}

                          {(lowEnd || highEnd) && (row as any)[name] ? (
                            <FontAwesomeIcon
                              className="ms-1"
                              icon={
                                lowEnd
                                  ? parseFloat((row as any)[name]) >= lowEnd
                                    ? faCheckCircle
                                    : faArrowCircleDown
                                  : highEnd
                                  ? parseFloat((row as any)[name]) <= highEnd
                                    ? faCheckCircle
                                    : faArrowCircleUp
                                  : faCheckCircle
                              }
                            />
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    ))}

                  <tr className="align-middle">
                    <th>Actions</th>

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
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </Fragment>
    </PageSection>
  );
};

export default PageView;
