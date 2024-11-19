import {
  faBed,
  faBrain,
  faBullseye,
  faCalculator,
  faChartLine,
  faChartPie,
  faClock,
  faDatabase,
  faDumbbell,
  faLanguage,
  faLaptopCode,
  faMobileAlt,
  faPills,
  faShield,
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
    title: "Meal Scheduling",
    icon: faUtensils,
    desc: "Stay on track with your nutrition plan by logging and following scheduled meals.",
  },
  {
    title: "Hydration Logging",
    icon: faTint,
    desc: "Record your water intake to maintain optimal hydration levels.",
  },
  {
    title: "Exercise Tracking",
    icon: faDumbbell,
    desc: "Log your physical activities, including sports, workouts, and walks.",
  },
  {
    title: "Medication Follow-Up",
    icon: faPills,
    desc: "Never miss a dose by keeping track of your medications and supplements.",
  },
  {
    title: "Sleep Cycle Monitoring",
    icon: faBed,
    desc: "Monitor and improve your sleep patterns for better rest and recovery.",
  },
  {
    title: "Weight Tracking",
    icon: faWeight,
    desc: "Log and monitor your weight, with support for inBody scale or any detailed-reading providers.",
  },
  {
    icon: faShield,
    title: "Secured Access",
    desc: "User-only access for own data view & manipulation with Firebase authentication.",
  },
  {
    icon: faUsers,
    title: "Open-Source",
    desc: "Totally transparency and ability for any web developer to contribute and enhance.",
  },
  {
    icon: faLaptopCode,
    title: "Modern Tech Stack",
    desc: "Built with React.Js and Firebase for an optimized, scalable, and responsive web experience.",
  },
];

const futurePlans = [
  {
    icon: faMobileAlt,
    title: "Mobile App",
    desc: "A dedicated app for tracking health on the go.",
  },
  {
    icon: faClock,
    title: "Set Reminders",
    desc: "Notifications for meals, workouts, medications, and more.",
  },
  {
    icon: faUserMd,
    title: "Nutritionist Access",
    desc: "Allow experts to review and provide feedback on dietary progress.",
  },
  {
    icon: faBrain,
    title: "AI-Powered Input",
    desc: "Automatic data entry and meaningful health recommendations.",
  },
  {
    icon: faChartLine,
    title: "Advanced Analytics",
    desc: "Generate summaries and visualizations for deeper insights into your habits.",
  },
  {
    icon: faCalculator,
    title: "Calorie Tracking",
    desc: "Automatic calorie calculations for scheduled and consumed meals.",
  },
  {
    icon: faLanguage,
    title: "Localization",
    desc: "Support for multiple languages, including Arabic.",
  },
  {
    icon: faBullseye,
    title: "Goal Setting",
    desc: "Personalized health targets and progress tracking.",
  },
  {
    icon: faUsers,
    title: "Multi-User Support",
    desc: "Perfect for families or teams to collaborate on health goals.",
  },
  {
    icon: faChartPie,
    title: "Advanced Data Visualization",
    desc: "Build a platform for shared wellness experiences and tips.",
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
        desc="Health Daily Link is developed by me **Suhaib Ahmad**, a passionate about improving health through technology. This project is open-source, and I am excited to welcome contributions from developers, designers, and wellness enthusiasts around the world.
"
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
