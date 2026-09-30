import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, PLATFORM_ID } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

interface FooterLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  private readonly themeService = inject(ThemeService);
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly currentYear = new Date().getFullYear();
  readonly logoSource = computed(() =>
    this.themeService.dark() ? '/images/white-logo.png' : '/images/black-logo.png',
  );
  readonly routes = [
    { label: 'Home', route: '/', exact: true },
    { label: 'About', route: '/about' },
    { label: 'Services', route: '/services' },
    { label: 'Portfolio', route: '/portfolio' },
    { label: 'Contact', route: '/contact' },
  ];
  readonly contacts: readonly FooterLink[] = [
    { label: 'info@nexeragroup.rw', href: 'mailto:info@nexeragroup.rw' },
    { label: '+250 788 717 923', href: 'tel:+250788717923' },
  ];

  scrollToTop(): void {
    if (!this.browser) {
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
