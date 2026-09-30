export interface ContactInquiry {
  names: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  projectDetails: string;
}

export interface ContactInquiryResponse {
  message: string;
  reference: string;
}

export interface CsrfBootstrapResponse {
  message: string;
  token: string;
}

export interface ContactMethod {
  title: string;
  value: string;
  description: string;
  href: string;
  icon: string;
}

export interface ContactOption {
  label: string;
  value: string;
}

export interface ContactStep {
  number: string;
  title: string;
  description: string;
}
