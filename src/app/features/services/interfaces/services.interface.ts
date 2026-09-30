export interface ServicesHero {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaPrimaryLink: string;
  ctaSecondary: string;
  ctaSecondaryLink: string;
}

export interface ServiceCard {
  title: string;
  description: string;
}

export interface ServiceCategory {
  id: string;
  label: string;
  title: string;
  description: string;
  icon: string;
  cards: readonly ServiceCard[];
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface EngagementModel {
  title: string;
  description: string;
  points: readonly string[];
}
