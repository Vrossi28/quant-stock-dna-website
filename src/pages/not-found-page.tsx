import { BlackLogoIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import BasePage from "./base-page";

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <BasePage title={t("notFound.title")}>
        <div className="min-h-screen mt-24">
          <div className="px-4 py-8 align-middle lg:px-6 lg:py-48">
            <div className="mx-auto max-w-screen-md text-center">
              <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-primary lg:text-9xl">
                404
              </h1>
              <p className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                {t("notFound.title")}
              </p>
              <p className="mb-4 text-lg font-light ">
                {t("notFound.subtitle")}{" "}
              </p>
              <Button onClick={() => (window.location.href = "/")}>
                <a href="/">{t("toHomePage")}</a>
              </Button>
              <div className="my-6 flex w-full items-center justify-center border-gray-700 px-6 pb-6">
                <div className="text-xl font-semibold text-white">
                  <a href="/" className="flex items-center justify-center">
                    <BlackLogoIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BasePage>
    </>
  );
};

export default NotFoundPage;
