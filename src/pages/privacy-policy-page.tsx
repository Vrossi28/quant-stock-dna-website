import { useTranslation } from "react-i18next";
import BasePage from "./base-page";
import UpdatedAt from "@/components/updated-at";
import ListContent from "@/components/ui/list-content";

const PrivacyPolicyPage = () => {
  const { t } = useTranslation();
  const updateDate = new Date(2025, 3, 2);

  const terms: TextProps[] = [
    {
      title: "privacyPolicy.informationCollected.whichInfo.title",
      subtitle: "privacyPolicy.informationCollected.whichInfo.subtitle",
      description: [
        {
          content: "privacyPolicy.informationCollected.whichInfo.1",
          asBulletedList: true,
        },
        {
          content: "privacyPolicy.informationCollected.whichInfo.2",
          asBulletedList: true,
        },
        {
          content: "privacyPolicy.informationCollected.whichInfo.3",
          asBulletedList: true,
        },
      ],
    },
    {
      title: "privacyPolicy.informationCollected.whatWeDo.title",
      subtitle: "privacyPolicy.informationCollected.whatWeDo.subtitle",
      description: [
        {
          content: "privacyPolicy.informationCollected.whatWeDo.1",
          asBulletedList: true,
        },
        {
          content: "privacyPolicy.informationCollected.whatWeDo.2",
          asBulletedList: true,
        },
        {
          content: "privacyPolicy.informationCollected.whatWeDo.3",
          asBulletedList: true,
        },
        {
          content: "privacyPolicy.informationCollected.whatWeDo.4",
          asBulletedList: true,
        },
      ],
    },
  ];
  return (
    <BasePage title={t("privacyPolicy")}>
      <div className="container py-24 sm:py-32">
        <UpdatedAt date={updateDate} />
        <h2 className="text-3xl md:text-4xl font-bold">
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            {t("privacyPolicy")}
          </span>
        </h2>
        <p className="pt-2 text-md md:text-lg mx-auto lg:mx-0 text-justify">
          {t("privacyPolicy.subtitle.1")}
        </p>
        <br></br>
        <p className="text-md md:text-lg mx-auto lg:mx-0 text-justify">
          {t("privacyPolicy.subtitle.2")}
        </p>
        <ListContent items={terms} />
      </div>
    </BasePage>
  );
};

export default PrivacyPolicyPage;
