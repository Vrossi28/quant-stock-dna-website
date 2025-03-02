import { useTranslation } from "react-i18next";
import BasePage from "./base-page";
import Preferences from "@/components/preferences/preferences";

const PreferencesPage = () => {
  const { t } = useTranslation();
  return (
    <BasePage title={t("preferences")}>
      <Preferences />
    </BasePage>
  );
};

export default PreferencesPage;
