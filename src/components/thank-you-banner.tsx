import { useTranslation } from "react-i18next";
import { trackSectionVisibility } from "@/lib/services/analytics-service";
import { useEffect } from "react";
import { TbSquareRoundedCheckFilled } from "react-icons/tb";
import { PRIMARY_COLOR } from "@/constants/common";

const ThankYouBanner = () => {
  const { t } = useTranslation();
  const sectionId: string = "thank-you-banner";
  useEffect(() => {
    const cleanup = trackSectionVisibility(sectionId);

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div
      id={sectionId}
      className="w-full flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10"
    >
      <TbSquareRoundedCheckFilled size={250} color={PRIMARY_COLOR} />
      <h3 className="text-center text-3xl font-bold">
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {t("thankYou.title")}
        </span>
      </h3>
      <p className="text-muted-foreground text-lg my-4 text-center">
        {t("thankYou.subtitle")}
      </p>
    </div>
  );
};

export default ThankYouBanner;
