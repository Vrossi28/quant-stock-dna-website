import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import {
  registerEvent,
  trackSectionVisibility,
} from "@/lib/services/analytics-service";
import TradingPlatformConcept from "./trading-platform-concept";
import { useEffect } from "react";

const Hero = () => {
  const sectionId: string = "home";
  const { t } = useTranslation();

  useEffect(() => {
    const cleanup = trackSectionVisibility(sectionId);

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  function handleButtonClick() {
    window.location.href = "#contact_us";
    registerEvent("hero_contact_us_click");
  }

  return (
    <section id={sectionId} className="w-full py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-start text-center font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                {t("hero.title")}
              </h1>
              <p className="max-w-[600px] md:text-start text-center  text-muted-foreground md:text-xl">
                {t("hero.description")}
              </p>
            </div>
            <div className="flex flex-col md:justify-start justify-center gap-2 min-[400px]:flex-row">
              <Button onClick={handleButtonClick} useArrow>
                <a href="#contact_us">{t("signUp.earlyAccess")}</a>
              </Button>
            </div>
          </div>
          <TradingPlatformConcept />
        </div>
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};

export default Hero;
