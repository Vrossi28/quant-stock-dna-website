import { ReactNode, useEffect } from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { useTitle } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import i18n from "@/localization/i18n";

interface BasePageProps {
  children: ReactNode;
  isHome?: boolean;
  title: string;
}

const BasePage: React.FC<BasePageProps> = ({
  children,
  title,
  isHome = false,
}) => {
  useTitle(title);

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const lang = searchParams.get("lang");

    if (lang) {
      if (["en", "pt"].includes(lang)) {
        i18n.changeLanguage(lang);
      } else {
        i18n.changeLanguage("en");
      }
    }
  }, [location.search]);

  return (
    <>
      <Navbar isHome={isHome} />
      {children}
      <Footer />
    </>
  );
};

export default BasePage;
