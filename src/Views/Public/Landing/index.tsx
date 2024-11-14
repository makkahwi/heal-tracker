import {
  faBed,
  faBrain,
  faBullseye,
  faCalculator,
  faChartLine,
  faChartPie,
  faClipboardList,
  faClock,
  faDatabase,
  faDumbbell,
  faLanguage,
  faMobileAlt,
  faPills,
  faSpaceShuttle,
  faTint,
  faUserMd,
  faUsers,
  faUtensils,
  faWeight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FeaturesView from "./FeaturesView";
import PageSection from "./PageSection";

const currentFeatures = [
  {
    title: "Activity Tracking",
    icon: faClipboardList,
    desc: "Track both daily and non-daily health activities, helping you stay consistent with your wellness goals.",
  },
  {
    title: "Meal Scheduling",
    icon: faUtensils,
    desc: "Follow a scheduled meal plan, typically provided by your nutritionist, to keep your diet on track.",
  },
  {
    title: "Hydration Logging",
    icon: faTint,
    desc: "Monitor your water intake and stay hydrated throughout the day.",
  },
  {
    title: "Exercise Tracking",
    icon: faDumbbell,
    desc: "Keep a record of your sports and exercise routines to track physical activity levels.",
  },
  {
    title: "Medication FollowUp",
    icon: faPills,
    desc: "Record your taking of medications and supplements, ensuring you never miss a dose.",
  },
  {
    title: "Sleep Cycle Monitoring",
    icon: faBed,
    desc: "Record and monitor your sleep cycles to improve sleep quality and maintain a healthy routine.",
  },
  {
    title: "Weight Tracking",
    icon: faWeight,
    desc: "Log weight readings, including data from inBody scale integrations, to monitor progress over time.",
  },
];

const futurePlans = [
  {
    icon: faMobileAlt,
    title: "Mobile App",
    desc: "Develop a mobile version for on-the-go accessibility.",
  },
  {
    icon: faClock,
    title: "Set Reminders",
    desc: "Enable users to receive reminders of scheduled activities like meals, sleep times, sport sessions & medications.",
  },
  {
    icon: faUserMd,
    title: "Nutritionist Access",
    desc: "Allow nutritionists to monitor and provide feedback on users' dietary progress.",
  },
  {
    icon: faBrain,
    title: "AI Data Input",
    desc: "Integrate AI to streamline data entry, such as automatic readings from scales.",
  },
  {
    icon: faChartLine,
    title: "Summaries and Analytics",
    desc: "Generate daily, weekly, and monthly summaries for a clearer health overview.",
  },
  {
    icon: faCalculator,
    title: "Calorie Calculation",
    desc: "Automatically calculate calories for meal plans and track actual consumption.",
  },
  {
    icon: faLanguage,
    title: "Localization",
    desc: "Translate the app to support Arabic and other languages.",
  },
  {
    icon: faBullseye,
    title: "Goal Setting",
    desc: "Enable users to set personalized health goals.",
  },
  {
    icon: faUsers,
    title: "Multi-User Support",
    desc: "Add multi-user functionality for families or teams to track health together.",
  },
  {
    icon: faChartPie,
    title: "Advanced Data Visualization",
    desc: "Provide insights and trends with engaging data visualizations.",
  },
];

const techs = [
  {
    icon: faSpaceShuttle,
    title: "React.js",
    desc: "Our front-end framework for building interactive and responsive user interfaces, delivering a seamless user experience.",
  },
  {
    icon: faDatabase,
    title: "Firebase",
    desc: "A reliable backend solution for data storage, real-time syncing, and user authentication, ensuring security and scalability.",
  },
];

const LandingPage = () => {
  return (
    <div className="container mt-5">
      <header className="text-center py-5 mb-5 row align-items-center">
        <div className="col-md-3 d-flex align-items-center justify-content-center">
          <img src="/Logo.png" className="w-100" alt="Logo" />
        </div>

        <div className="col-md-9 d-flex flex-column align-items-center justify-content-center">
          <h1 className="display-4">Welcome to Health Daily Link (HDL)</h1>
          <p className="lead">
            Your personal companion for tracking and improving your health
            journey.
          </p>
        </div>
      </header>

      <FeaturesView
        title="What is Health Daily Link"
        desc="Health Daily Link is a comprehensive, open-source web app dedicated to helping you track and manage various health-related activities to stay on top of your wellness goals."
        features={currentFeatures}
      />

      <PageSection
        title="Technology Stack"
        desc="Health Daily Link is built with a modern technology stack, designed to provide a smooth and secure experience."
      >
        <div className="mx-auto">
          {techs.map(({ icon, title, desc }, i) => (
            <div className="d-flex align-items-center mb-4" key={i}>
              <div className="text-primary rounded-circle">
                <FontAwesomeIcon icon={icon} size="2x" />
              </div>

              <div className="ms-4 text-start">
                <h5 className="fw-bold">{title}</h5>
                <p className="mb-0">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        title="Meet the Developer"
        desc="This is being developed by the great team of AlembicSoft! As the creator of Health Daily Link, we are
          passionate about helping people improve their health through
          technology. This project is open-source, and we welcome contributors
          from around the world to help make it even better!"
      />

      <FeaturesView
        title="Our Vision for the Future"
        desc="Health Daily Link is growing, and we have big plans to make it even more powerful and user-friendly. With your support, we aim to add new features, improve accessibility, and build a community around wellness. This is part of what we have in mind to develop for future expansions."
        features={futurePlans}
      />

      <PageSection
        title="Contribute to Health Daily Link"
        desc=" Health Daily Link is open-source, and we’re thrilled to welcome developers, designers, and wellness enthusiasts to contribute. Join us on GitHub and be part of our journey to make health tracking accessible to all."
      >
        <a
          className="btn btn-primary btn-lg shadow-sm text-white"
          href="https://github.com/makkahwi/health-daily-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faUsers} className="me-2" />
          Contribute on GitHub
        </a>
      </PageSection>
    </div>
  );
};

export default LandingPage;
