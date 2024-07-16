import {
  faCalendar,
  faClock,
  faFileMedical,
  faPills,
  faRunning,
  faUtensils,
  faWeight,
} from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

import Navbar from "./Components/Layout/Navbar";
import Consumption from "./Views/Consumption";
import LabTests from "./Views/LabTests";
import Meals from "./Views/Meals";
import Medicine from "./Views/Medicine";
import Schedule from "./Views/Schedule";
import Sports from "./Views/Sports";
import WeightReadings from "./Views/WeightReadings";
import Welcome from "./Views/Welcome";

export const routes = [
  {
    name: "Diet",
    path: "diet",
    icon: faUtensils,
    list: [
      {
        name: "Consumption",
        path: "consumption",
        icon: faUtensils,
        Comp: <Consumption />,
      },
      {
        name: "Schedule",
        path: "schedule",
        icon: faCalendar,
        Comp: <Schedule />,
      },
      {
        name: "Meals",
        path: "meals",
        icon: faClock,
        Comp: <Meals />,
      },
    ],
  },
  {
    name: "Sport Sessions",
    path: "sport-sessions",
    icon: faRunning,
    Comp: <Sports />,
  },
  {
    name: "Medicine",
    path: "medicine",
    icon: faPills,
    Comp: <Medicine />,
  },
  {
    name: "Weight Readings",
    path: "weight-readings",
    icon: faWeight,
    Comp: <WeightReadings />,
  },
  {
    name: "Lab Tests",
    path: "lab-tests",
    icon: faFileMedical,
    Comp: <LabTests />,
  },
];

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {routes.map(({ name, path, Comp, list }, i) =>
            list ? (
              list.map(({ name, path, Comp }, x) => (
                <Route path={path} element={Comp} key={x} />
              ))
            ) : (
              <Route path={path} element={Comp} key={i} />
            )
          )}

          <Route path="*" element={<Welcome />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
