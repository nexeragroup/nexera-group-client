export interface Bill {
  readonly id: string;
  readonly orderId: string;
  readonly subtotalRwf: number;
  readonly discountRwf: number;
  readonly taxRwf: number;
  readonly serviceChargeRwf: number;
  readonly totalRwf: number;
  readonly paymentState: 'unpaid' | 'partial' | 'paid';
}
