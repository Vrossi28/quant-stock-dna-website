import { useTranslation } from "react-i18next";
import BasePage from "./base-page";
import UpdatedAt from "@/components/updated-at";
import ListContent from "@/components/ui/list-content";

const TermsAndConditionsPage = () => {
  const { t } = useTranslation();
  const updateDate = new Date(2025, 3, 2);

  const terms: TextProps[] = [
    {
      title: "termsAndConditions.personalInfo.title",
      subtitle: "termsAndConditions.personalInfo.subtitle",
      description: [],
    },
    {
      title: "termsAndConditions.dataUsage.title",
      subtitle: "termsAndConditions.dataUsage.subtitle",
      description: [],
    },
    {
      title: "termsAndConditions.changes.title",
      subtitle: "termsAndConditions.changes.subtitle",
      description: [],
    },
  ];

  return (
    <>
      <BasePage title={t("termsAndConditions")}>
        <div className="container py-24 sm:py-32">
          <UpdatedAt date={updateDate}></UpdatedAt>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              {t("termsAndConditions")}
            </span>
          </h2>
          <p className="pt-2 text-md md:text-lg mx-auto lg:mx-0 text-justify">
            {t("termsAndConditions.subtitle.1")}{" "}
            {t("termsAndConditions.subtitle.2")}
          </p>
          <ListContent items={terms} />
        </div>
      </BasePage>
    </>
  );
};

export default TermsAndConditionsPage;
