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
import { useTranslation } from "react-i18next";

import FeaturesView from "./FeaturesView";
import PageSection from "./PageSection";

const LandingPage = () => {
  const { t } = useTranslation();

  const currentFeatures = [
    {
      title: t("Landing.Meal Scheduling"),
      icon: faUtensils,
      desc: t(
        "Landing.Stay on track with your nutrition plan by logging and following scheduled meals"
      ),
    },
    {
      title: t("Landing.Hydration Logging"),
      icon: faTint,
      desc: t(
        "Landing.Record your water intake to maintain optimal hydration levels"
      ),
    },
    {
      title: t("Landing.Exercise Tracking"),
      icon: faDumbbell,
      desc: t(
        "Landing.Log your physical activities, including sports, workouts, and walks"
      ),
    },
    {
      title: t("Landing.Medication Follow-Up"),
      icon: faPills,
      desc: t(
        "Landing.Never miss a dose by keeping track of your medications and supplements"
      ),
    },
    {
      title: t("Landing.Sleep Cycle Monitoring"),
      icon: faBed,
      desc: t(
        "Landing.Monitor and improve your sleep patterns for better rest and recovery"
      ),
    },
    {
      title: t("Landing.Weight Tracking"),
      icon: faWeight,
      desc: t(
        "Landing.Log and monitor your weight, with support for inBody scale or any detailed-reading providers"
      ),
    },
    {
      icon: faShield,
      title: t("Landing.Secured Access"),
      desc: t(
        "Landing.User-only access for own data view & manipulation with Firebase authentication"
      ),
    },
    {
      icon: faUsers,
      title: t("Landing.Open-Source"),
      desc: t(
        "Landing.Totally transparency and ability for any web developer to contribute and enhance"
      ),
    },
    {
      icon: faLaptopCode,
      title: t("Landing.Modern Tech Stack"),
      desc: t(
        "Landing.Built with ReactJs and Firebase for an optimized, scalable, and responsive web experience"
      ),
    },
  ];

  const futurePlans = [
    {
      icon: faMobileAlt,
      title: t("Landing.Mobile App"),
      desc: t("Landing.A dedicated app for tracking health on the go"),
    },
    {
      icon: faClock,
      title: t("Landing.Set Reminders"),
      desc: t(
        "Landing.Notifications for meals, workouts, medications, and more"
      ),
    },
    {
      icon: faUserMd,
      title: t("Landing.Nutritionist Access"),
      desc: t(
        "Landing.Allow experts to review and provide feedback on dietary progress"
      ),
    },
    {
      icon: faBrain,
      title: t("Landing.AI-Powered Input"),
      desc: t(
        "Landing.Automatic data entry and meaningful health recommendations"
      ),
    },
    {
      icon: faChartLine,
      title: t("Landing.Advanced Analytics"),
      desc: t(
        "Landing.Generate summaries and visualizations for deeper insights into your habits"
      ),
    },
    {
      icon: faCalculator,
      title: t("Landing.Calorie Tracking"),
      desc: t(
        "Landing.Automatic calorie calculations for scheduled and consumed meals"
      ),
    },
    {
      icon: faLanguage,
      title: t("Landing.Localization"),
      desc: t("Landing.Support for multiple languages, including Arabic"),
    },
    {
      icon: faBullseye,
      title: t("Landing.Goal Setting"),
      desc: t("Landing.Personalized health targets and progress tracking"),
    },
    {
      icon: faUsers,
      title: t("Landing.Multi-User Support"),
      desc: t(
        "Landing.Perfect for families or teams to collaborate on health goals"
      ),
    },
    {
      icon: faChartPie,
      title: t("Landing.Advanced Data Visualization"),
      desc: t(
        "Landing.Build a platform for shared wellness experiences and tips"
      ),
    },
  ];

  const techs = [
    {
      icon: faSpaceShuttle,
      title: t("Landing.ReactJs"),
      desc: t(
        "Landing.Our front-end framework for building interactive and responsive user interfaces, delivering a seamless user experience"
      ),
    },
    {
      icon: faDatabase,
      title: t("Landing.Firebase"),
      desc: t(
        "Landing.A reliable backend solution for data storage, real-time syncing, and user authentication, ensuring security and scalability"
      ),
    },
  ];

  return (
    <div className="container mt-5">
      <header className="text-center py-5 mb-5 row align-items-center">
        <div className="col-md-3 d-flex align-items-center justify-content-center">
          <img src="/Logo.png" className="w-100" alt="Logo" />
        </div>

        <div className="col-md-9 d-flex flex-column align-items-center justify-content-center">
          <h1 className="display-4">
            {t("Landing.Welcome to Health Daily Link (HDL)")}
          </h1>
          <p className="lead">
            {t(
              "Landing.Your personal companion for tracking and improving your health journey"
            )}
          </p>
        </div>
      </header>

      <FeaturesView
        title={t("Landing.What is Health Daily Link")}
        desc={t(
          "Landing.Health Daily Link is a comprehensive, open-source web app dedicated to helping you track and manage various health-related activities to stay on top of your wellness goals"
        )}
        features={currentFeatures}
      />

      <PageSection
        title={t("Landing.Technology Stack")}
        desc={t(
          "Landing.Health Daily Link is built with a modern technology stack, designed to provide a smooth and secure experience"
        )}
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
        title={t("Landing.Meet the Developer")}
        desc={t(
          "Landing.Health Daily Link is developed by me Suhaib Ahmad, a passionate about improving health through technology This project is open-source, and I am excited to welcome contributions from developers, designers, and wellness enthusiasts around the world"
        )}
      />

      <FeaturesView
        title={t("Landing.Our Vision for the Future")}
        desc={t(
          "Landing.Health Daily Link is growing, and we have big plans to make it even more powerful and user-friendly With your support, we aim to add new features, improve accessibility, and build a community around wellness This is part of what we have in mind to develop for future expansions"
        )}
        features={futurePlans}
      />

      <PageSection
        title={t("Landing.Contribute to Health Daily Link")}
        desc={t(
          "Landing.Health Daily Link is open-source, and we’re thrilled to welcome developers, designers, and wellness enthusiasts to contribute Join us on GitHub and be part of our journey to make health tracking accessible to all"
        )}
      >
        <div className="text-center mt-5">
          <a
            className="btn btn-primary btn-lg shadow-sm text-white"
            href="https://github.com/makkahwi/health-daily-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faUsers} className="me-2" />
            {t("Landing.Contribute on GitHub")}
          </a>
        </div>
      </PageSection>
    </div>
  );
};

export default LandingPage;
