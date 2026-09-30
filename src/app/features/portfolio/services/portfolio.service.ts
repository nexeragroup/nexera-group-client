import { Injectable, inject } from '@angular/core';
import { EMPTY, expand, map, reduce } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import {
  PortfolioApiProject,
  PortfolioPageResponse,
  PortfolioProject,
} from '../interfaces/portfolio.interface';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private readonly api = inject(ApiService);

  loadProjects() {
    const loadPage = (page: number) =>
      this.api.get<PortfolioPageResponse>('projects', { params: { page, limit: 100 } });

    return loadPage(1).pipe(
      expand((response) =>
        response.meta.page < response.meta.totalPages ? loadPage(response.meta.page + 1) : EMPTY,
      ),
      reduce((projects: PortfolioApiProject[], response) => [...projects, ...response.data], []),
      map((projects) =>
        projects.map((project, index): PortfolioProject => ({
          ...project,
          number: String(index + 1).padStart(2, '0'),
          technologies: project.technologies
            .filter((technology) => technology.active)
            .map((technology) => technology.name),
        })),
      ),
    );
  }
}
