import moment from "moment";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";

import * as BeAPI from "../../../../API";
import PageSection from "../../../../Components/PageView/PageSection";
import {
  mapElementToScheduleElement,
  Model2Recommendation,
  recommendWeeklyHealthModel2,
} from "../../../../Utils/weeklyHealthModel2";
import { walkExerciseProps } from "../../Sports";
import { weightReadingProps } from "../../WeightReadings";
import { consumptionProps } from "../Consumption";
import { SchedulesMealElementProps } from "../Schedule/Elements";
import { SchedulesMealProps } from "../Schedule/Meals";
import { ScheduleProps } from "../Schedule/Schedules";

interface CreatedMealView {
  id: string;
  meal: string;
  time: string;
  items: SchedulesMealElementProps[];
}

interface CreatedScheduleView {
  id: string;
  order: number;
  date: string;
  meals: CreatedMealView[];
}

const AiSchedule = () => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [statusNote, setStatusNote] = useState("");
  const [recommendation, setRecommendation] = useState<Model2Recommendation>();
  const [createdSchedule, setCreatedSchedule] = useState<CreatedScheduleView>();

  const loadCreatedScheduleView = async (
    scheduleId: string,
    order: number,
    date: string,
  ): Promise<CreatedScheduleView> => {
    const [allMeals, allElements] = await Promise.all([
      BeAPI.getAll("scheduleMeals"),
      BeAPI.getAll("scheduleMealElements"),
    ]);

    const meals = (allMeals as SchedulesMealProps[])
      .filter((meal) => String(meal.schedule) === scheduleId)
      .sort((a, b) => (a.time < b.time ? -1 : 1));

    const mealIds = new Set(meals.map(({ id }) => String(id)));

    const elements = (allElements as SchedulesMealElementProps[]).filter(
      ({ meal }) => meal && mealIds.has(String(meal)),
    );

    return {
      id: scheduleId,
      order,
      date,
      meals: meals.map((meal) => ({
        id: String(meal.id),
        meal: meal.meal,
        time: meal.time,
        items: elements.filter(
          (element) => String(element.meal) === String(meal.id),
        ),
      })),
    };
  };

  const runAiPlanner = async () => {
    setLoading(true);
    setError("");
    setStatusNote("");
    setCreatedSchedule(undefined);

    try {
      const [weightReadings, consumed, sportSessions, schedules] =
        await Promise.all([
          BeAPI.getAll("WeightReadings"),
          BeAPI.getAll("consumed"),
          BeAPI.getAll("sportSessions"),
          BeAPI.getAll("schedules"),
        ]);

      const modelOutput = recommendWeeklyHealthModel2({
        weightReadings: weightReadings as weightReadingProps[],
        consumed: consumed as consumptionProps[],
        sportSessions: sportSessions as walkExerciseProps[],
      });

      setRecommendation(modelOutput);

      if (modelOutput.decision === "maintain_schedule") {
        setStatusNote(t("Services.Diet.AiSchedule.MaintainNote"));
        return;
      }

      const currentSchedules = schedules as ScheduleProps[];
      const maxOrder = currentSchedules.reduce(
        (max, schedule) => (schedule.order > max ? schedule.order : max),
        0,
      );

      const newOrder = maxOrder + 1;
      const newDate = moment().format("YYYY-MM-DD");

      const createdScheduleResp = await BeAPI.create("schedules", {
        order: newOrder,
        date: newDate,
      });

      const scheduleId = (createdScheduleResp as any)?.name;

      if (!scheduleId) {
        throw new Error("Failed to create schedule record");
      }

      for (const meal of modelOutput.nextWeekSchedule) {
        const createdMealResp = await BeAPI.create("scheduleMeals", {
          schedule: scheduleId,
          meal: meal.meal,
          time: meal.time,
        });

        const mealId = (createdMealResp as any)?.name;

        if (!mealId) {
          throw new Error(`Failed to create schedule meal for ${meal.meal}`);
        }

        for (const item of meal.items) {
          await BeAPI.create(
            "scheduleMealElements",
            mapElementToScheduleElement(mealId, item),
          );
        }
      }

      const created = await loadCreatedScheduleView(
        scheduleId,
        newOrder,
        newDate,
      );
      setCreatedSchedule(created);
      setStatusNote(
        t("Services.Diet.AiSchedule.CreatedNote", { order: newOrder }),
      );
    } catch (err: unknown) {
      setError(
        (err as Error)?.message ||
          "Unexpected error while generating AI schedule.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageSection
      title={t("Services.Diet.AiSchedule.Title")}
      desc={t("Services.Diet.AiSchedule.Desc.Page")}
    >
      <Fragment>
        <button
          className="btn btn-primary p-3 text-white"
          onClick={runAiPlanner}
          disabled={loading}
          type="button"
        >
          {loading
            ? t("Services.Diet.AiSchedule.Running")
            : t("Services.Diet.AiSchedule.Generate")}
        </button>

        {statusNote ? (
          <div className="alert alert-info mt-4" role="alert">
            {statusNote}
          </div>
        ) : (
          ""
        )}

        {error ? (
          <div className="alert alert-danger mt-4" role="alert">
            {error}
          </div>
        ) : (
          ""
        )}

        {recommendation ? (
          <div className="mt-4">
            <h5>{t("Services.Diet.AiSchedule.Analysis")}</h5>
            <div>
              {t("Services.Diet.AiSchedule.Period")}:{" "}
              {recommendation.analysisWeekStart} -{" "}
              {recommendation.analysisWeekEnd}
            </div>
            <div>
              {t("Services.Diet.AiSchedule.Decision")}:{" "}
              <strong>{recommendation.decision}</strong>
            </div>

            <ul className="list-group mt-2">
              {recommendation.reasons.map((reason) => (
                <li className="list-group-item text-start" key={reason}>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}

        {createdSchedule ? (
          <div className="mt-4">
            <h5>
              {t("Services.Diet.AiSchedule.CreatedSchedule")} #
              {createdSchedule.order}
            </h5>
            <div>
              {t("Services.Diet.Schedule.GivingDate")}: {createdSchedule.date}
            </div>

            {createdSchedule.meals.map((meal) => (
              <div className="card mt-3" key={meal.id}>
                <div className="card-body">
                  <h6 className="card-title mb-3">
                    {meal.meal} ({meal.time})
                  </h6>
                  <div className="table-responsive">
                    <table className="table table-bordered mb-0">
                      <thead>
                        <tr>
                          <th>{t("Services.Diet.Schedule.Element")}</th>
                          <th>{t("Services.Diet.Schedule.Quantity")}</th>
                          <th>{t("Services.Diet.Schedule.Unit")}</th>
                          <th>{t("Services.Diet.Consumption.Note")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {meal.items.map((item, index) => (
                          <tr key={`${meal.id}-${item.element}-${index}`}>
                            <td>{item.element}</td>
                            <td>{item.count}</td>
                            <td>{item.unit}</td>
                            <td>{item.note || "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </Fragment>
    </PageSection>
  );
};

export default AiSchedule;
