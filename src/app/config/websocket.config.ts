import { InjectionToken } from '@angular/core';

export interface WebsocketConfig {
  connectionTimeoutMs: number;
  reconnectionAttempts: number;
  reconnectionDelayMs: number;
  reconnectionDelayMaxMs: number;
  randomizationFactor: number;
}

export const WEBSOCKET_CONFIG = new InjectionToken<WebsocketConfig>('WEBSOCKET_CONFIG', {
  factory: () => ({
    connectionTimeoutMs: 10_000,
    // Infinity is acceptable for a long-running POS.
    reconnectionAttempts: Infinity,
    reconnectionDelayMs: 1_000,
    reconnectionDelayMaxMs: 10_000,
    randomizationFactor: 0.5,
  }),
});
