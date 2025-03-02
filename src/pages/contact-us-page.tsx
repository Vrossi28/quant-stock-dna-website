import Contact from "@/components/contact/contact";
import BasePage from "./base-page";
import { useTranslation } from "react-i18next";

const ContactUsPage = () => {
  const { t } = useTranslation();
  return (
    <BasePage title={t("contact.us")}>
      <Contact />
    </BasePage>
  );
};

export default ContactUsPage;
