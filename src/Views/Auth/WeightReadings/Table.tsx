import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { fullWeightReadingProps } from ".";
import { dayDateFormat } from "../../../Utils/consts";

const WeightReadingsTable = ({
  data,
  onDelete,
}: {
  data: fullWeightReadingProps[];
  onDelete: Function;
}) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <div className="d-none d-xl-block">
        <table className="table table-bordered table-responsive table-striped">
          <thead>
            <tr className="align-middle">
              <th>{t("Services.WeightReadings.Date")}</th>
              <th>{t("Services.WeightReadings.Weight")}</th>
              <th>{t("Services.WeightReadings.Muscles")}</th>
              <th>{t("Services.WeightReadings.Water")}</th>
              <th>{t("Services.WeightReadings.Fat Weight")}</th>
              <th>{t("Services.WeightReadings.Waist Fat")}</th>
              <th>{t("Services.WeightReadings.Actions")}</th>
            </tr>
          </thead>

          <tbody>
            {data?.map(
              ({ id, date, weight, fat, water, waist, muscles }, i) => (
                <Fragment key={i}>
                  <tr className="align-middle">
                    <td>{dayDateFormat(date)}</td>
                    <td>
                      {weight}
                      {t("Common.Labels.KG")}
                    </td>
                    <td>
                      {muscles}
                      {t("Common.Labels.KG")}
                    </td>
                    <td>{water}L</td>
                    <td>
                      {fat}
                      {t("Common.Labels.KG")}
                    </td>
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
                  <th>{t("Services.WeightReadings.Date")}</th>
                  <td>{dayDateFormat(date)}</td>
                </tr>

                <tr className="align-middle">
                  <th>{t("Services.WeightReadings.Weight")}</th>
                  <td>{weight}</td>
                </tr>

                <tr className="align-middle">
                  <th>{t("Services.WeightReadings.Muscles")}</th>
                  <td>{muscles}</td>
                </tr>

                {/* <tr className="align-middle">
                    <th>Muscles Weight</th>
                    <td>{muscles}</td>
                  </tr> */}

                <tr className="align-middle">
                  <th>{t("Services.WeightReadings.Water Volume")}</th>
                  <td>{water}</td>
                </tr>

                <tr className="align-middle">
                  <th>{t("Services.WeightReadings.Fat Weight")}</th>
                  <td>{fat}</td>
                </tr>

                <tr className="align-middle">
                  <th>{t("Services.WeightReadings.Waist Fat")}</th>
                  <td>{waist}</td>
                </tr>

                <tr className="align-middle">
                  <th>{t("Services.WeightReadings.Actions")}</th>
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
