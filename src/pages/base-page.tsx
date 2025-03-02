import { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { useTitle } from "@/lib/utils";

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

  return (
    <>
      <Navbar isHome={isHome} />
      {children}
      <Footer />
    </>
  );
};

export default BasePage;
