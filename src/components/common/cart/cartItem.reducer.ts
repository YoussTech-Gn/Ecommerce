// components/common/cart/cartItem.reducer.ts
import type { ActionType } from "@/types/cartItem.types";

export const createReducer =
  (maxium: number) => (state: number, action: ActionType) => {
    switch (action.type) {
      case "INCRE":
        return state < maxium ? state + action.payload : state;
      case "DECRE":
        return state > 1 ? state - action.payload : 1;
      default:
        return state;
    }
  };
