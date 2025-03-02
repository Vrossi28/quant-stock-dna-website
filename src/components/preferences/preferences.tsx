import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import blackLogo_pt from "@/assets/FullWhite-pt.png";
import blackLogo_en from "@/assets/FullWhite-en.png";
import {
  getPreferences,
  updateSubscriberPreferences,
} from "@/lib/services/contact-service";
import { MoonLoader } from "react-spinners";
import { PRIMARY_COLOR } from "@/constants/common";
import { useTranslation } from "react-i18next";
import i18n from "@/localization/i18n";
import { Button } from "../ui/button";

const PreferencesPage = () => {
  const { t } = useTranslation();
  const language = i18n.language;
  const location = useLocation();

  const [preferences, setPreferences] = useState<Preferences>({
    subscriberId: "",
    activeSubscription: false,
    locale: "",
  });
  const [originalPreferences, setOriginalPreferences] =
    useState<Preferences | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const logoSrc = language === "pt" ? blackLogo_pt : blackLogo_en;

  function toggle() {
    setPreferences((prev) => ({
      ...prev,
      activeSubscription: !prev.activeSubscription,
    }));
  }

  function updatePreferences() {
    setIsLoading(true);
    updateSubscriberPreferences(preferences)
      .then((updatedPreferences) => {
        setPreferences(updatedPreferences);
        setOriginalPreferences(updatedPreferences);
      })
      .catch()
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");
    if (!id) return;

    getPreferences(id)
      .then((fetchedPreferences) => {
        setPreferences(fetchedPreferences);
        setOriginalPreferences(fetchedPreferences);
      })
      .catch();
  }, [location]);

  const isChanged =
    originalPreferences !== null &&
    preferences.activeSubscription !== originalPreferences.activeSubscription;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <a href="/" rel="noreferrer noopener" className="mb-4">
        <img
          src={logoSrc}
          alt="Company Logo"
          className="w-[200px] object-contain rounded-lg"
        />
      </a>

      {preferences.subscriberId === "" ? (
        <div className="flex flex-col items-center">
          <span>{t("loading")}</span>
          <MoonLoader size={15} color={PRIMARY_COLOR} />
        </div>
      ) : (
        <>
          <label className="font-bold text-lg mb-2">
            {preferences.activeSubscription
              ? t("unsubscribe.waitlist")
              : t("subscribe.waitlist")}
          </label>

          <label className="relative inline-flex items-center cursor-pointer mb-4">
            <input
              type="checkbox"
              checked={preferences.activeSubscription}
              className="sr-only peer"
              onChange={toggle}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>

          <Button
            onClick={updatePreferences}
            className="mt-4"
            isLoading={isLoading}
            disabled={!isChanged}
          >
            {t("update.preferences")}
          </Button>
        </>
      )}
    </div>
  );
};

export default PreferencesPage;
