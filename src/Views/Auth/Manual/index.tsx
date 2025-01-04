import { useTranslation } from "react-i18next";
import PageSection from "../../../Components/PageView/PageSection";

const ManualView = () => {
  const { t } = useTranslation();

  const manualData = [
    {
      title: t("Dashboard.Dashboard"),
      description: t("Dashboard.Desc"),
      details: [],
    },
    {
      title: t("Services.Diet.Consumption.ConsumedMeals"),
      description: t("Services.Diet.Consumption.Desc.Manual"),
      details: [
        {
          subtitle: t("Manual.HowItWorks"),
          content: [
            t("Services.Diet.Consumption.Manual.HowItWorks4"),
            t("Services.Diet.Consumption.Manual.HowItWorks1"),
            t("Services.Diet.Consumption.Manual.HowItWorks2"),
            t("Services.Diet.Consumption.Manual.HowItWorks3"),
          ],
        },
        {
          subtitle: t("Manual.Inputs"),
          content: [
            t("Services.Diet.Consumption.Manual.Inputs2"),
            t("Services.Diet.Consumption.Manual.Inputs1"),
            t("Services.Diet.Consumption.Manual.Inputs3"),
            t("Services.Diet.Consumption.Manual.Inputs4"),
          ],
        },
      ],
    },
    {
      title: t("Services.Diet.Schedule.DietSchedules"),
      description: t("Services.Diet.Schedule.Desc.Manual"),
      details: [
        {
          subtitle: t("Manual.HowItWorks"),
          content: [
            t("Services.Diet.Schedule.HowItWorks1"),
            t("Services.Diet.Schedule.HowItWorks2"),
            t("Services.Diet.Schedule.HowItWorks3"),
            t("Services.Diet.Schedule.HowItWorks4"),
          ],
        },
      ],
    },
    {
      title: t("Services.Diet.Watering.Watering"),
      description: t("Services.Diet.Watering.Desc.Manual"),
      details: [
        {
          subtitle: t("Manual.Inputs"),
          content: [
            t("Services.Diet.Watering.Manual.Inputs1"),
            t("Services.Diet.Watering.Manual.Inputs2"),
          ],
        },
      ],
    },
    {
      title: t("Services.Diet.Fasting.Fasting"),
      description: t("Services.Diet.Fasting.Desc.Manual"),
      details: [],
    },
    {
      title: t("Services.Relief.Relief"),
      description: t("Services.Relief.Desc.Manual"),
      details: [],
    },
    {
      title: t("Services.Sports.SportSessions"),
      description: t("Services.Sports.Desc.Manual"),
      details: [
        {
          subtitle: t("Manual.Inputs"),
          content: [
            t("Manual.Date"),
            t("Services.Sports.Manual.Inputs2"),
            t("Services.Sports.Manual.Inputs3"),
            t("Services.Sports.Manual.Inputs4"),
            t("Services.Sports.Manual.Inputs5"),
          ],
        },
      ],
    },
    {
      title: t("Services.SleepCycles.SleepCycles"),
      description: t("Services.SleepCycles.Desc.Manual"),
      details: [
        {
          subtitle: t("Manual.Inputs"),
          content: [
            t("Services.SleepCycles.Manual.Inputs1"),
            t("Services.SleepCycles.Manual.Inputs2"),
          ],
        },
      ],
    },
    {
      title: t("Services.Medicine.ConsumedMedicines"),
      description: t("Services.Medicine.Consumption.Desc.Manual"),
      details: [
        {
          subtitle: t("Manual.Inputs"),
          content: [
            t("Services.Medicine.Consumption.Manual.Inputs3"),
            t("Services.Medicine.Consumption.Manual.Inputs1"),
            t("Services.Medicine.Consumption.Manual.Inputs2"),
          ],
        },
      ],
    },
    {
      title: t("Services.Medicine.MedicineSchedule"),
      description: t("Services.Medicine.Schedule.Desc.Manual"),
      details: [
        {
          subtitle: t("Manual.Inputs"),
          content: [
            t("Services.Medicine.Schedule.Manual.Inputs1"),
            t("Services.Medicine.Schedule.Manual.Inputs2"),
            t("Services.Medicine.Schedule.Manual.Inputs3"),
            t("Services.Medicine.Schedule.Manual.Inputs4"),
            t("Services.Medicine.Schedule.Manual.Inputs5"),
          ],
        },
      ],
    },
    {
      title: t("Services.WeightReadings.WeightReadings"),
      description: t("Services.WeightReadings.Desc.Manual"),
      details: [
        {
          subtitle: t("Services.WeightReadings.Targets"),
          content: [t("Services.WeightReadings.TargetsDesc")],
        },
        {
          subtitle: t("Manual.Inputs"),
          content: [
            t("Manual.Date"),
            t("Services.WeightReadings.Manual.Inputs2"),
            t("Services.WeightReadings.Manual.Inputs3"),
            t("Services.WeightReadings.Manual.Inputs4"),
            t("Services.WeightReadings.Manual.Inputs5"),
            t("Services.WeightReadings.Manual.Inputs6"),
          ],
        },
      ],
    },
    {
      title: t("Services.LabTests.LabTestsList"),
      description: t("Services.LabTests.Desc.Manual"),
      details: [
        {
          subtitle: t("Manual.Inputs"),
          content: [t("Manual.Date"), t("Services.LabTests.Manual.Inputs")],
        },
      ],
    },
  ];

  return (
    <PageSection title={t("Manual.UserManual")} desc={t("Manual.Desc")}>
      <div className="my-5">
        <div className="accordion" id="manualAccordion">
          {manualData.map((section, i) => (
            <div className="accordion-item" key={i}>
              <h2 className="accordion-header" id={`heading-${i}`}>
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${i}`}
                  aria-expanded="true"
                  aria-controls={`collapse-${i}`}
                >
                  {section.title}
                </button>
              </h2>

              <div
                id={`collapse-${i}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading-${i}`}
                data-bs-parent="#manualAccordion"
              >
                <div className="accordion-body text-justify">
                  <p>{section.description}</p>

                  {section.details.length > 0 && (
                    <ul className="list-group">
                      {section.details.map((detail, detailIndex) => (
                        <li className="list-group-item lh-lg" key={detailIndex}>
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
