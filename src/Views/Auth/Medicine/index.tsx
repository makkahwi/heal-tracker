import { Fragment } from "react";

import MedicineConsumption from "./Consumption";
import MedicineSchedule from "./Schedule";

const Medicine = () => {
  return (
    <Fragment>
      <MedicineConsumption />
      <MedicineSchedule />
    </Fragment>
  );
};

export default Medicine;
