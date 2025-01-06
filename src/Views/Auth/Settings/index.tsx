import { useTranslation } from "react-i18next";

import PageSection from "../../../Components/PageView/PageSection";
import ServicesActivation from "./ServicesActivation";
import Profile from "./Profile";
import { Fragment } from "react/jsx-runtime";

const Settings = () => {
  const { t } = useTranslation();

  return (
    <PageSection title={t("Settings.Title")}>
      <Fragment>
        <Profile />

        <ServicesActivation />
      </Fragment>
    </PageSection>
  );
};

export default Settings;
