export interface MenuCategory {
  readonly id: string;
  readonly name: string;
}
export interface PreparationStation {
  readonly id: string;
  readonly name: string;
}
export interface ProductOption {
  readonly id: string;
  readonly name: string;
  readonly priceRwf: number;
}
export interface ProductOptionGroup {
  readonly id: string;
  readonly name: string;
  readonly minSelections: number;
  readonly maxSelections: number;
  readonly options: readonly ProductOption[];
}
export interface Product {
  readonly id: string;
  readonly categoryId: string;
  readonly stationId: string;
  readonly name: string;
  readonly priceRwf: number;
  readonly available: boolean;
  readonly optionGroups: readonly ProductOptionGroup[];
}
