import { ThemeColor, ThemeMode } from '../core/models/theme.model';
import { StorageArea } from './storage.config';

export interface CoreModuleConfig {
  /**
   * REST API base URL.
   */
  apiBaseUrl: string;

  /**
   * Optional Socket.IO server origin.
   *
   * Undefined means current browser origin.
   */
  websocketBaseUrl?: string;

  storage: {
    namespace: string;
    version?: number;
    defaultArea?: StorageArea;
  };
  theme?: {
    defaultColor?: ThemeColor;
    defaultMode?: ThemeMode;
  };

  apiRequestTimeoutMs?: number;
  auth?: {
    refreshPath?: string;
    loginRoute?: string;
  };

  connection?: {
    healthPath?: string;
    pollIntervalMs?: number;
    timeoutMs?: number;
    degradedLatencyMs?: number;
  };

  websocket?: {
    connectionTimeoutMs?: number;
    reconnectionAttempts?: number;
    reconnectionDelayMs?: number;
    reconnectionDelayMaxMs?: number;
    randomizationFactor?: number;
  };
}
