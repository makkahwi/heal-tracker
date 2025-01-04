import {
  faBed,
  faCalendar,
  faFileMedical,
  faPills,
  faRunning,
  faStarAndCrescent,
  faToilet,
  faUtensils,
  faWater,
  faWeight,
} from "@fortawesome/free-solid-svg-icons";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import i18n from "./i18n";
import Layout from "./Layout";
import store from "./Store/store";
import Dashboard from "./Views/Auth/Dashboard";
import Consumption from "./Views/Auth/Diet/Consumption";
import Fasting from "./Views/Auth/Diet/Fasting";
import Schedule from "./Views/Auth/Diet/Schedule";
import Watering from "./Views/Auth/Diet/Watering";
import LabTests from "./Views/Auth/LabTests";
import Manual from "./Views/Auth/Manual";
import MedicineConsumption from "./Views/Auth/Medicine/Consumption";
import MedicineSchedule from "./Views/Auth/Medicine/Schedule";
import Relief from "./Views/Auth/Relief";
import Settings from "./Views/Auth/Settings";
import SleepCycles from "./Views/Auth/SleepCycles";
import Sports from "./Views/Auth/Sports";
import WeeklySummary from "./Views/Auth/WeeklySummary";
import WeightReadings from "./Views/Auth/WeightReadings";
import Landing from "./Views/Public/Landing";
import Login from "./Views/Public/Login";

import "./App.css";
import "./index.css";
import "./Style/custom.scss";

export const routes = [
  {
    label: i18n.t("Layout.Diet"),
    path: "diet",
    icon: faUtensils,
    list: [
      {
        name: "diet_consumption",
        label: i18n.t("Services.Diet.Consumption.ConsumedMeals"),
        path: "consumption",
        icon: faUtensils,
        Comp: <Consumption />,
      },
      {
        name: "diet_schedule",
        label: i18n.t("Services.Diet.Schedule.DietSchedules"),
        path: "schedule",
        icon: faCalendar,
        Comp: <Schedule />,
      },
      {
        name: "watering",
        label: i18n.t("Services.Diet.Watering.Watering"),
        path: "watering",
        icon: faWater,
        Comp: <Watering />,
      },
      {
        name: "fasting",
        label: i18n.t("Services.Diet.Fasting.Fasting"),
        path: "fasting",
        icon: faStarAndCrescent,
        Comp: <Fasting />,
      },
    ],
  },
  {
    name: "relief",
    label: i18n.t("Services.Relief.Relief"),
    path: "relief",
    icon: faToilet,
    Comp: <Relief />,
  },
  {
    name: "sport",
    label: i18n.t("Services.Sports.SportSessions"),
    path: "sport-sessions",
    icon: faRunning,
    Comp: <Sports />,
  },
  {
    name: "sleep",
    label: i18n.t("Services.SleepCycles.SleepCycles"),
    path: "sleep-cycles",
    icon: faBed,
    Comp: <SleepCycles />,
  },
  {
    label: i18n.t("Layout.Medicine"),
    path: "medicine",
    icon: faPills,
    list: [
      {
        name: "medicine_consumption",
        label: i18n.t("Services.Medicine.ConsumedMedicines"),
        path: "consumption",
        icon: faPills,
        Comp: <MedicineConsumption />,
      },
      {
        name: "medicine_schedule",
        label: i18n.t("Services.Medicine.MedicineSchedule"),
        path: "schedule",
        icon: faCalendar,
        Comp: <MedicineSchedule />,
      },
    ],
  },
  {
    name: "weight_readings",
    label: i18n.t("Services.WeightReadings.WeightReadings"),
    path: "weight-readings",
    icon: faWeight,
    Comp: <WeightReadings />,
  },
  {
    name: "lab_tests",
    label: i18n.t("Services.LabTests.LabTestsList"),
    path: "lab-tests",
    icon: faFileMedical,
    Comp: <LabTests />,
  },
]
  .filter(({ name, list }) =>
    list
      ? list.map(
          ({ name }) => (store.getState().settings.activation as any)[name]
        )?.length
      : (store.getState().settings.activation as any)[name]
  )
  .map(({ list, ...rest }) => {
    if (list?.length)
      return {
        ...rest,
        list: list.filter(
          ({ name }) => (store.getState().settings.activation as any)[name]
        ),
      };

    return { list, ...rest };
  });

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          {store.getState().auth.user ? (
            <Routes>
              {routes.map(({ path, Comp, list }, i) =>
                list ? (
                  list.map(({ path: childPath, Comp }, x) => (
                    <Route
                      path={path + "/" + childPath}
                      element={Comp}
                      key={x}
                    />
                  ))
                ) : (
                  <Route path={path} element={Comp} key={i} />
                )
              )}

              <Route path="manual" element={<Manual />} />
              <Route path="settings" element={<Settings />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="summary" element={<WeeklySummary />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="login" element={<Login />} />
              <Route path="/" element={<Landing />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
