import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronUp } from "lucide-react";

export const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
    });
  };

  return (
    <>
      {showTopBtn && (
        <Button
          onClick={goToTop}
          className="fixed bg-secondaryBlue bottom-4 right-4 opacity-90 shadow-md"
          size="icon"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      )}
    </>
  );
};
