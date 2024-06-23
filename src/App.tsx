import { Fragment } from "react/jsx-runtime";
import Layout from "./Layout";
import logo from "./logo.svg";
import Schedule from "./Views/Schedule";
import Consumption from "./Views/Consumption";
import Tracker from "./Views/Tracker";

const App = () => {
  return (
    <Layout>
      <Fragment>
        <img src={logo} className="App-logo" alt="logo" />

        <p>Welcome To `Personal Diet Tracker`</p>

        <Schedule />

        <Consumption />

        <Tracker />
      </Fragment>
    </Layout>
  );
};

export default App;
