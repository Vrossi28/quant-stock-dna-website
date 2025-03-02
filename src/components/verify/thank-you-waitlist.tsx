import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TbSquareRoundedCheckFilled } from "react-icons/tb";
import { PRIMARY_COLOR } from "@/constants/common";
import { useTranslation } from "react-i18next";

export default function ThankYouWaitlist() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center">
      <Card className="max-w-md m-4 p-6 text-center items-center justify-center flex flex-col shadow-lg bg-white dark:bg-gray-800 rounded-2xl">
        <TbSquareRoundedCheckFilled size={100} color={PRIMARY_COLOR} />
        <h2 className="text-2xl font-bold">{t("thank.you.waitlist")}</h2>
        <p className="text-secondary-foreground/50 text-base my-2">
          {t("thank.you.waitlist.description")}
        </p>
        <Button onClick={() => (window.location.href = "/")}>
          <a href="/">{t("toHomePage")}</a>
        </Button>
      </Card>
    </div>
  );
}
