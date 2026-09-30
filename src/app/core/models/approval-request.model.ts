export interface ApprovalRequest {
  readonly id: string;
  readonly orderId: string;
  readonly reason: string;
  readonly action: 'cancellation' | 'transfer' | 'discount' | 'change' | 'end-shift';
  readonly status: 'pending' | 'approved' | 'rejected';
}
