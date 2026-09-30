export interface PortfolioTechnology {
  id: string;
  name: string;
  active: boolean;
}

export interface PortfolioApiProject {
  id: string;
  slug: string;
  code: string;
  name: string;
  category: string;
  headline: string;
  description: string;
  technologies: PortfolioTechnology[];
  link: string | null;
  linkLabel: string | null;
  imageUrl: string | null;
  featured: boolean;
}

export interface PortfolioProject extends Omit<PortfolioApiProject, 'technologies'> {
  number: string;
  technologies: string[];
}

export interface PortfolioPageResponse {
  data: PortfolioApiProject[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PortfolioStat {
  value: string;
  label: string;
}

export interface DeliveryPrinciple {
  number: string;
  title: string;
  description: string;
}
