import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

interface HeaderRoute {
  label: string;
  route: string;
  exact?: boolean;
}

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly themeService = inject(ThemeService);

  readonly dark = this.themeService.dark;
  readonly menuOpen = signal(false);
  readonly routes: readonly HeaderRoute[] = [
    { label: 'Home', route: '/', exact: true },
    { label: 'About', route: '/about' },
    { label: 'Services', route: '/services' },
    { label: 'Portfolio', route: '/portfolio' },
    { label: 'Contact', route: '/contact' },
  ];

  toggleTheme(): void {
    this.themeService.toggleMode();
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
