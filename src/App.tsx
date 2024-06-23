import { Fragment } from "react/jsx-runtime";
import Layout from "./Layout";
import Consumption from "./Views/Consumption";
import Schedule from "./Views/Schedule";
import logo from "./logo.svg";

const App = () => {
  return (
    <Layout>
      <Fragment>
        <img src={logo} className="App-logo" alt="logo" />

        <p>Welcome To `Personal Diet Tracker`</p>

        <Schedule />

        <Consumption />
      </Fragment>
    </Layout>
  );
};

export default App;
