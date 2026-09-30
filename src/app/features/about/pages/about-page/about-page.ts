import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AboutCapability,
  AboutPrinciple,
  AboutStat,
  AboutTimelineItem,
  AboutValue,
} from '../../interfaces/about.interface';

@Component({
  selector: 'app-about-page',
  standalone: false,
  templateUrl: './about-page.html',
  styleUrl: './about-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
  readonly hero = {
    eyebrow: 'About Nexera Group',
    title: 'We build software with clarity, reliability, and long-term value.',
    subtitle:
      'Nexera Group is a software engineering company focused on building secure, scalable, and maintainable digital products for startups, growing businesses, and enterprises.',
    primaryCta: 'Work With Us',
    primaryLink: '/contact',
    secondaryCta: 'Explore Services',
    secondaryLink: '/services',
  } as const;

  readonly stats: readonly AboutStat[] = [
    { value: '01', label: 'Strategy before code' },
    { value: '02', label: 'Security by design' },
    { value: '03', label: 'Built for scale' },
    { value: '04', label: 'Support after launch' },
  ];

  readonly values: readonly AboutValue[] = [
    {
      title: 'Engineering Quality',
      description:
        'We care about clean architecture, maintainable code, stable infrastructure, and systems that can grow without becoming fragile.',
      icon: 'fa-solid fa-code',
    },
    {
      title: 'Business Alignment',
      description:
        'We do not build technology for technology’s sake. Every solution is shaped around business goals, users, operations, and measurable value.',
      icon: 'fa-solid fa-bullseye',
    },
    {
      title: 'Reliability',
      description:
        'We design systems with security, monitoring, backups, performance, and long-term maintainability in mind from the beginning.',
      icon: 'fa-solid fa-shield-halved',
    },
    {
      title: 'Partnership',
      description:
        'We work as a technical partner, helping clients make better engineering decisions before, during, and after product delivery.',
      icon: 'fa-solid fa-handshake',
    },
  ];

  readonly timeline: readonly AboutTimelineItem[] = [
    {
      step: '01',
      title: 'Understand',
      description:
        'We begin by understanding your goals, business model, users, workflows, risks, and current technical challenges.',
    },
    {
      step: '02',
      title: 'Plan',
      description:
        'We define the architecture, roadmap, features, integrations, data model, security requirements, and delivery priorities.',
    },
    {
      step: '03',
      title: 'Build',
      description:
        'We develop the product using modern engineering practices, reusable components, testing, code reviews, and clear delivery cycles.',
    },
    {
      step: '04',
      title: 'Deploy',
      description:
        'We prepare production environments, automate deployments, configure monitoring, secure the system, and launch safely.',
    },
    {
      step: '05',
      title: 'Improve',
      description:
        'After launch, we continue improving performance, reliability, security, features, and the overall user experience.',
    },
  ];

  readonly principles: readonly AboutPrinciple[] = [
    {
      title: 'No shortcuts in architecture',
      description:
        'We avoid quick fixes that create long-term problems. Our focus is building software that remains understandable and maintainable.',
    },
    {
      title: 'Security is part of the foundation',
      description:
        'Authentication, permissions, data protection, audit logs, backups, and safe deployments are treated as core product requirements.',
    },
    {
      title: 'Simple systems are better systems',
      description:
        'We choose practical solutions that are easy to operate, easy to extend, and easy for teams to understand.',
    },
  ];

  readonly capabilities: readonly AboutCapability[] = [
    {
      title: 'Product Engineering',
      points: ['Web applications', 'Mobile applications', 'SaaS platforms', 'Admin dashboards'],
    },
    {
      title: 'Backend & Infrastructure',
      points: ['APIs', 'Databases', 'Cloud deployment', 'DevOps automation'],
    },
    {
      title: 'Growth & Reliability',
      points: ['Maintenance', 'Monitoring', 'Security improvements', 'System modernization'],
    },
  ];
}
