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
      title: t("Landing.MealScheduling.Title"),
      icon: faUtensils,
      desc: t("Landing.MealScheduling.Desc"),
    },
    {
      title: t("Landing.HydrationLogging.Title"),
      icon: faTint,
      desc: t("Landing.HydrationLogging.Desc"),
    },
    {
      title: t("Landing.ExerciseTracking.Title"),
      icon: faDumbbell,
      desc: t("Landing.ExerciseTracking.Desc"),
    },
    {
      title: t("Landing.MedicationFollowUp.Title"),
      icon: faPills,
      desc: t("Landing.MedicationFollowUp.Desc"),
    },
    {
      title: t("Landing.SleepCycleMonitoring.Title"),
      icon: faBed,
      desc: t("Landing.SleepCycleMonitoring.Desc"),
    },
    {
      title: t("Landing.WeightTracking.Title"),
      icon: faWeight,
      desc: t("Landing.WeightTracking.Desc"),
    },
    {
      icon: faShield,
      title: t("Landing.SecuredAccess.Title"),
      desc: t("Landing.SecuredAccess.Desc"),
    },
    {
      icon: faUsers,
      title: t("Landing.OpenSource.Title"),
      desc: t("Landing.OpenSource.Desc"),
    },
    {
      icon: faLaptopCode,
      title: t("Landing.ModernTechStack.Title"),
      desc: t("Landing.ModernTechStack.Desc"),
    },
  ];

  const futurePlans = [
    {
      icon: faMobileAlt,
      title: t("Landing.MobileApp.Title"),
      desc: t("Landing.MobileApp.Desc"),
    },
    {
      icon: faClock,
      title: t("Landing.SetReminders.Title"),
      desc: t("Landing.SetReminders.Desc"),
    },
    {
      icon: faUserMd,
      title: t("Landing.NutritionistAccess.Title"),
      desc: t("Landing.NutritionistAccess.Desc"),
    },
    {
      icon: faBrain,
      title: t("Landing.AiPoweredInput.Title"),
      desc: t("Landing.AiPoweredInput.Desc"),
    },
    {
      icon: faChartLine,
      title: t("Landing.AdvancedAnalytics.Title"),
      desc: t("Landing.AdvancedAnalytics.Desc"),
    },
    {
      icon: faCalculator,
      title: t("Landing.CalorieTracking.Title"),
      desc: t("Landing.CalorieTracking.Desc"),
    },
    {
      icon: faLanguage,
      title: t("Landing.Localization.Title"),
      desc: t("Landing.Localization.Desc"),
    },
    {
      icon: faBullseye,
      title: t("Landing.GoalSetting.Title"),
      desc: t("Landing.GoalSetting.Desc"),
    },
    {
      icon: faUsers,
      title: t("Landing.MultiUserSupport.Title"),
      desc: t("Landing.MultiUserSupport.Desc"),
    },
    {
      icon: faChartPie,
      title: t("Landing.AdvancedDataVisualization.Title"),
      desc: t("Landing.AdvancedDataVisualization.Desc"),
    },
  ];

  return (
    <div className="container mt-5">
      <header className="text-center py-5 mb-5 row align-items-center">
        <div className="col-md-3 d-flex align-items-center justify-content-center">
          <img src="/Logo.png" className="w-100" alt="Logo" />
        </div>

        <div className="col-md-9 d-flex flex-column align-items-center justify-content-center">
          <h1 className="display-4">{t("Landing.Welcome")}</h1>
          <p className="lead">{t("Landing.Desc")}</p>
        </div>
      </header>

      <FeaturesView
        title={t("Landing.WhatIs.Title")}
        desc={t("Landing.WhatIs.Content")}
        features={currentFeatures}
      />

      <PageSection
        title={t("Landing.Developer.Title")}
        desc={t("Landing.Developer.Content")}
      />

      <FeaturesView
        title={t("Landing.Future.Title")}
        desc={t("Landing.Future.Content")}
        features={futurePlans}
      />

      <PageSection
        title={t("Landing.Contribution.Title")}
        desc={t("Landing.Contribution.Content")}
      >
        <div className="text-center mt-5">
          <a
            className="btn btn-primary btn-lg shadow-sm text-white"
            href="https://github.com/makkahwi/health-daily-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faUsers} className="me-2" />
            {t("Landing.Contribute")}
          </a>
        </div>
      </PageSection>
    </div>
  );
};

export default LandingPage;
