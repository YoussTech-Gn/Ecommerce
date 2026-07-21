import type { InitialWishListStateType } from "@/types/wishListTypes";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actLikeToogle } from "./act/actLikeToogle"; // الثانك الخاص بالمدرس في الصورة الثانية

const initialState: InitialWishListStateType = {
  wishListFullInfo: [],
  wishListItemsIds: [],
};

const wishListSlice = createSlice({
  name: "wishList", // ✨ تم تصحيح الاسم
  initialState,
  reducers: {
    // نتركها فارغة إذا كنا نعتمد كلياً على السيرفر
  },
  extraReducers: (builder) => {
    builder.addCase(
      actLikeToogle.fulfilled,
      (
        state,
        action: PayloadAction<{ type: "add" | "remove"; id: number }>,
      ) => {
        const { id, type } = action.payload; // القيمة المرتجعة من ثانك المدرس

        if (type === "remove") {
          // ✂️ منطق الحذف الخاص بك باستخدام splice
          state.wishListItemsIds = state.wishListItemsIds.filter(
            (itemIds) => itemIds !== id,
          );
        } else if (type === "add") {
          // ➕ منطق الإضافة الخاص بك باستخدام push
          state.wishListItemsIds.push(id);
        }
      },
    );
  },
});

export default wishListSlice.reducer;
