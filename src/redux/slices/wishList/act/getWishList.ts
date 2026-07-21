import { apiClient } from "@/services/Api";
import type { RootState } from "@/redux/store/store";
import type { ProductTypes } from "@/types/productsTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

export const actGetWishList = createAsyncThunk<
  ProductTypes[], // 1. نوع البيانات المرتجعة (تفاصيل المنتجات)
  void, // 2. المدخلات (لا توجد)
  { state: RootState; rejectValue: string } // 3. إعدادات ThunkAPI لقراءة الـ State وتحديد الخطأ
>("wishlist/actGetWishList", async (_, thunkApi) => {
  const { rejectWithValue, getState } = thunkApi;

  // 💡 الخطوة 1 & 2: قراءة مصفوفة الـ IDs القادمة من الـ wishListSlice
  const { wishListItemsIds } = getState().wishList;

  // حماية: إذا كانت المفضلة فارغة، نوقف الطلب فوراً ونرجع مصفوفة فارغة
  if (!wishListItemsIds.length) {
    return [];
  }

  try {
    // 💡 الخطوة 3: بناء نص الاستعلام وتحويل الـ IDs إلى: id=1&id=2
    const targetParams = wishListItemsIds.map((id) => `id=${id}`).join("&");

    // طلب تفاصيل المنتجات المحددة فقط من السيرفر
    const response = await apiClient.get<ProductTypes[]>(
      `/products?${targetParams}`,
    );

    // 💡 الخطوة 4: إرجاع البيانات ليتم خزنها في wishListFullInfo بالـ Redux
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
    return rejectWithValue("Unexpected error while fetching wishlist items");
  }
});

export default actGetWishList;
