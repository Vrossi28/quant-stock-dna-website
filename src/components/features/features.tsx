import {
  BarChart3,
  BrainCircuit,
  MousePointerClick,
  Share2,
} from "lucide-react";
import IconCard, { IconCardProps } from "../ui/icon-card";
import { useTranslation } from "react-i18next";

const Features = () => {
  const { t } = useTranslation();
  const featuresList: IconCardProps[] = [
    {
      title: "ai.strategies",
      description: "ai.strategies.description",
      icon: <BrainCircuit className="h-12 w-12 text-primary mb-2" />,
      iconBackground: false,
    },
    {
      title: "drag.drop",
      description: "drag.drop.description",
      icon: <MousePointerClick className="h-12 w-12 text-primary mb-2" />,
      iconBackground: false,
    },
    {
      title: "advanced.backtesting",
      description: "advanced.backtesting.description",
      icon: <BarChart3 className="h-12 w-12 text-primary mb-2" />,
      iconBackground: false,
    },
    {
      title: "strategy.marketplace",
      description: "strategy.marketplace.description",
      icon: <Share2 className="h-12 w-12 text-primary mb-2 " />,
      iconBackground: false,
    },
  ];

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground dark:text-secondary-foreground">
              {t("features")}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              {t("powerful.tools")}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("powerful.tools.description")}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 py-8 gap-6 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 h-full">
          {featuresList.map(
            ({ icon, title, description, iconBackground }: IconCardProps) => (
              <IconCard
                key={title}
                title={title}
                icon={icon}
                description={description}
                iconBackground={iconBackground}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Features;
