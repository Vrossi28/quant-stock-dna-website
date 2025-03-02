import { type ClassValue, clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { enUS, ptBR } from "date-fns/locale";
import { useEffect } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatToReadableDate(date: Date): string {
  const { i18n } = useTranslation();

  let formattedDate: string;
  if (i18n.language === "pt") {
    formattedDate = format(date, "d 'de' MMMM 'de' yyyy", { locale: ptBR });
  } else {
    formattedDate = format(date, "MMMM d, yyyy", { locale: enUS });
  }

  return formattedDate;
}

export function useTitle(title: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    return () => {
      document.title = prevTitle;
    };
  });
}
