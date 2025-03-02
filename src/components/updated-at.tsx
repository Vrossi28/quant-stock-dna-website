import { formatToReadableDate } from "@/lib/utils";
import React from "react";
import { useTranslation } from "react-i18next";

interface UpdatedAtProps {
  date: Date;
}

const UpdatedAt: React.FC<UpdatedAtProps> = ({ date }) => {
  const { t } = useTranslation();
  const formattedDate = formatToReadableDate(date);

  return (
    <p className="text-sm pb-4 text-muted-foreground mx-auto lg:mx-0">
      {t("updatedAt")} <strong>{formattedDate}</strong>
    </p>
  );
};

export default UpdatedAt;
