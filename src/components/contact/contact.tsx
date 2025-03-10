import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import ThankYouBanner from "../thank-you-banner";
import { registerSubscriber } from "@/lib/services/contact-service";
import { AxiosError } from "axios";
import {
  registerEvent,
  trackSectionVisibility,
} from "@/lib/services/analytics-service";
import { Input } from "../ui/input";
import i18n from "@/localization/i18n";

const Contact = () => {
  const sectionId: string = "contact_us";
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showThankYou, setShowThankYou] = useState(isSubmitted);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    email: "",
    name: "",
    phone: "",
    message: "",
    locale: i18n.language,
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerEvent("contact_us_submit_click");

    if (validate()) {
      setIsLoading(true);
      submitContactForm();
    }
  };

  const validate = (): boolean => {
    const newErrors: ContactFormErrors = {};
    if (!formData.email) {
      newErrors.email = "validation.emailRequired";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "validation.invalidEmail";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitContactForm = async () => {
    try {
      await registerSubscriber(formData);
      setIsSubmitted(true);
      registerEvent("contact_form_submit");
    } catch (err) {
      var error = err as AxiosError;
      var data = error.response?.data as { message: string };
      setError(true);
      setErrorMessage(data?.message ?? t("error.tryAgainLater"));
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (error) setError(false);
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (isSubmitted) {
      setTimeout(() => setShowThankYou(true), 300);
    } else {
      setShowThankYou(false);
    }
  }, [isSubmitted]);

  useEffect(() => {
    const cleanup = trackSectionVisibility(sectionId);

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <section id={sectionId} className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div
          className={`transition-opacity duration-500 ease-in-out ${
            showThankYou ? "opacity-100" : "opacity-0"
          } ${isSubmitted ? "" : "hidden"}`}
        >
          <ThankYouBanner />
        </div>
        <div
          className={`transition-opacity duration-500 ease-in-out ${
            isSubmitted ? "opacity-0 hidden" : "opacity-100"
          }`}
        >
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              {t("transform.trading")}
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("know.more")}
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <Input
                type="text"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("typeYourEmail.placeholder")}
                className={`w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                  errors.email ? "border-red-600" : ""
                }`}
                aria-label="email"
              />
              {errors.email && (
                <div className="text-red-600 text-sm">{t(errors.email)}</div>
              )}
              <Button
                type="submit"
                size="lg"
                useArrow
                isLoading={isLoading}
                disabled={isLoading}
              >
                {t("guarantee.earlyAccess")}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground">{t("never.share")}</p>
            {error ? (
              <div className="mt-2 flex h-auto w-auto items-center justify-center rounded-md bg-red-600 px-3 py-1 text-xs text-white">
                {errorMessage}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
