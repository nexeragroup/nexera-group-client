export interface AppEnvironment {
  readonly name: 'dev' | 'staging' | 'prod';

  readonly production: boolean;

  /** Public site origin used for canonical URLs and structured data. */
  readonly siteUrl: string;

  /** Only the production site should be visible to search engines. */
  readonly indexable: boolean;

  /**
   * REST API base URL.
   *
   * Recommended:
   * /api/v1
   *
   * This keeps Angular and NestJS same-origin.
   */
  readonly apiBaseUrl: string;

  /**
   * Optional Socket.IO server origin.
   *
   * Leave undefined when Socket.IO is served
   * from the same origin as Angular.
   *
   * Example:
   * https://realtime.example.com
   */
  readonly websocketBaseUrl?: string;
}
