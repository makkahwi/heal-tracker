import { Fragment } from "react";

import Elements from "./Elements";
import Meals from "./Meals";
import Schedules from "./Schedules";

const Schedule = () => {
  return (
    <Fragment>
      <Elements />
      <Meals />
      <Schedules />
    </Fragment>
  );
};

export default Schedule;
