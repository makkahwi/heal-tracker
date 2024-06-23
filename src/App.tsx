import { Fragment } from "react/jsx-runtime";
import Layout from "./Layout";
import logo from "./logo.svg";

const App = () => {
  return (
    <Layout>
      <Fragment>
        <img src={logo} className="App-logo" alt="logo" />

        <p>Welcome To `Personal Diet Tracker`</p>
      </Fragment>
    </Layout>
  );
};

export default App;
