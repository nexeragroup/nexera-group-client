export type TableStatus =
  | 'available'
  | 'reserved'
  | 'occupied'
  | 'ordering'
  | 'sent'
  | 'preparing'
  | 'ready'
  | 'served'
  | 'bill-requested'
  | 'cleaning';
export interface RestaurantTable {
  readonly id: string;
  readonly sectionId: string;
  readonly name: string;
  readonly status: TableStatus;
  readonly capacity: number;
  readonly activeOrderId: string | null;
  readonly waiterId: string | null;
}
