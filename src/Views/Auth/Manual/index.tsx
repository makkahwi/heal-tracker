import { useTranslation } from "react-i18next";
import PageSection from "../../../Components/PageView/PageSection";

const ManualView = () => {
  const { t } = useTranslation();

  const manualData = [
    {
      title: t("Manual.Dashboard"),
      description: t(
        "Manual.The weekly summary of your tracked data, including diet consumption, diet schedule, water schedule, sport sessions, sleep cycles, and medicine consumption."
      ),
      details: [],
    },
    {
      title: t("Manual.Diet Consumption"),
      description: t(
        "Manual.Record actual consumption of foods and beverages, compare it with scheduled meals, and view previous inputs in a weekly calendar."
      ),
      details: [
        {
          subtitle: t("Manual.How It Works"),
          content: [
            t(
              "Manual.Pick a scheduled meal to auto-fill the supposed elements."
            ),
            t(
              "Manual.Add optional notes for the entire meal or individual elements."
            ),
            t(
              "Manual.Ensure exact spelling and formatting for accurate comparison."
            ),
            t("Manual.Scheduled data must be filled beforehand"),
          ],
        },
        {
          subtitle: t("Manual.Inputs"),
          content: [
            t("Manual.Date & Time"),
            t("Manual.Scheduled Meal"),
            t("Manual.Consumed Elements (name, quantity, measurement unit)"),
            t("Manual.Optional Notes (meal or element-specific)"),
          ],
        },
      ],
    },
    {
      title: t("Manual.Diet Schedule"),
      description: t(
        "Manual.Define your diet plan with schedules, meals, and detailed elements for each meal."
      ),
      details: [
        {
          subtitle: t("Manual.Schedules"),
          content: [t("Manual.Adopt a new schedule with order and start date")],
        },
        {
          subtitle: t("Manual.Schedule Meals"),
          content: [
            t("Manual.List meals with names and scheduled consumption times"),
          ],
        },
        {
          subtitle: t("Manual.Meal Elements"),
          content: [
            t(
              "Manual.Define elements for each meal, including name, quantity, and measurement unit."
            ),
            t("Manual.Specify allowed alternatives with matching specs"),
          ],
        },
      ],
    },
    {
      title: t("Manual.Watering"),
      description: t(
        "Manual.Track your water intake to ensure you meet the minimum consumption level."
      ),
      details: [
        {
          subtitle: t("Manual.Inputs"),
          content: [
            t("Manual.Quantity in cups"),
            t("Manual.Timestamp (date & time)"),
          ],
        },
      ],
    },
    {
      title: t("Manual.Sport Sessions"),
      description: t(
        "Manual.Monitor your physical activities and view previous inputs in a monthly calendar."
      ),
      details: [
        {
          subtitle: t("Manual.Inputs"),
          content: [
            t("Manual.Date"),
            t("Manual.Sport Type"),
            t("Manual.Start & End Time"),
            t("Manual.Measurements (eg, walked distances, swimming time)"),
            t("Manual.Optional Notes"),
          ],
        },
      ],
    },
    {
      title: t("Manual.Sleep Cycles"),
      description: t(
        "Manual.Track your daily sleep patterns and view previous inputs in a monthly calendar."
      ),
      details: [
        {
          subtitle: t("Manual.Inputs"),
          content: [
            t("Manual.Sleep Start & End Time"),
            t("Manual.Optional Notes"),
          ],
        },
      ],
    },
    {
      title: t("Manual.Medicine Consumption"),
      description: t(
        "Manual.Track medication intake based on predefined schedules and view data in a monthly calendar."
      ),
      details: [
        {
          subtitle: t("Manual.Inputs"),
          content: [
            t("Manual.Date & Time"),
            t("Manual.Quantity & Measurement Unit"),
            t("Manual.Medicine Selection (from predefined list)"),
          ],
        },
      ],
    },
    {
      title: t("Manual.Medicine Schedule"),
      description: t(
        "Manual.Define medication schedules with detailed consumption instructions."
      ),
      details: [
        {
          subtitle: t("Manual.Inputs"),
          content: [
            t("Manual.Medicine Name"),
            t("Manual.Per-Time Dose"),
            t("Manual.Consumption Frequency (daily, weekly, monthly, etc)"),
            t("Manual.Duration (eg, number of weeks)"),
            t("Manual.Doses Per Frequency"),
          ],
        },
      ],
    },
    {
      title: t("Manual.Weight Readings"),
      description: t(
        "Manual.Record weekly weight readings, including detailed measurements specific to the InBody 120 scale."
      ),
      details: [
        {
          subtitle: t("Manual.Inputs"),
          content: [
            t("Manual.Date"),
            t("Manual.Water Reading (liters)"),
            t("Manual.Fat Weight (kg)"),
            t("Manual.Total Weight (kg)"),
            t("Manual.Muscle Weight (kg)"),
            t("Manual.Waist Fat Rating (integer scale)"),
          ],
        },
      ],
    },
    {
      title: t("Manual.Lab Tests"),
      description: t(
        "Manual.Store results of blood tests with optional inputs based on the tests conducted."
      ),
      details: [
        {
          subtitle: t("Manual.Inputs"),
          content: [
            t("Manual.Date"),
            t("Manual.Test Indicators (eg, HDL, LDL, etc)"),
          ],
        },
      ],
    },
  ];

  return (
    <PageSection title={t("Manual.User Manual")}>
      <div className="container my-5">
        <div className="accordion" id="manualAccordion">
          {manualData.map((section, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={`heading-${index}`}>
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${index}`}
                  aria-expanded="true"
                  aria-controls={`collapse-${index}`}
                >
                  {section.title}
                </button>
              </h2>

              <div
                id={`collapse-${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading-${index}`}
                data-bs-parent="#manualAccordion"
              >
                <div className="accordion-body text-justify">
                  <p>{section.description}</p>

                  {section.details.length > 0 && (
                    <ul className="list-group">
                      {section.details.map((detail, detailIndex) => (
                        <li className="list-group-item" key={detailIndex}>
                          <h5>{detail.subtitle}</h5>

                          <ul>
                            {detail.content.map((item, itemIndex) => (
                              <li key={itemIndex}>{item}</li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageSection>
  );
};

export default ManualView;
