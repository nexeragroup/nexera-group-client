export interface Shift {
  readonly id: string;
  readonly waiterId: string;
  readonly branchId: string;
  readonly sectionId: string;
  readonly startedAt: string;
  readonly endedAt: string | null;
  readonly state: 'active' | 'break' | 'ended';
  readonly ownedTableIds: readonly string[];
}
