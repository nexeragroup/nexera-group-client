import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  EngagementModel,
  ServiceCategory,
  ServiceProcessStep,
  ServicesHero,
} from '../../interfaces/services.interface';

@Component({
  selector: 'app-services-page',
  standalone: false,
  templateUrl: './services-page.html',
  styleUrl: './services-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesPage {
  readonly hero: ServicesHero = {
    title: 'End-to-end software engineering services',
    subtitle:
      'We design, build, scale, modernize, and maintain reliable software systems for startups, growing businesses, and enterprises.',
    ctaPrimary: 'Talk to an Engineer',
    ctaPrimaryLink: '/contact',
    ctaSecondary: 'View Our Work',
    ctaSecondaryLink: '/portfolio',
  };

  readonly highlights = [
    { value: '01', label: 'Product Strategy' },
    { value: '02', label: 'Clean Engineering' },
    { value: '03', label: 'Secure Architecture' },
    { value: '04', label: 'Long-Term Support' },
  ] as const;

  readonly services: readonly ServiceCategory[] = [
    {
      id: 'custom-software',
      label: 'Core Engineering',
      title: 'Custom Software Development',
      description:
        'Tailored software solutions designed around your business workflows, users, operations, and long-term growth.',
      icon: 'fa-solid fa-code',
      cards: [
        { title: 'Web Applications', description: 'High-performance business platforms, dashboards, portals, and customer-facing applications.' },
        { title: 'Mobile Applications', description: 'iOS and Android applications built with modern, scalable mobile technologies.' },
        { title: 'APIs & Integrations', description: 'Secure REST APIs, third-party integrations, payment gateways, internal systems, and external platforms.' },
        { title: 'Internal Tools', description: 'Admin panels, workflow automation tools, reporting dashboards, and operational software.' },
      ],
    },
    {
      id: 'saas',
      label: 'Product Platforms',
      title: 'SaaS Development',
      description:
        'Cloud-ready SaaS platforms built for scalability, subscriptions, access control, analytics, and recurring revenue.',
      icon: 'fa-solid fa-layer-group',
      cards: [
        { title: 'Multi-Tenant Architecture', description: 'Secure tenant isolation, scalable data models, and flexible organization-level access.' },
        { title: 'Authentication & Roles', description: 'JWT, OAuth, RBAC, permissions, team accounts, admin users, and protected workflows.' },
        { title: 'Subscription & Billing', description: 'Payment integrations, usage-based billing, invoices, plans, trials, and customer lifecycle flows.' },
        { title: 'Admin Dashboards', description: 'Operational dashboards for managing users, subscriptions, analytics, support, and platform settings.' },
      ],
    },
    {
      id: 'mobile',
      label: 'Mobile Products',
      title: 'Mobile App Development',
      description:
        'Modern mobile applications for businesses that need reliable, fast, and user-friendly digital experiences.',
      icon: 'fa-solid fa-mobile-screen',
      cards: [
        { title: 'React Native & Expo', description: 'Cross-platform mobile applications with faster delivery and shared code across iOS and Android.' },
        { title: 'Mobile API Integration', description: 'Secure integration with backend APIs, payments, authentication, notifications, and third-party services.' },
        { title: 'Offline-Ready Apps', description: 'Local storage, caching, synchronization, and resilient mobile experiences for unstable networks.' },
        { title: 'App Release Support', description: 'Build configuration, testing, app store preparation, deployment, and update workflows.' },
      ],
    },
    {
      id: 'ai',
      label: 'Intelligent Systems',
      title: 'AI & Automation Solutions',
      description:
        'AI-powered tools that improve productivity, automate repetitive work, and help teams make better decisions.',
      icon: 'fa-solid fa-brain',
      cards: [
        { title: 'AI Assistants', description: 'Custom chat assistants for support, internal operations, knowledge bases, and business workflows.' },
        { title: 'Workflow Automation', description: 'Automation for approvals, document processing, notifications, reports, and repetitive business tasks.' },
        { title: 'Data & Insights', description: 'Dashboards, analytics, intelligent search, forecasting, and decision-support systems.' },
        { title: 'AI Integration', description: 'Integration with OpenAI, document search, vector databases, APIs, and internal company data.' },
      ],
    },
    {
      id: 'maintenance',
      label: 'Reliability',
      title: 'Software Maintenance & Support',
      description:
        'We keep your systems reliable, secure, monitored, optimized, and continuously improving after launch.',
      icon: 'fa-solid fa-shield-halved',
      cards: [
        { title: 'Bug Fixes', description: 'Fast troubleshooting, issue resolution, regression fixes, and production support.' },
        { title: 'Performance Optimization', description: 'Improve speed, database queries, caching, page load time, scalability, and backend response time.' },
        { title: 'Security Patching', description: 'Dependency updates, vulnerability fixes, access review, encryption, and secure coding improvements.' },
        { title: 'Monitoring & Alerts', description: 'Logging, uptime checks, error tracking, dashboards, alerts, and operational visibility.' },
      ],
    },
    {
      id: 'modernization',
      label: 'Transformation',
      title: 'System Modernization',
      description:
        'Transform legacy systems into modern, maintainable, scalable, and secure platforms without disrupting operations.',
      icon: 'fa-solid fa-rotate',
      cards: [
        { title: 'Code Refactoring', description: 'Improve structure, remove technical debt, simplify maintenance, and increase long-term reliability.' },
        { title: 'Cloud Migration', description: 'Move applications, databases, and services to modern cloud or server environments safely.' },
        { title: 'Microservices & APIs', description: 'Decouple large systems, expose APIs, and create modular services that are easier to scale.' },
        { title: 'Database Improvement', description: 'Schema redesign, indexing, migrations, backups, query optimization, and data reliability improvements.' },
      ],
    },
    {
      id: 'devops',
      label: 'Infrastructure',
      title: 'DevOps & Cloud Engineering',
      description:
        'Automated infrastructure, deployment pipelines, monitoring, and production systems that improve delivery speed.',
      icon: 'fa-solid fa-cloud',
      cards: [
        { title: 'CI/CD Pipelines', description: 'Automated testing, builds, deployment workflows, rollback strategy, and release consistency.' },
        { title: 'Containerization', description: 'Dockerized applications, environment consistency, deployment automation, and scalable runtime setup.' },
        { title: 'Server & Cloud Setup', description: 'Linux servers, Nginx, SSL, domains, databases, backups, monitoring, and production hardening.' },
        { title: 'Disaster Recovery', description: 'Backup strategy, restore testing, high availability planning, and failure recovery processes.' },
      ],
    },
  ];

  readonly process: readonly ServiceProcessStep[] = [
    { step: '01', title: 'Discovery', description: 'We understand your business goals, users, current systems, risks, and technical requirements.' },
    { step: '02', title: 'Architecture', description: 'We design the system structure, database, APIs, security model, integrations, and delivery roadmap.' },
    { step: '03', title: 'Development', description: 'We build using clean code, reviews, testing, reusable components, and production-ready practices.' },
    { step: '04', title: 'Deployment', description: 'We deploy safely using DevOps workflows, monitoring, backups, documentation, and rollback planning.' },
    { step: '05', title: 'Support', description: 'We continue improving the product through maintenance, monitoring, fixes, and feature iterations.' },
  ];

  readonly engagementModels: readonly EngagementModel[] = [
    { title: 'Build from scratch', description: 'Best for startups and businesses creating a new product or platform.', points: ['Product planning', 'UI/UX', 'Architecture', 'Development'] },
    { title: 'Improve existing systems', description: 'Best for companies with software that needs better performance, security, or structure.', points: ['Audit', 'Refactoring', 'Optimization', 'Modernization'] },
    { title: 'Long-term engineering partner', description: 'Best for businesses that need continuous development, DevOps, and support.', points: ['Maintenance', 'Monitoring', 'New features', 'Technical leadership'] },
  ];
}
