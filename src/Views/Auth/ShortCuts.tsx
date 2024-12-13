import moment from "moment";
import { useEffect, useState } from "react";

import * as BeAPI from "../../API";
import { medicineProps } from "./Medicine/Consumption";
import { medicineScheduleProps } from "./Medicine/Schedule";

const ShortCuts = () => {
  const [data, setData] = useState<medicineProps[]>([]);
  const [schedule, setSchedule] = useState<medicineScheduleProps[]>([]);

  const getData = () => {
    BeAPI.getAll("medicine-schedule")
      .then((res: medicineScheduleProps[]) => {
        setSchedule(res);

        BeAPI.getAll("medicine")
          .then((resp: medicineProps[]) =>
            setData(
              resp
                ?.sort((a: medicineProps, b: medicineProps) =>
                  a.date > b.date ? -1 : 1
                )
                .map(({ medicine, ...rest }) => {
                  const med = res.find(({ id }) => id === medicine);

                  return {
                    ...rest,
                    ...med,
                    medicine: med?.medicine + " (" + med?.specs + ")" || "",
                  };
                })
            )
          )
          .catch((err) => console.log({ err }));
      })
      .catch((err) => console.log({ err }));
  };

  const submitMedicine = (values: medicineProps) => {
    BeAPI.create("medicine", values).catch((err) => console.log({ err }));
  };

  useEffect(() => {
    getData();
  }, []);

  const shortcuts = [
    // {
    //   label: "Just Consumed 1 Cup of Water",
    //   data: "",
    // },
    ...schedule.map(({ id, medicine, specs, frequencyQuantity }) => ({
      type: "medicine",
      data: { value: id || "", quantity: frequencyQuantity },
      label: frequencyQuantity + " of " + medicine + " (" + specs + ") ",
    })),
  ];

  return (
    <div className="row py-4 align-items-center justify-content-center">
      <div className={`col-md-${2}`}>Shortcuts</div>

      {/* Medicine Actions */}
      <div className={`col-md-${2}`}>
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle text-white"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Just Consumed Medicine
          </button>

          <ul className="dropdown-menu">
            {shortcuts
              .filter(({ type }) => type == "medicine")
              .map(({ label, data }, i) => (
                <li
                  onClick={() =>
                    submitMedicine({
                      date: moment().format("yyyy-MM-DD"),
                      time: moment().format("HH:mm"),
                      quantity: data.quantity,
                      medicine: data.value,
                    })
                  }
                  key={i}
                >
                  <div className="dropdown-item" role="button">
                    {label}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShortCuts;
