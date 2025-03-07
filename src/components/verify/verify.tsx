import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Contact from "../contact/contact";
import MoonLoader from "react-spinners/MoonLoader";
import { useTranslation } from "react-i18next";
import i18n from "@/localization/i18n";
import blackLogo_pt from "@/assets/FullWhite-pt.png";
import blackLogo_en from "@/assets/FullWhite-en.png";
import {
  getPreferences,
  updateSubscriberPreferences,
} from "@/lib/services/contact-service";
import ThankYouWaitlist from "./thank-you-waitlist";
import { PRIMARY_COLOR } from "@/constants/common";

const Verify = () => {
  const { t } = useTranslation();
  const language = i18n.language;
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  async function registerSubscriber(id: string) {
    try {
      const prefs: Preferences = {
        subscriberId: id,
        locale: language,
        activeSubscription: true,
      };
      const response = await updateSubscriberPreferences(prefs);
      return response;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  const logoSrc = () => (language === "pt" ? blackLogo_pt : blackLogo_en);

  useEffect(() => {
    const fetchPreferences = async () => {
      const queryParams = new URLSearchParams(location.search);
      const id = queryParams.get("id");
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const prefs = await getPreferences(id);
        if (!prefs || !prefs.activeSubscription) {
          const updatedPrefs = await registerSubscriber(id);
          setPreferences(updatedPrefs);
        } else {
          setPreferences(prefs);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, [location]);

  return (
    <div className="min-h-screen min-w-screen flex justify-center flex-row items-center">
      <div className="inline-block justify-center items-center">
        <div className="flex flex-col items-center justify-end md:w-auto">
          <a
            rel="noreferrer noopener"
            href="/"
            className="font-bold text-xl flex items-center"
          >
            <img
              src={logoSrc()}
              alt="Company Logo"
              className="md:w-[200px] w-[200px] object-contain rounded-lg"
            />
          </a>
          {loading ? (
            <div className="flex flex-col items-center">
              <span>{t("loading")}</span>
              <MoonLoader size={15} color={PRIMARY_COLOR} />
            </div>
          ) : preferences?.activeSubscription ? (
            <div className="flex flex-col items-center text-center justify-center text-2xl text-white font-bold pb-2">
              <ThankYouWaitlist />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Contact />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verify;
