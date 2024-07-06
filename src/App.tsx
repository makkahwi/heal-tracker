import { faCalendar, faClock, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

import Navbar from "./Components/Layout/Navbar";
import Consumption from "./Views/Consumption";
import Meals from "./Views/Meals";
import Schedule from "./Views/Schedule";
import Welcome from "./Views/Welcome";

export const routes = [
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
];

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {routes.map(({ name, path, Comp }, i) => (
            <Route path={path} element={Comp} key={i} />
          ))}

          <Route path="*" element={<Welcome />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
