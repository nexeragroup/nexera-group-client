export interface WebsocketConnectionError {
  message: string;
  description?: string;
  context?: string;
  timestamp: Date;
}
