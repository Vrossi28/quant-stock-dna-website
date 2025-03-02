import { getAnalytics, logEvent } from "firebase/analytics";

export const registerEvent = (eventName: string) => {
  const analytics = getAnalytics();
  logEvent(analytics, eventName);
};

export const formatReadEvent = (sectionId: string) => {
  return sectionId + "_section_read";
};

export const trackSectionVisibility = (
  sectionId: string,
  minVisibleTime: number = 2000
) => {
  const section = document.getElementById(sectionId);
  if (!section) {
    console.warn(`Section with ID ${sectionId} not found`);
    return;
  }

  let timer: NodeJS.Timeout | null = null;
  let hasBeenVisible = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!hasBeenVisible) {
            timer = setTimeout(() => {
              registerEvent(formatReadEvent(sectionId));
              hasBeenVisible = true;
            }, minVisibleTime);
          }
        } else {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
          hasBeenVisible = false;
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(section);

  return () => {
    observer.unobserve(section);
    if (timer) {
      clearTimeout(timer);
    }
  };
};
