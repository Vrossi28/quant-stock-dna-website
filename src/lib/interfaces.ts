interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string | undefined;
}

interface ContactFormErrors {
  email?: string;
  company?: string;
  name?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  message: string | undefined;
  phone: string | undefined;
  locale: string;
}

interface Preferences {
  subscriberId: string;
  activeSubscription: boolean;
  locale: string;
}

interface AppSettings {
  apiUrl: string;
  newsletterUp: string;
}

interface TokenData {
  token: string;
  expiration: Date;
  tenantId: string;
}

interface TeamProps {
  imageUrl: string;
  name: string;
  position: string;
  introduction: string[];
  socialNetworks: SociaNetworkslProps[];
}

interface SociaNetworkslProps {
  name: string;
  url: string;
}

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

interface DescriptionOptions {
  content: string;
  asBulletedList: boolean;
}

interface TextProps {
  title: string;
  subtitle: string;
  description: DescriptionOptions[];
}
