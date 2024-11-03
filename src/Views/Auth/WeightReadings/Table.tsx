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
              <th>Muscles</th>
              <th>Water</th>
              <th>Fat Weight</th>
              <th>Waist Fat</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data?.map(
              ({ id, date, weight, fat, water, waist, muscles }, i) => (
                <Fragment key={i}>
                  <tr className="align-middle">
                    <td>{dayDateFormat(date)}</td>
                    <td>{weight}KG</td>
                    <td>{muscles}KG</td>
                    <td>{water}L</td>
                    <td>{fat}KG</td>
                    <td>{waist}</td>
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
        {data?.map(({ id, date, weight, fat, water, waist, muscles }, i) => (
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
                  <th>Muscles</th>
                  <td>{muscles}</td>
                </tr>

                {/* <tr className="align-middle">
                    <th>Muscles Weight</th>
                    <td>{muscles}</td>
                  </tr> */}

                <tr className="align-middle">
                  <th>Water Volume</th>
                  <td>{water}</td>
                </tr>

                <tr className="align-middle">
                  <th>Fat Weight</th>
                  <td>{fat}</td>
                </tr>

                <tr className="align-middle">
                  <th>Waist Fat</th>
                  <td>{waist}</td>
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
        ))}
      </div>
    </Fragment>
  );
};

export default WeightReadingsTable;
