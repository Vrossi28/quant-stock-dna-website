import { useTranslation } from "react-i18next";
import IconCard, { IconCardProps } from "../ui/icon-card";

const HowItWorks = () => {
  const { t } = useTranslation();
  const featuresList: IconCardProps[] = [
    {
      title: "data.driven",
      description: "data.driven.description",
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground dark:text-secondary-foreground">
          1
        </div>
      ),
      iconBackground: false,
    },
    {
      title: "ai.recommendations",
      description: "ai.recommendations.description",
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground dark:text-secondary-foreground">
          2
        </div>
      ),
      iconBackground: false,
    },
    {
      title: "visual.strategy",
      description: "visual.strategy.description",
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground dark:text-secondary-foreground">
          3
        </div>
      ),
      iconBackground: false,
    },
    {
      title: "backtest.optimize",
      description: "backtest.optimize.description",
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground dark:text-secondary-foreground">
          4
        </div>
      ),
      iconBackground: false,
    },
    {
      title: "deploy.track",
      description: "deploy.track.description",
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground dark:text-secondary-foreground">
          5
        </div>
      ),
      iconBackground: false,
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground dark:text-secondary-foreground">
              {t("how.it.works")}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              {t("simple.process")}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("steps")}
            </p>
          </div>
        </div>
        <div className="mx-auto grid items-start gap-6 py-12 md:grid-cols-2 lg:grid-cols-5">
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

export default HowItWorks;
