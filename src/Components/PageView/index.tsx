import { faTrash } from "@fortawesome/free-solid-svg-icons";
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
  return (
    <PageSection title={title}>
      <Fragment>
        <Form inputs={inputs} onSubmit={onSubmit} />

        <div className="d-none d-xl-block">
          <table className="table table-bordered table-responsive table-striped">
            <thead>
              <tr className="align-middle">
                {inputs.map(({ label }, x) => (
                  <th>{label}</th>
                ))}

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map(({ id, ...row }, i) => (
                <tr className="align-middle" key={i}>
                  {inputs.map(({ name, render }, x) => (
                    <td key={x}>{render ? render(row) : (row as any)[name]}</td>
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
      </Fragment>
    </PageSection>
  );
};

export default PageView;
