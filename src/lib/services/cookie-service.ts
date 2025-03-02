import { COOKIE_CONSENT } from "@/constants/common";
import Cookies from "js-cookie";

export const getCookieConsentAgreed = (): boolean => {
  const cookieConsent = Cookies.get(COOKIE_CONSENT);
  if (!cookieConsent) {
    return false;
  }
  return true;
};

export const setCookieConsentAgreed = (): void => {
  let options = { expires: 365, path: "/" };
  Cookies.set(COOKIE_CONSENT, "1", options);
};
