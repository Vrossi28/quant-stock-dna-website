import { useTranslation } from "react-i18next";
import CookieConsent from "./cookies-consent";
import blackLogo_pt from "../assets/FullWhite-pt.png";
import blackLogo_en from "../assets/FullWhite-en.png";
import { useEffect } from "react";
import { trackSectionVisibility } from "@/lib/services/analytics-service";

export const Footer = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage;
  const now = new Date();
  const currentYear = now.getFullYear();
  const sectionId: string = "footer";

  const logoSrc = () => {
    if (language === "pt") {
      return blackLogo_pt;
    } else {
      return blackLogo_en;
    }
  };

  useEffect(() => {
    const cleanup = trackSectionVisibility(sectionId);

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <footer id={sectionId} className="bg-secondaryBlue/60">
      <section className="container py-20 grid grid-cols-2 md:flex-row items-start justify-between gap-x-12 gap-y-8 text-secondary-foreground">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 flex-1">
          <div>
            <h3 className="font-bold text-lg">{t("about")}</h3>
            <div>
              <a rel="noreferrer noopener" href="/home#features">
                {t("features")}
              </a>
            </div>
            <div>
              <a href="/home#faq" rel="noreferrer noopener">
                {t("faq")}
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg">{t("legal")}</h3>
            <div>
              <a rel="noreferrer noopener" href="/terms-and-conditions">
                {t("termsAndConditions")}
              </a>
            </div>
            <div>
              <a rel="noreferrer noopener" href="/privacy-policy">
                {t("privacyPolicy")}
              </a>
            </div>
            <h3>
              &copy;{" "}
              <a
                rel="noreferrer noopener"
                href="/"
                className="transition-all underline border-primary hover:border-b-2"
              >
                QuantStockDNA
              </a>{" "}
              {currentYear}
            </h3>
          </div>
        </div>

        <div className="flex items-center justify-end md:w-auto">
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
        </div>
      </section>
      <CookieConsent />
    </footer>
  );
};
