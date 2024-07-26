import {
  faCalendar,
  faClock,
  faFileMedical,
  faPills,
  faRunning,
  faUtensils,
  faWeight,
} from "@fortawesome/free-solid-svg-icons";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./Components/Layout/Navbar";
import store from "./Store/store";
import Consumption from "./Views/Auth/Diet/Consumption";
import Meals from "./Views/Auth/Diet/Meals";
import Schedule from "./Views/Auth/Diet/Schedule";
import LabTests from "./Views/Auth/LabTests";
import Medicine from "./Views/Auth/Medicine";
import Login from "./Views/Public/Login";
import Sports from "./Views/Auth/Sports/WalkExercises";
import WeightReadings from "./Views/Auth/WeightReadings";
import Welcome from "./Views/Auth/Welcome";

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
    name: "Walk Exercises",
    path: "walk-exercises",
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
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />

        {store.getState().auth.user ? (
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
        ) : (
          <Routes>
            <Route path="*" element={<Login />} />
          </Routes>
        )}
      </BrowserRouter>
    </Provider>
  );
};

export default App;
