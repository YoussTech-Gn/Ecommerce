import type { InitialProductsType, ProductTypes } from "./productsTypes";

export interface InitialCartStateType extends Omit<
  InitialProductsType,
  "products"
> {
  // items : {[id : number] : number} ===> index signature
  items: Record<number, number>; // Record<Keys, Type>
  productsFullInfo: ProductTypes[];
}
