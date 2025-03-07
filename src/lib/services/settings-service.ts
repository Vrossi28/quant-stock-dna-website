export const getSettings = (): AppSettings => {
  return {
    apiUrl: import.meta.env.VITE_API_URL,
    newsletterUsername: import.meta.env.VITE_NEWSLETTER_U,
    newsletterPwd: import.meta.env.VITE_NEWSLETTER_P,
  };
};
