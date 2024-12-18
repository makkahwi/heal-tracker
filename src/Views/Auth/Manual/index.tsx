import PageSection from "../../../Components/PageView/PageSection";

const ManualView = () => {
  const manualData = [
    {
      title: "Dashboard",
      description:
        "The weekly summary of your tracked data, including diet consumption, diet schedule, water schedule, sport sessions, sleep cycles, and medicine consumption.",
      details: [],
    },
    {
      title: "Diet Consumption",
      description:
        "Record actual consumption of foods and beverages, compare it with scheduled meals, and view previous inputs in a weekly calendar.",
      details: [
        {
          subtitle: "How It Works",
          content: [
            "Pick a scheduled meal to auto-fill the supposed elements.",
            "Add optional notes for the entire meal or individual elements.",
            "Ensure exact spelling and formatting for accurate comparison.",
            "Scheduled data must be filled beforehand.",
          ],
        },
        {
          subtitle: "Inputs",
          content: [
            "Date & Time",
            "Scheduled Meal",
            "Consumed Elements (name, quantity, measurement unit)",
            "Optional Notes (meal or element-specific)",
          ],
        },
      ],
    },
    {
      title: "Diet Schedule",
      description:
        "Define your diet plan with schedules, meals, and detailed elements for each meal.",
      details: [
        {
          subtitle: "Schedules",
          content: ["Adopt a new schedule with order and start date."],
        },
        {
          subtitle: "Schedule Meals",
          content: ["List meals with names and scheduled consumption times."],
        },
        {
          subtitle: "Meal Elements",
          content: [
            "Define elements for each meal, including name, quantity, and measurement unit.",
            "Specify allowed alternatives with matching specs.",
          ],
        },
      ],
    },
    {
      title: "Watering",
      description:
        "Track your water intake to ensure you meet the minimum consumption level.",
      details: [
        {
          subtitle: "Inputs",
          content: ["Quantity in cups", "Timestamp (date & time)"],
        },
      ],
    },
    {
      title: "Sport Sessions",
      description:
        "Monitor your physical activities and view previous inputs in a monthly calendar.",
      details: [
        {
          subtitle: "Inputs",
          content: [
            "Date",
            "Sport Type",
            "Start & End Time",
            "Measurements (e.g., walked distances, swimming time)",
            "Optional Notes",
          ],
        },
      ],
    },
    {
      title: "Sleep Cycles",
      description:
        "Track your daily sleep patterns and view previous inputs in a monthly calendar.",
      details: [
        {
          subtitle: "Inputs",
          content: ["Sleep Start & End Time", "Optional Notes"],
        },
      ],
    },
    {
      title: "Medicine Consumption",
      description:
        "Track medication intake based on predefined schedules and view data in a monthly calendar.",
      details: [
        {
          subtitle: "Inputs",
          content: [
            "Date & Time",
            "Quantity & Measurement Unit",
            "Medicine Selection (from predefined list)",
          ],
        },
      ],
    },
    {
      title: "Medicine Schedule",
      description:
        "Define medication schedules with detailed consumption instructions.",
      details: [
        {
          subtitle: "Inputs",
          content: [
            "Medicine Name",
            "Per-Time Dose",
            "Consumption Frequency (daily, weekly, monthly, etc.)",
            "Duration (e.g., number of weeks)",
            "Doses Per Frequency",
          ],
        },
      ],
    },
    {
      title: "Weight Readings",
      description:
        "Record weekly weight readings, including detailed measurements specific to the InBody 120 scale.",
      details: [
        {
          subtitle: "Inputs",
          content: [
            "Date",
            "Water Reading (liters)",
            "Fat Weight (kg)",
            "Total Weight (kg)",
            "Muscle Weight (kg)",
            "Waist Fat Rating (integer scale)",
          ],
        },
      ],
    },
    {
      title: "Lab Tests",
      description:
        "Store results of blood tests with optional inputs based on the tests conducted.",
      details: [
        {
          subtitle: "Inputs",
          content: ["Date", "Test Indicators (e.g., HDL, LDL, etc.)"],
        },
      ],
    },
  ];

  return (
    <PageSection title="User Manual">
      <div className="container mt-5">
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
