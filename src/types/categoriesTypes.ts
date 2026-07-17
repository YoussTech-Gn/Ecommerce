export interface CategoriesType {
  id: number;
  title: string;
  prefix: string;
  img: string;
}

export type InitialCategoriesType = {
  loading: "idle" | "pending" | "succeeded" | "failed";
  categories: CategoriesType[];
  error: null | string;
};
