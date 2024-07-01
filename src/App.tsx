import { Fragment } from "react/jsx-runtime";

import Consumption from "./Views/Consumption";
import Meals from "./Views/Meals";
import Schedule from "./Views/Schedule";

const App = () => {
  return (
    <Fragment>
      <p>Welcome To `Personal Diet Tracker`</p>

      <Consumption />

      <Schedule />

      <Meals/>
    </Fragment>
  );
};

export default App;
