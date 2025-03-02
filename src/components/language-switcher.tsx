import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { registerEvent } from "@/lib/services/analytics-service";

type Language = {
  nativeName: string;
};

type LanguageSwitcherProps = {
  color?: string;
};

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = () => {
  const { i18n } = useTranslation();
  const languageSwitcherRef = useRef<HTMLDivElement>(null);

  const lngs: Record<string, Language> = {
    en: { nativeName: "English" },
    pt: { nativeName: "Português" },
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    registerEvent("change_language_to_" + lng);
  };

  return (
    <div ref={languageSwitcherRef} className="md:pl-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="ghost">
            <FaGlobe
              size={20}
              className="absolute h-[1.1rem] w-[1.2rem] rotate-0 scale-100 transition-all"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {Object.keys(lngs).map((lng) => (
            <DropdownMenuItem
              key={lng}
              id={lng}
              className={`${i18n.resolvedLanguage === lng ? "font-bold" : ""}`}
              onClick={() => changeLanguage(lng)}
            >
              {lngs[lng].nativeName}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSwitcher;
