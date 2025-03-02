import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader } from "./card";

export interface IconCardProps {
  title: string;
  description?: string;
  icon: JSX.Element;
  iconBackground?: boolean;
}

const IconCard: React.FC<IconCardProps> = ({
  title,
  description,
  icon,
  iconBackground,
}) => {
  const { t } = useTranslation();

  return (
    <Card
      key={title}
      className="md:items-start items-center min-h-[275px] h-full flex flex-col justify-start"
    >
      <CardHeader
        className={`flex items-center justify-center ${
          iconBackground ? "bg-background text-primary" : ""
        }`}
      >
        {icon}
      </CardHeader>
      <CardContent className="flex flex-col md:items-start items-center text-center md:text-start">
        <h1 className="text-xl font-semibold">{t(title)}</h1>
        {description ? (
          <h3 className="text-sm text-muted-foreground">{t(description)}</h3>
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
};

export default IconCard;
