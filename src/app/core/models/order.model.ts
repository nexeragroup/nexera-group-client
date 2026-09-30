export type OrderStatus =
  'draft' | 'sent' | 'accepted' | 'preparing' | 'ready' | 'served' | 'completed' | 'cancelled';
export interface OrderItem {
  readonly id: string;
  readonly productId: string;
  readonly stationId: string;
  readonly quantity: number;
  readonly unitPriceRwf: number;
  readonly optionIds: readonly string[];
  readonly notes: string;
  readonly status: OrderStatus;
}
export interface Order {
  readonly id: string;
  readonly number: string;
  readonly tableId: string | null;
  readonly waiterId: string;
  readonly guestCount: number;
  readonly type: 'dine-in' | 'takeaway' | 'delivery';
  readonly status: OrderStatus;
  readonly items: readonly OrderItem[];
}
