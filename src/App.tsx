import { Fragment } from "react/jsx-runtime";
import Consumption from "./Views/Consumption";
import Schedule from "./Views/Schedule";

const App = () => {
  return (
    <Fragment>
      <p>Welcome To `Personal Diet Tracker`</p>

      <Consumption />

      <Schedule />
    </Fragment>
  );
};

export default App;
