import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackSectionVisibility } from "@/lib/services/analytics-service";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const FAQList: FAQProps[] = [
  {
    question: "faq.1.question",
    answer: "faq.1.answer.content",
    value: "item-1",
  },
  {
    question: "faq.2.question",
    answer: "faq.2.answer.content",
    value: "item-2",
  },
  {
    question: "faq.3.question",
    answer: "faq.3.answer.content",
    value: "item-3",
  },
  {
    question: "faq.4.question",
    answer: "faq.4.answer.content",
    value: "item-4",
  },
  {
    question: "faq.5.question",
    answer: "faq.5.answer.content",
    value: "item-5",
  },
  {
    question: "faq.6.question",
    answer: "faq.6.answer.content",
    value: "item-6",
  },
  {
    question: "faq.7.question",
    answer: "faq.7.answer.content",
    value: "item-7",
  },
  {
    question: "faq.8.question",
    answer: "faq.8.answer.content",
    value: "item-8",
  },
  {
    question: "faq.9.question",
    answer: "faq.9.answer.content",
    value: "item-9",
  },
  {
    question: "faq.10.question",
    answer: "faq.10.answer.content",
    value: "item-10",
  },
];

export const FAQ = () => {
  const sectionId: string = "faq";
  const { t } = useTranslation();
  useEffect(() => {
    const cleanup = trackSectionVisibility(sectionId);

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <section id={sectionId} className="py-24 sm:py-32 bg-muted">
      <div className="container grid">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 flex justify-center">
          {t("faq")}
        </h2>

        <Accordion
          type="single"
          collapsible
          className="w-full AccordionRoot space-y-2"
        >
          {FAQList.map(({ question, answer, value }: FAQProps) => (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger className="text-left">
                {t(question)}
              </AccordionTrigger>

              <AccordionContent className="text-justify">
                <span dangerouslySetInnerHTML={{ __html: t(answer) }}></span>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <h3 className="font-extralight pt-8 text-sm">
          {t("stillQuestions")}{" "}
          <a rel="noreferrer noopener" href="#contact_us" className="underline">
            {t("contact.us")}
          </a>
        </h3>
      </div>
    </section>
  );
};
