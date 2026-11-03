import moment from "moment";
import { FormEvent, Fragment, useState } from "react";
import { useTranslation } from "react-i18next";

import * as BeAPI from "../../../../API";
import { generateWeeklySchedule } from "../../../../API/ChatGPT";
import PageSection from "../../../../Components/PageView/PageSection";
import {
  mapElementToScheduleElement,
  Model2Recommendation,
  PlanningPreferences,
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
  const [preferences, setPreferences] = useState<PlanningPreferences>({
    plannedExercise: false,
    wakeTime: "07:00",
    sleepTime: "23:00",
    lunchTime: "13:00",
    notes: "",
  });
  const [exerciseAnswer, setExerciseAnswer] = useState("");
  const [saving, setSaving] = useState(false);

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

  const runAiPlanner = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setStatusNote("");
    setRecommendation(undefined);
    setCreatedSchedule(undefined);

    try {
      const [weightReadings, consumed, sportSessions] = await Promise.all([
        BeAPI.getAll("WeightReadings"),
        BeAPI.getAll("consumed"),
        BeAPI.getAll("sportSessions"),
      ]);
      const modelOutput = recommendWeeklyHealthModel2({
        weightReadings: weightReadings as weightReadingProps[],
        consumed: consumed as consumptionProps[],
        sportSessions: sportSessions as walkExerciseProps[],
        preferences: {
          ...preferences,
          plannedExercise: exerciseAnswer === "yes",
        },
      });
      const generatedMeals = await generateWeeklySchedule(modelOutput, {
        ...preferences,
        plannedExercise: exerciseAnswer === "yes",
      });
      setRecommendation({ ...modelOutput, nextWeekSchedule: generatedMeals });
      if (modelOutput.decision === "maintain_schedule") {
        setStatusNote(t("Services.Diet.AiSchedule.MaintainNote"));
      }
    } catch (err: unknown) {
      setError(
        (err as Error)?.message || t("Services.Diet.AiSchedule.GenerateError"),
      );
    } finally {
      setLoading(false);
    }
  };

  const saveSchedule = async () => {
    if (!recommendation || saving || createdSchedule) return;
    setSaving(true);
    setError("");
    const created: { table: string; id: string }[] = [];
    try {
      const schedules = (await BeAPI.getAll("schedules")) as ScheduleProps[];
      const newOrder =
        Math.max(0, ...schedules.map(({ order }) => Number(order) || 0)) + 1;
      const newDate = moment().format("YYYY-MM-DD");
      const scheduleResponse = await BeAPI.create("schedules", {
        order: newOrder,
        date: newDate,
      });
      const scheduleId = scheduleResponse?.data?.name;
      if (!scheduleId) throw new Error("Failed to create schedule record");
      created.push({ table: "schedules", id: scheduleId });

      for (const meal of recommendation.nextWeekSchedule) {
        const mealResponse = await BeAPI.create("scheduleMeals", {
          schedule: scheduleId,
          meal: meal.meal,
          time: meal.time,
        });
        const mealId = mealResponse?.data?.name;
        if (!mealId)
          throw new Error(`Failed to create schedule meal for ${meal.meal}`);
        created.push({ table: "scheduleMeals", id: mealId });
        for (const item of meal.items) {
          const elementResponse = await BeAPI.create(
            "scheduleMealElements",
            mapElementToScheduleElement(mealId, item),
          );
          const elementId = elementResponse?.data?.name;
          if (!elementId) throw new Error("Failed to create meal element");
          created.push({ table: "scheduleMealElements", id: elementId });
        }
      }
      setCreatedSchedule(
        await loadCreatedScheduleView(scheduleId, newOrder, newDate),
      );
      setStatusNote(
        t("Services.Diet.AiSchedule.CreatedNote", { order: newOrder }),
      );
    } catch (err: unknown) {
      for (const record of created.reverse()) {
        try {
          await BeAPI.remove(record.table, record.id);
        } catch (_) {
          /* Keep original error. */
        }
      }
      setError(
        (err as Error)?.message || t("Services.Diet.AiSchedule.SaveError"),
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageSection
      title={t("Services.Diet.AiSchedule.Title")}
      desc={t("Services.Diet.AiSchedule.Desc.Page")}
    >
      <Fragment>
        <form onSubmit={runAiPlanner} className="text-start">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label" htmlFor="planned-exercise">
                {t("Services.Diet.AiSchedule.PlannedExercise")}
              </label>
              <select
                id="planned-exercise"
                className="form-select"
                value={exerciseAnswer}
                onChange={(event) => setExerciseAnswer(event.target.value)}
                required
                defaultValue="yes"
              >
                <option value="">{t("Services.Diet.AiSchedule.Choose")}</option>
                <option value="yes">{t("Services.Diet.AiSchedule.Yes")}</option>
                <option value="no">{t("Services.Diet.AiSchedule.No")}</option>
              </select>
            </div>

            {(
              [
                { label: "wakeTime", default: "05:00" },
                { label: "sleepTime", default: "21:00" },
                { label: "lunchTime", default: "13:00" },
              ] as const
            ).map((field) => (
              <div className="col-md-6" key={field.label}>
                <label className="form-label" htmlFor={field.label}>
                  {t(`Services.Diet.AiSchedule.${field.label}`)}
                </label>

                <input
                  id={field.label}
                  className="form-control"
                  type="time"
                  value={preferences[field.label]}
                  required
                  defaultValue={field.default}
                  onChange={(event) =>
                    setPreferences({
                      ...preferences,
                      [field.label]: event.target.value,
                    })
                  }
                />
              </div>
            ))}
            <div className="col-12">
              <label className="form-label" htmlFor="planning-notes">
                {t("Services.Diet.AiSchedule.Notes")}
              </label>
              <textarea
                id="planning-notes"
                className="form-control"
                value={preferences.notes}
                onChange={(event) =>
                  setPreferences({ ...preferences, notes: event.target.value })
                }
              />
            </div>
          </div>
          <button
            className="btn btn-primary mt-3"
            disabled={loading || saving}
            type="submit"
          >
            {loading
              ? t("Services.Diet.AiSchedule.Running")
              : t("Services.Diet.AiSchedule.Generate")}
          </button>
        </form>

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

            <h5 className="mt-4">{t("Services.Diet.AiSchedule.Preview")}</h5>
            {recommendation.nextWeekSchedule.map((meal, index) => (
              <div
                className="card mt-2 text-start"
                key={`${meal.meal}-${index}`}
              >
                <div className="card-body">
                  <strong>
                    {meal.meal} ({meal.time})
                  </strong>
                  <ul className="mb-0">
                    {meal.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        {item.count} {item.unit} {item.element}
                      </li>
                    ))}
                  </ul>
                  {meal.note && (
                    <div className="small text-muted">{meal.note}</div>
                  )}
                </div>
              </div>
            ))}
            {!createdSchedule && (
              <button
                className="btn btn-success mt-3"
                type="button"
                disabled={saving}
                onClick={saveSchedule}
              >
                {saving
                  ? t("Services.Diet.AiSchedule.Saving")
                  : t("Services.Diet.AiSchedule.Save")}
              </button>
            )}
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
