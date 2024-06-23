import { Fragment } from "react/jsx-runtime";
import Consumption from "./Views/Consumption";
import Schedule from "./Views/Schedule";
import logo from "./logo.svg";

const App = () => {
  return (
    <Fragment>
      <img src={logo} className="App-logo" alt="logo" />

      <p>Welcome To `Personal Diet Tracker`</p>

      <Consumption />

      <Schedule />
    </Fragment>
  );
};

export default App;
