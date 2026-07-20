import type { ProductTypes } from "./productsTypes";

export interface InitialCartStateType {
  // items : {[id : number] : number} ===> index signature
  items: Record<number, number>; // Record<Keys, Type>
  productsFullInfo: ProductTypes[];
}
