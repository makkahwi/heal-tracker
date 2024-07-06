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
    icon: "fa-solid fa-utensils",
    Comp: <Consumption />,
  },
  {
    name: "Schedule",
    path: "schedule",
    icon: "fa-solid fa-calendar",
    Comp: <Schedule />,
  },
  {
    name: "Meals",
    path: "meals",
    icon: "fa-solid fa-clock",
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
