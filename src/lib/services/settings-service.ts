export const getSettings = (): AppSettings => {
  return {
    apiUrl: import.meta.env.VITE_API_URL,
    newsletterUp: import.meta.env.VITE_NEWSLETTER_UP,
  };
};
