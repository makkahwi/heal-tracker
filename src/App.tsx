import { Fragment } from "react/jsx-runtime";

import Consumption from "./Views/Consumption";
import Meals from "./Views/Meals";
import Schedule from "./Views/Schedule";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./Views/Welcome";

export const routes = [
  {
    name: "Consumption",
    path: "consumption",
    Comp: <Consumption />,
  },
  {
    name: "Schedule",
    path: "schedule",
    Comp: <Schedule />,
  },
  {
    name: "Meals",
    path: "meals",
    Comp: <Meals />,
  },
];

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
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
