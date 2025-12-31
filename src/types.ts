export interface NavLink {
  label: string;
  href: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PricingTier {
  name: string;
  fee: string;
  features: string[];
  recommended?: boolean;
  cta: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface TimelineItem {
  quarter: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}
