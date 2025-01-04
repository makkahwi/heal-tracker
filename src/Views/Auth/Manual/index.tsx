import { useTranslation } from "react-i18next";
import PageSection from "../../../Components/PageView/PageSection";

const ManualView = () => {
  const { t } = useTranslation();

  const manualData = [
    {
      title: t("Manual.Dashboard.Title"),
      description: t("Manual.Dashboard.Desc"),
      details: [],
    },
    {
      title: t("Services.Diet.Consumption.ConsumedMeals"),
      description: t("Services.Diet.Schedule.Desc.Manual"),
      details: [
        {
          subtitle: t("Manual.HowItWorks"),
          content: [
            t("Manual.DietConsumptionHowItWorks4"),
            t("Manual.DietConsumptionHowItWorks1"),
            t("Manual.DietConsumptionHowItWorks2"),
            t("Manual.DietConsumptionHowItWorks3"),
          ],
        },
        {
          subtitle: t("Manual.Inputs"),
          content: [
            t("Manual.DietConsumptionInputs2"),
            t("Manual.DietConsumptionInputs1"),
            t("Manual.DietConsumptionInputs3"),
            t("Manual.DietConsumptionInputs4"),
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
            t("Manual.DietScheduleHowItWorks1"),
            t("Manual.DietScheduleHowItWorks2"),
            t("Manual.DietScheduleHowItWorks3"),
            t("Manual.DietScheduleHowItWorks4"),
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
          content: [t("Manual.WateringInputs1"), t("Manual.WateringInputs2")],
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
            t("Manual.SportSessionsInputs2"),
            t("Manual.SportSessionsInputs3"),
            t("Manual.SportSessionsInputs4"),
            t("Manual.SportSessionsInputs5"),
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
            t("Manual.SleepCyclesInputs1"),
            t("Manual.SleepCyclesInputs2"),
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
            t("Manual.MedicineConsumptionInputs3"),
            t("Manual.MedicineConsumptionInputs1"),
            t("Manual.MedicineConsumptionInputs2"),
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
            t("Manual.MedicineScheduleInputs1"),
            t("Manual.MedicineScheduleInputs2"),
            t("Manual.MedicineScheduleInputs3"),
            t("Manual.MedicineScheduleInputs4"),
            t("Manual.MedicineScheduleInputs5"),
          ],
        },
      ],
    },
    {
      title: t("Services.WeightReadings.WeightReadings"),
      description: t("Services.WeightReadings.Desc.Manual"),
      details: [
        {
          subtitle: t("Manual.WeightReadingTargets"),
          content: [t("Manual.WeightReadingTargetsDesc")],
        },
        {
          subtitle: t("Manual.Inputs"),
          content: [
            t("Manual.Date"),
            t("Manual.WeightReadingsInputs2"),
            t("Manual.WeightReadingsInputs3"),
            t("Manual.WeightReadingsInputs4"),
            t("Manual.WeightReadingsInputs5"),
            t("Manual.WeightReadingsInputs6"),
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
          content: [t("Manual.Date"), t("Manual.LabTestsInputs2")],
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
