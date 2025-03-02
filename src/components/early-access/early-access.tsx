import { Button } from "../ui/button";
import { Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";
import StrategyVisualization from "./strategy-visualization";

const EarlyAccess = () => {
  const { t } = useTranslation();

  return (
    <section
      id="early-access"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted"
    >
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2 md:text-start text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                {t("early.access")}
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("early.access.description")}
              </p>
            </div>
            <div className="flex md:justify-start justify-center flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="gap-1">
                <a href="#contact_us">{t("request.early.access")}</a>
                <Rocket className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <StrategyVisualization />
        </div>
      </div>
    </section>
  );
};

export default EarlyAccess;
