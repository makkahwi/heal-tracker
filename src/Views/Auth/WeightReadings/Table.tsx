import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";

import { fullWeightReadingProps } from ".";
import { dayDateFormat } from "../../../Utils/consts";

const WeightReadingsTable = ({
  data,
  onDelete,
}: {
  data: fullWeightReadingProps[];
  onDelete: Function;
}) => {
  return (
    <Fragment>
      <div className="d-none d-xl-block">
        <table className="table table-bordered table-responsive table-striped">
          <thead>
            <tr className="align-middle">
              <th>Date</th>
              <th>Weight</th>
              <th>Fat Reading</th>
              <th>Fat Weight</th>
              <th>Water Reading</th>
              <th>Waist Fat</th>
              <th>Muscles Reading</th>
              <th>Muscles Percentage</th>
              <th>Physique Rating</th>
              <th>Bones Mass</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data?.map(
              (
                {
                  id,
                  date,
                  weight,
                  fat,
                  water,
                  waist,
                  muscles,
                  fatWeight,
                  musclesPercentage,
                  physique,
                  bones,
                },
                i
              ) => (
                <Fragment key={i}>
                  <tr className="align-middle">
                    <td>{dayDateFormat(date)}</td>
                    <td>{weight}</td>
                    <td>{fat}</td>
                    <td>{fatWeight}</td>
                    <td>{water}</td>
                    <td>{waist}</td>
                    <td>{muscles}</td>
                    <td>{musclesPercentage}</td>
                    <td>{physique}</td>
                    <td>{bones}</td>
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
                </Fragment>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="d-block d-xl-none">
        {data?.map(
          (
            {
              id,
              date,
              weight,
              fat,
              water,
              waist,
              muscles,
              fatWeight,
              musclesPercentage,
              physique,
              bones,
            },
            i
          ) => (
            <div className="card p-3 py-4 my-4 w-100" key={i}>
              <table className="table table-bordered table-responsive table-striped">
                <tbody>
                  <tr className="align-middle">
                    <th>Date</th>
                    <td>{dayDateFormat(date)}</td>
                  </tr>

                  <tr className="align-middle">
                    <th>Weight</th>
                    <td>{weight}</td>
                  </tr>

                  <tr className="align-middle">
                    <th>Fat Reading</th>
                    <td>{fat}</td>
                  </tr>

                  <tr className="align-middle">
                    <th>Fat Weight</th>
                    <td>{fatWeight}</td>
                  </tr>

                  <tr className="align-middle">
                    <th>Water Reading</th>
                    <td>{water}</td>
                  </tr>

                  <tr className="align-middle">
                    <th>Waist Fat</th>
                    <td>{waist}</td>
                  </tr>

                  <tr className="align-middle">
                    <th>Muscles Reading</th>
                    <td>{muscles}</td>
                  </tr>

                  <tr className="align-middle">
                    <th>Muscles Percentage</th>
                    <td>{musclesPercentage}</td>
                  </tr>

                  <tr className="align-middle">
                    <th>Physique Rating</th>
                    <td>{physique}</td>
                  </tr>

                  <tr className="align-middle">
                    <th>Bones Mass</th>
                    <td>{bones}</td>
                  </tr>

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
          )
        )}
      </div>
    </Fragment>
  );
};

export default WeightReadingsTable;
