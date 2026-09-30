export interface Waiter {
  readonly id: string;
  readonly displayName: string;
  readonly restaurantId: string;
  readonly branchId: string;
  readonly sectionIds: readonly string[];
  readonly permissions: readonly string[];
}
