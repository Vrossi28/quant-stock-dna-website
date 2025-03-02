import { useTranslation } from "react-i18next";
import BasePage from "./base-page";
import Verify from "@/components/verify/verify";

const VerifyPage = () => {
  const { t } = useTranslation();
  return (
    <BasePage title={t("verify")}>
      <Verify />
    </BasePage>
  );
};

export default VerifyPage;
