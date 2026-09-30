import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  DeliveryPrinciple,
  PortfolioProject,
  PortfolioStat,
} from '../../interfaces/portfolio.interface';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-portfolio-page',
  standalone: false,
  templateUrl: './portfolio-page.html',
  styleUrl: './portfolio-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioPage {
  private readonly portfolioService = inject(PortfolioService);
  private readonly destroyRef = inject(DestroyRef);

  readonly hero = {
    eyebrow: 'Our Portfolio',
    title: 'Digital products built for real businesses and real users.',
    subtitle:
      'Explore selected platforms, websites, business systems, public information tools, and AI-powered products designed and developed by Nexera Group.',
    primaryCta: 'Start Your Project',
    primaryLink: '/contact',
    secondaryCta: 'Explore Services',
    secondaryLink: '/services',
  } as const;

  readonly projects = signal<PortfolioProject[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly selectedCategory = signal('All');
  readonly categories = computed(() => [
    'All',
    ...new Set(this.projects().map((project) => project.category)),
  ]);
  readonly stats = computed<PortfolioStat[]>(() => [
    { value: String(this.projects().length).padStart(2, '0'), label: 'Selected projects' },
    { value: String(this.categories().length - 1).padStart(2, '0'), label: 'Business sectors' },
    { value: 'Web', label: 'Modern platforms' },
    { value: 'AI', label: 'Intelligent products' },
  ]);
  readonly filteredProjects = computed(() =>
    this.selectedCategory() === 'All'
      ? this.projects()
      : this.projects().filter((project) => project.category === this.selectedCategory()),
  );

  readonly principles: readonly DeliveryPrinciple[] = [
    {
      number: '01',
      title: 'Business-first thinking',
      description:
        'Every project starts with the users, workflows, business goals, and operational problems the software needs to solve.',
    },
    {
      number: '02',
      title: 'Clear user experience',
      description:
        'We design interfaces that make products understandable, accessible, responsive, and easier to use.',
    },
    {
      number: '03',
      title: 'Reliable engineering',
      description:
        'We use maintainable architecture, secure APIs, structured data, testing, and production-ready deployment practices.',
    },
    {
      number: '04',
      title: 'Continuous improvement',
      description:
        'Products are monitored, maintained, refined, and expanded as user needs and business requirements grow.',
    },
  ];

  constructor() {
    afterNextRender(() => this.loadProjects());
  }

  loadProjects(): void {
    this.loading.set(true);
    this.error.set(false);
    this.portfolioService
      .loadProjects()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (projects) => {
          this.projects.set(projects);
          this.selectedCategory.set('All');
          this.loading.set(false);
        },
        error: () => {
          this.error.set(true);
          this.loading.set(false);
        },
      });
  }

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }
}
