import {
  faCheckCircle,
  faPlus,
  faTrash,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";

interface dynamicObject {
  [key: string]: any;
}

export interface inputProps {
  name: string;
  label: string;
  subLabel?: string;
  beforeText?: string;
  afterText?: string;
  required?: boolean;
  fullWidth?: boolean;
  type?: string;
  defaultValue?: any;
  onChange?: any;
  lowEnd?: number;
  highEnd?: number;
  options?: { value: string | number; label?: string | number }[];
  inputs?: inputProps[];
  render?: Function;
  total?: boolean;
}

interface props {
  inputs: inputProps[];
  onSubmit: (x: any) => void;
}

const Form = ({ inputs, onSubmit }: props) => {
  const { t } = useTranslation();

  const { loading } = useSelector((state: RootState) => state.loading);

  const formValuesSet = () =>
    inputs.reduce(
      (final, { defaultValue, type, name }) => ({
        ...final,
        [name]: defaultValue
          ? defaultValue
          : type === "date"
          ? moment().format("yyyy-MM-DD")
          : type === "time"
          ? moment().format("HH:mm")
          : type === "datetime-local"
          ? moment().format("yyyy-MM-DDTHH:mm")
          : type === "boolean"
          ? false
          : undefined,
      }),
      {}
    );

  const [formValues, setFormValues] = useState<dynamicObject>(formValuesSet());

  useEffect(() => setFormValues(formValuesSet()), [inputs]);

  return (
    <form
      className="my-4 row"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formValues);
      }}
    >
      {inputs.map(
        (
          {
            name,
            label,
            subLabel,
            beforeText,
            afterText,
            type,
            options,
            inputs,
            required,
            defaultValue,
            onChange,
            fullWidth,
            ...rest
          },
          i
        ) => (
          <div className={fullWidth ? "col-12" : "col-md-6 col-lg-3"} key={i}>
            <label className="form-label text-start w-100 mt-4">
              {label}
              {required ? <span className="ms-1 text-danger"> *</span> : ""}
            </label>

            <div className="input-group mb-3">
              {beforeText && (
                <span className="input-group-text">{beforeText}</span>
              )}

              {type === "select" ? (
                <select
                  name={name}
                  className="form-control"
                  value={formValues[name]}
                  onChange={(e) =>
                    onChange
                      ? onChange(e, setFormValues)
                      : setFormValues((current) => ({
                          ...current,
                          [name]: e.target.value,
                        }))
                  }
                  required={required}
                  {...rest}
                >
                  <option>{t("Comp.Form.PleaseChoose")}</option>

                  {options?.map(({ value, label }, x) => (
                    <option value={value} key={x}>
                      {label || value}
                    </option>
                  ))}
                </select>
              ) : type === "boolean" ? (
                <div>
                  <div className="form-check">
                    <input
                      name={name}
                      className="form-check-input"
                      checked={formValues[name]}
                      onChange={(e) =>
                        onChange
                          ? onChange(e, setFormValues)
                          : setFormValues((current) => ({
                              ...current,
                              [name]: true,
                            }))
                      }
                      type="radio"
                      {...rest}
                    />

                    <label className="form-check-label text-success">
                      <FontAwesomeIcon icon={faCheckCircle} /> Active
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      name={name}
                      className="form-check-input"
                      checked={!formValues[name]}
                      onChange={(e) =>
                        onChange
                          ? onChange(e, setFormValues)
                          : setFormValues((current) => ({
                              ...current,
                              [name]: false,
                            }))
                      }
                      type="radio"
                      {...rest}
                    />

                    <label className="form-check-label text-danger">
                      <FontAwesomeIcon icon={faXmarkCircle} /> Inactive
                    </label>
                  </div>
                </div>
              ) : type === "dynamicList" ? (
                <div className="w-100">
                  <div className="overflow-auto">
                    <table className="table table-bordered table-responsive">
                      <thead>
                        <tr>
                          {inputs?.map((input, x) => (
                            <th key={x}>
                              {input.label}
                              {input.required ? (
                                <span className="ms-1 text-danger"> *</span>
                              ) : (
                                ""
                              )}
                            </th>
                          ))}

                          <th
                            role="button"
                            onClick={() =>
                              setFormValues((current) => ({
                                ...current,
                                [name]: formValues[name]
                                  ? [...formValues[name], {}]
                                  : [{}],
                              }))
                            }
                            className="text-success"
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {formValues[name]?.map(
                          (value: dynamicObject, x = 0) => (
                            <tr key={x}>
                              {inputs?.map((input, y) => (
                                <td key={y}>
                                  <input
                                    {...input}
                                    name={input.name}
                                    value={value[input.name]}
                                    onChange={(e) =>
                                      onChange
                                        ? onChange(e, setFormValues)
                                        : setFormValues((current) => ({
                                            ...current,
                                            [name]: current[name].map(
                                              (ele = {}, z = 0) =>
                                                z === x
                                                  ? {
                                                      ...ele,
                                                      [input.name]:
                                                        e.target.value,
                                                    }
                                                  : ele
                                            ),
                                          }))
                                    }
                                    required={input.required}
                                    className="form-control"
                                  />
                                </td>
                              ))}

                              <td
                                role="button"
                                onClick={() =>
                                  setFormValues((current) => ({
                                    ...current,
                                    [name]: current[name].filter(
                                      (_ = {}, z = 0) => z !== x
                                    ),
                                  }))
                                }
                                className="text-danger"
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <input
                  name={name}
                  type={type}
                  value={formValues[name]}
                  onChange={(e) =>
                    onChange
                      ? onChange(e, setFormValues)
                      : setFormValues((current) => ({
                          ...current,
                          [name]: e.target.value,
                        }))
                  }
                  className="form-control"
                  required={required}
                  {...rest}
                />
              )}

              {afterText && (
                <span className="input-group-text">{afterText}</span>
              )}
            </div>

            {subLabel && (
              <div className="text-justify mt-1 mb-3 text-muted">
                <small>{subLabel}</small>
              </div>
            )}
          </div>
        )
      )}

      <div className="col-xs-12">
        <button
          className="btn btn-primary my-4 p-3 w-100 text-white"
          type="submit"
          disabled={!!loading.length}
        >
          {!!loading.length ? (
            <span
              className="spinner-grow text-light spinner-border-sm"
              aria-hidden="true"
            />
          ) : (
            t("Comp.Form.Submit")
          )}
        </button>
      </div>
    </form>
  );
};

export default Form;
