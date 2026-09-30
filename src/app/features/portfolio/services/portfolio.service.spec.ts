import '@angular/compiler';
import { createEnvironmentInjector, runInInjectionContext } from '@angular/core';
import { lastValueFrom, of } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';
import { ApiService } from '../../../core/services/api.service';
import { PortfolioPageResponse } from '../interfaces/portfolio.interface';
import { PortfolioService } from './portfolio.service';

const project = {
  id: 'project-1',
  slug: 'project-one',
  code: 'P1',
  name: 'Project One',
  category: 'Platforms',
  headline: 'A project headline',
  description: 'A project description',
  link: null,
  linkLabel: null,
  imageUrl: null,
  featured: false,
};

describe('PortfolioService', () => {
  it('loads each page and exposes active technology names for the cards', async () => {
    const get = vi.fn((_: string, options: { params: { page: number } }) =>
      of<PortfolioPageResponse>(
        options.params.page === 1
          ? {
              data: [
                {
                  ...project,
                  technologies: [
                    { id: 'technology-1', name: 'Angular', active: true },
                    { id: 'technology-2', name: 'Retired stack', active: false },
                  ],
                },
              ],
              meta: { page: 1, limit: 100, total: 2, totalPages: 2 },
            }
          : {
              data: [{ ...project, id: 'project-2', technologies: [] }],
              meta: { page: 2, limit: 100, total: 2, totalPages: 2 },
            },
      ),
    );

    const injector = createEnvironmentInjector([{ provide: ApiService, useValue: { get } }], null);
    const service = runInInjectionContext(injector, () => new PortfolioService());
    const projects = await lastValueFrom(service.loadProjects());

    injector.destroy();

    expect(get).toHaveBeenCalledTimes(2);
    expect(projects).toMatchObject([
      { id: 'project-1', number: '01', technologies: ['Angular'] },
      { id: 'project-2', number: '02', technologies: [] },
    ]);
  });
});
