import type { CategoriesType } from "./categoriesTypes";

/**
 * 2. Product interface extending CategoriesType
 * using 'Omit' to strictly exclude the 'prefix' property.
 */
export interface ProductTypes extends Omit<CategoriesType, "prefix"> {
  price: string;
  cat_prefix: string; // Your custom product prefix reference
}

export interface InitialProductsType {
  loading: "idle" | "pending" | "succeeded" | "failed";
  products: ProductTypes[];
  error: null | string;
}
