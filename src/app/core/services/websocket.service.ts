import { isPlatformBrowser } from '@angular/common';
import { Injectable, inject, PLATFORM_ID, DestroyRef, signal, computed } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, EMPTY } from 'rxjs';
import { WEBSOCKET_CONFIG } from '../../config/websocket.config';
import {
  ServerToClientEvents,
  ClientToServerEvents,
  WebsocketConnectionStatus,
  WebsocketEventName,
  WebsocketEventPayload,
} from '../models/realtime.models';
import { WebsocketConnectionError } from '../models/websocket-connection-status.model';
import { AuthStore } from '../stores/auth.store';
import { WEBSOCKET_URL } from '../tokens/websocket-url.token';

type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

type GenericSocketListener = (...args: unknown[]) => void;

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly auth = inject(AuthStore);
  private readonly websocketUrl = inject(WEBSOCKET_URL);
  private readonly config = inject(WEBSOCKET_CONFIG);
  private readonly browser = isPlatformBrowser(this.platformId);

  // ===========================================================================
  // Socket
  // ===========================================================================

  private socket: AppSocket | null = null;
  /**
   * Rooms the application expects to be joined to.
   *
   * Socket.IO rooms are server-side state and may
   * need to be restored after reconnection.
   */
  private readonly desiredBranches = new Set<string>();

  // ===========================================================================
  // Internal state
  // ===========================================================================

  private readonly statusState = signal<WebsocketConnectionStatus>('disconnected');
  private readonly socketIdState = signal<string | null>(null);
  private readonly reconnectAttemptsState = signal(0);
  private readonly lastConnectedAtState = signal<Date | null>(null);
  private readonly lastDisconnectedAtState = signal<Date | null>(null);
  private readonly lastErrorState = signal<WebsocketConnectionError | null>(null);

  // ===========================================================================
  // Public state
  // ===========================================================================

  readonly status = this.statusState.asReadonly();
  readonly socketId = this.socketIdState.asReadonly();
  readonly reconnectAttempts = this.reconnectAttemptsState.asReadonly();
  readonly lastConnectedAt = this.lastConnectedAtState.asReadonly();
  readonly lastDisconnectedAt = this.lastDisconnectedAtState.asReadonly();
  readonly lastError = this.lastErrorState.asReadonly();
  readonly connected = computed(() => this.statusState() === 'connected');
  readonly reconnecting = computed(() => this.statusState() === 'reconnecting');
  constructor() {
    this.destroyRef.onDestroy(() => {
      this.destroySocket();
    });
  }

  // ===========================================================================
  // Connection
  // ===========================================================================
  /**
   * Establishes the realtime connection.
   *
   * Authentication is read directly from AuthStore,
   * so callers no longer need to pass access tokens.
   */
  connect(): void {
    if (!this.browser) {
      return;
    }
    const socket = this.ensureSocket();
    if (socket.connected) {
      return;
    }

    /**
     * Prevent duplicate connect attempts.
     */
    if (this.statusState() === 'connecting' || this.statusState() === 'reconnecting') {
      return;
    }

    this.statusState.set('connecting');
    this.lastErrorState.set(null);
    socket.connect();
  }

  /**
   * Re-authenticates the WebSocket using the current
   * access token in AuthStore.
   *
   * Call this after an HTTP access-token refresh.
   */
  reconnectWithLatestAuth(): void {
    if (!this.browser) {
      return;
    }
    const socket = this.ensureSocket();
    this.lastErrorState.set(null);
    this.statusState.set('connecting');
    if (socket.connected) {
      /**
       * Socket.IO authentication occurs during the
       * namespace handshake, so force a new handshake.
       */
      socket.disconnect();
    }

    socket.connect();
  }

  // ===========================================================================
  // Branch rooms
  // ===========================================================================

  joinBranch(branchId: string): void {
    const normalized = branchId.trim();
    if (!normalized) {
      throw new Error('[WebsocketService] branchId cannot be empty.');
    }
    this.desiredBranches.add(normalized);
    if (this.socket?.connected) {
      this.emitBranchJoin(normalized);
    }
  }

  leaveBranch(branchId: string): void {
    const normalized = branchId.trim();
    if (!normalized) {
      return;
    }
    this.desiredBranches.delete(normalized);
    if (this.socket?.connected) {
      this.socket.emit('branch.leave', {
        branchId: normalized,
      });
    }
  }

  /**
   * Clears all desired branch memberships.
   *
   * Useful when switching users or branches.
   */
  leaveAllBranches(): void {
    const socket = this.socket;
    if (socket?.connected) {
      for (const branchId of this.desiredBranches) {
        socket.emit('branch.leave', {
          branchId,
        });
      }
    }
    this.desiredBranches.clear();
  }

  // ===========================================================================
  // Events
  // ===========================================================================
  /**
   * Subscribe to a strongly typed server event.
   *
   * Unlike the previous implementation, calling on()
   * before connect() is valid.
   *
   * The Socket instance is created with autoConnect=false,
   * so subscribing does not start a network connection.
   */
  on<TEvent extends WebsocketEventName>(event: TEvent): Observable<WebsocketEventPayload<TEvent>> {
    if (!this.browser) {
      return EMPTY;
    }
    const socket = this.ensureSocket();
    return new Observable<WebsocketEventPayload<TEvent>>((subscriber) => {
      const listener: GenericSocketListener = (...args) => {
        subscriber.next(args[0] as WebsocketEventPayload<TEvent>);
      };
      socket.on(event as keyof ServerToClientEvents, listener as never);
      return () => {
        socket.off(event as keyof ServerToClientEvents, listener as never);
      };
    });
  }

  // ===========================================================================
  // Disconnect
  // ===========================================================================
  /**
   * Disconnect the current authenticated realtime session.
   *
   * This is appropriate for:
   * - logout
   * - user change
   * - application shutdown
   */
  disconnect(): void {
    this.desiredBranches.clear();
    const socket = this.socket;
    if (!socket) {
      this.resetConnectionState();

      return;
    }
    socket.disconnect();
    this.resetConnectionState();
  }

  // ===========================================================================
  // Socket creation
  // ===========================================================================
  private ensureSocket(): AppSocket {
    if (this.socket) {
      return this.socket;
    }

    if (!this.browser) {
      throw new Error('[WebsocketService] Socket.IO is unavailable during SSR.');
    }

    const socket: AppSocket = io(this.websocketUrl, {
      /**
       * Register all listeners before connecting.
       */
      autoConnect: false,

      /**
       * Do not force websocket-only transport.
       *
       * Socket.IO can fall back when WebSocket is
       * unavailable behind a proxy/network.
       */
      withCredentials: true,

      /**
       * Always read the current access token.
       *
       * This prevents reconnect attempts from using
       * a stale token captured during initial login.
       */
      auth: (callback) => {
        const token = this.auth.accessToken();
        callback(token ? { token } : {});
      },
      reconnection: true,
      reconnectionAttempts: this.config.reconnectionAttempts,
      reconnectionDelay: this.config.reconnectionDelayMs,
      reconnectionDelayMax: this.config.reconnectionDelayMaxMs,
      randomizationFactor: this.config.randomizationFactor,
      timeout: this.config.connectionTimeoutMs,
    });
    this.socket = socket;
    this.registerLifecycleListeners(socket);
    return socket;
  }

  // ===========================================================================
  // Lifecycle
  // ===========================================================================
  private registerLifecycleListeners(socket: AppSocket): void {
    // -------------------------------------------------------------------------
    // Connected
    // -------------------------------------------------------------------------
    socket.on('connect', () => {
      this.statusState.set('connected');
      this.socketIdState.set(socket.id ?? null);
      this.reconnectAttemptsState.set(0);
      this.lastConnectedAtState.set(new Date());
      this.lastErrorState.set(null);
      /**
       * A new Socket.IO session may not have the
       * room membership from the previous session.
       *
       * Restore application-required rooms.
       */
      this.restoreBranchMemberships();
    });

    // -------------------------------------------------------------------------
    // Disconnected
    // -------------------------------------------------------------------------
    socket.on('disconnect', () => {
      this.socketIdState.set(null);
      this.lastDisconnectedAtState.set(new Date());
      /**
       * socket.active tells us whether Socket.IO
       * will automatically try to reconnect.
       */
      this.statusState.set(socket.active ? 'reconnecting' : 'disconnected');
    });

    // -------------------------------------------------------------------------
    // Connection error
    // -------------------------------------------------------------------------
    socket.on('connect_error', (error) => {
      this.socketIdState.set(null);
      this.setConnectionError(error);
      /**
       * Authentication middleware rejection may stop
       * automatic reconnection, while transport errors
       * may continue reconnecting.
       */
      this.statusState.set(socket.active ? 'reconnecting' : 'error');
    });

    // -------------------------------------------------------------------------
    // Reconnection
    // -------------------------------------------------------------------------
    socket.io.on('reconnect_attempt', (attempt) => {
      this.reconnectAttemptsState.set(attempt);
      this.statusState.set('reconnecting');
    });

    socket.io.on('reconnect', () => {
      /**
       * The Socket "connect" event will perform
       * the final state update and room restoration.
       */
      this.lastErrorState.set(null);
    });

    socket.io.on('reconnect_error', (error) => {
      this.setConnectionError(error);
      this.statusState.set('reconnecting');
    });

    socket.io.on('reconnect_failed', () => {
      this.statusState.set('error');
      this.lastErrorState.set({
        message: 'Realtime connection could not be restored.',
        timestamp: new Date(),
      });
    });
  }

  // ===========================================================================
  // Room restoration
  // ===========================================================================
  private restoreBranchMemberships(): void {
    for (const branchId of this.desiredBranches) {
      this.emitBranchJoin(branchId);
    }
  }

  private emitBranchJoin(branchId: string): void {
    if (!this.socket?.connected) {
      return;
    }

    this.socket.emit('branch.join', {
      branchId,
    });
  }

  // ===========================================================================
  // Error handling
  // ===========================================================================
  private setConnectionError(error: unknown): void {
    const message = error instanceof Error ? error.message : 'Realtime connection failed.';
    this.lastErrorState.set({
      message,
      timestamp: new Date(),
    });
  }

  // ===========================================================================
  // Cleanup
  // ===========================================================================
  private destroySocket(): void {
    const socket = this.socket;
    if (!socket) {
      return;
    }
    socket.removeAllListeners();
    socket.io.removeAllListeners();
    socket.disconnect();
    this.socket = null;
    this.desiredBranches.clear();
    this.resetConnectionState();
  }

  private resetConnectionState(): void {
    this.statusState.set('disconnected');
    this.socketIdState.set(null);
    this.reconnectAttemptsState.set(0);
    this.lastErrorState.set(null);
  }
}
