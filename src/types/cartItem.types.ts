export type CartItemRowProps = {
  title: string;
  price: number;
  image: string;
  maxium: number;
  quantity: number;
  id: number;
};

export type ActionType = {
  type: "INCRE" | "DECRE";
  payload: number;
};
