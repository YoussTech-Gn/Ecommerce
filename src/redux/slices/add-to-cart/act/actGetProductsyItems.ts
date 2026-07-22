import type { RootState } from "@/redux/store/store";
import { apiClient } from "@/services/Api";
import type { ProductTypes } from "@/types/productsTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

// 💡 المبرمج الحقيقي يمرر مصفوفة الأرقام (الـ IDs) كـ Argument للـ Thunk
export const actGetProductsByItems = createAsyncThunk<
  ProductTypes[], // 1. نوع البيانات المرتجعة في حال النجاح (قائمة المنتجات الكاملة للسلة)
  void,
  { rejectValue: string } // 3. نوع رسالة الخطأ
>("cart/actGetProductsByItems", async (_, thunkAPI) => {
  const { rejectWithValue, getState } = thunkAPI;
  const { cart } = getState() as RootState;
  const cartIds = Object.keys(cart.items);
  if (!cartIds.length) return []; // حماية سريعة: لو السلة فارغة لا تتصل بالسيرفر اصلاً

  try {
    // نقوم بتحويل المصفوفة [1,2] إلى نص للاستعلام مثل: /products?id=1&id=2
    const targetParams = cartIds.map((id) => `id=${id}`).join("&");

    // نطلب فقط المنتجات المحددة
    const res = await apiClient.get<ProductTypes[]>(
      `/products?${targetParams}`,
    );
    const def = res.data.map((pro) => {
      return { ...pro, quantity: cart.items[pro.id] || 1 }; // إذا لمגد الكمية، اجعلها 1 كقيمة افتراضية
    });
    return def;
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
    return rejectWithValue(
      "Unexpected error while fetching cart items details",
    );
  }
});

export default actGetProductsByItems;
