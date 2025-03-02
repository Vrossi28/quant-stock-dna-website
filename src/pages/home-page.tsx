import { FAQ } from "@/components/faq";
import { ScrollToTop } from "@/components/scroll-to-top";
import BasePage from "./base-page";
import Hero from "@/components/hero/hero";
import Features from "@/components/features/features";
import HowItWorks from "@/components/how-it-works/how-it-works";
import EarlyAccess from "@/components/early-access/early-access";
import Contact from "@/components/contact/contact";

const HomePage = () => {
  return (
    <>
      <BasePage isHome={true} title="QuantStockDNA">
        <Hero />
        <Features />
        <HowItWorks />
        <EarlyAccess />
        <Contact />
        <FAQ />
      </BasePage>
      <ScrollToTop />
    </>
  );
};

export default HomePage;
