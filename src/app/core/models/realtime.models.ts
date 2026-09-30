export type WebsocketConnectionStatus =
  'disconnected' | 'connecting' | 'connected' | 'reconnecting' | 'error';

export interface TableUpdatedEvent {
  tableId: string;
  status: string;
}

export interface TableTransferredEvent {
  tableId: string;
  waiterId: string;
}

export interface OrderUpdatedEvent {
  orderId: string;
  status: string;
}

export interface OrderItemUpdatedEvent {
  orderId: string;
  itemId: string;
  status: string;
}

export interface ProductAvailabilityChangedEvent {
  productId: string;
  available: boolean;
}

export interface BillUpdatedEvent {
  billId: string;
  orderId: string;
  status: string;
}

export interface ApprovalUpdatedEvent {
  approvalId: string;
  status: string;
}

export interface NotificationCreatedEvent {
  id: string;
  title: string;
  message: string;
  createdAt: string;
}

/**
 * Events received by Angular from the NestJS server.
 *
 * Socket.IO requires callback functions here—not payload types.
 */
export interface ServerToClientEvents {
  'table.updated': (payload: TableUpdatedEvent) => void;

  'table.transferred': (payload: TableTransferredEvent) => void;

  'order.updated': (payload: OrderUpdatedEvent) => void;

  'order.item.updated': (payload: OrderItemUpdatedEvent) => void;

  'product.availability.changed': (payload: ProductAvailabilityChangedEvent) => void;

  'bill.updated': (payload: BillUpdatedEvent) => void;

  'approval.updated': (payload: ApprovalUpdatedEvent) => void;

  'notification.created': (payload: NotificationCreatedEvent) => void;
}

/**
 * Events sent from Angular to the NestJS server.
 */
export interface ClientToServerEvents {
  'branch.join': (payload: { branchId: string }) => void;

  'branch.leave': (payload: { branchId: string }) => void;
}

export type WebsocketEventName = keyof ServerToClientEvents;

export type WebsocketEventPayload<TEvent extends WebsocketEventName> = Parameters<
  ServerToClientEvents[TEvent]
>[0];
