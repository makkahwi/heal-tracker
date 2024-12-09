import { Fragment, useEffect, useState } from "react";

import * as BeAPI from "../../../../API";
import PageSection from "../../../../Components/PageView/PageSection";
import Elements from "./Elements";
import Meals, { SchedulesMealProps } from "./Meals";
import Schedules from "./Schedules";
import { ScheduleProps } from "./Schedules";

const Schedule = () => {
  const [meals, setMeals] = useState<SchedulesMealProps[]>([]);
  const [schedules, setSchedules] = useState<ScheduleProps[]>([]);

  const getMealsData = () => {
    BeAPI.getAll("scheduleMeals")
      .then((res: SchedulesMealProps[]) =>
        setMeals(
          res
            .sort((a, b) => (a.time < b.time ? -1 : 1))
            .sort((a, b) => (a.schedule < b.schedule ? 1 : -1))
        )
      )
      .catch((err) => console.log({ err }));
  };

  const getSchedulesData = () => {
    BeAPI.getAll("schedules")
      .then((res: ScheduleProps[]) =>
        setSchedules(res.sort((a, b) => (a.order < b.order ? 1 : -1)))
      )
      .catch((err) => console.log({ err }));
  };

  useEffect(() => {
    getSchedulesData();
    getMealsData();
  }, []);

  return (
    <PageSection title="Diet Schedules">
      <Fragment>
        <div className="btn-group my-3 w-100">
          <button
            className="btn btn-secondary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#elements"
            aria-expanded="false"
            aria-controls="elements"
          >
            Meal Elements
          </button>

          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#meals"
            aria-expanded="false"
            aria-controls="meals"
          >
            Schedule Meals
          </button>

          <button
            className="btn btn-secondary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#schedules"
            aria-expanded="false"
            aria-controls="schedules"
          >
            Schedules
          </button>
        </div>

        <div className="collapse multi-collapse" id="elements">
          <Elements meals={meals} schedules={schedules} />
        </div>

        <div className="collapse multi-collapse" id="meals">
          <Meals data={meals} schedules={schedules} getData={getMealsData} />
        </div>

        <div className="collapse multi-collapse" id="schedules">
          <Schedules data={schedules} getData={getSchedulesData} />
        </div>
      </Fragment>
    </PageSection>
  );
};

export default Schedule;
