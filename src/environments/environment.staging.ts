import type { AppEnvironment } from './environment.model';

export const environment: AppEnvironment = {
  name: 'staging',

  production: false,

  siteUrl: 'https://staging.nexeragroup.rw',

  indexable: false,

  apiBaseUrl: 'https://staging-api.nexeragroup.rw/api/v1',
} as const satisfies AppEnvironment;
