import {
  faArrowCircleDown,
  faArrowCircleUp,
  faCheckCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";

import { dayDateFormat, timeFormat } from "../../Utils/consts";
import { inputProps } from "../Form";
import { useTranslation } from "react-i18next";

interface props {
  data: { id?: string }[];
  inputs: inputProps[];
  onDelete: Function;
}

const PageTable = ({ data, inputs, onDelete }: props) => {
  const { t } = useTranslation();
  const symbol = String.fromCodePoint(8734);

  return (
    <Fragment>
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

              <th>{t("Comp.Table.Actions")}</th>
            </tr>
          </thead>

          <tbody>
            {data.map(({ id, ...row }, i) => (
              <tr className="align-middle" key={i}>
                {inputs.map(
                  (
                    {
                      name,
                      render,
                      lowEnd,
                      highEnd,
                      type,
                      beforeText,
                      afterText,
                      options,
                    },
                    x
                  ) => (
                    <td
                      className={
                        lowEnd && highEnd
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
                          : ""
                      }
                      key={x}
                    >
                      {render
                        ? render(row, i)
                        : type === "date"
                        ? dayDateFormat((row as any)[name])
                        : type === "time"
                        ? timeFormat((row as any)[name])
                        : type === "select"
                        ? options?.find(
                            ({ value }) => value === (row as any)[name]
                          )?.label || (row as any)[name]
                        : (beforeText ? " " + beforeText : "") +
                          (row as any)[name] +
                          (afterText ? " " + afterText : "")}

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
                  )
                )}

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

          {inputs.filter(({ total }) => total)?.length ? (
            <tfoot>
              <tr>
                {inputs.map(({ name, total, label }, x) => (
                  <td key={x}>
                    {total
                      ? "Total " +
                        label +
                        " | " +
                        data
                          .map((row) => parseFloat((row as any)[name]))
                          .reduce((final, current) => (final += current), 0)
                      : ""}
                  </td>
                ))}
              </tr>
            </tfoot>
          ) : (
            ""
          )}
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
                  .map(
                    (
                      {
                        label,
                        name,
                        render,
                        lowEnd,
                        highEnd,
                        type,
                        beforeText,
                        afterText,
                      },
                      x
                    ) => (
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
                            lowEnd && highEnd
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
                              : ""
                          }
                        >
                          {render
                            ? render(row, i)
                            : type === "date"
                            ? dayDateFormat((row as any)[name])
                            : type === "time"
                            ? timeFormat((row as any)[name])
                            : (beforeText ? " " + beforeText : "") +
                              (row as any)[name] +
                              (afterText ? " " + afterText : "")}

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
                    )
                  )}

                <tr className="align-middle">
                  <th>{t("Comp.Table.Actions")}</th>

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
  );
};

export default PageTable;
