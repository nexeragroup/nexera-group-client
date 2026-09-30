import type { AppEnvironment } from './environment.model';

export const environment: AppEnvironment = {
  name: 'prod',

  production: true,

  siteUrl: 'https://nexeragroup.rw',

  indexable: true,

  apiBaseUrl: 'https://api.nexeragroup.rw/api/v1',
} as const satisfies AppEnvironment;
