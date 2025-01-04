import { useTranslation } from "react-i18next";

import PageSection from "../../../Components/PageView/PageSection";
import ServicesActivation from "./ServicesActivation";

const Settings = () => {
  const { t } = useTranslation();

  return (
    <PageSection title={t("Settings.Title")}>
      <ServicesActivation />
    </PageSection>
  );
};

export default Settings;
