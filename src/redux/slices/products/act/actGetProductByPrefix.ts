import { apiClient } from "@/services/Api";
import type { ProductTypes } from "@/types/productsTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

type ResponseDataType = {
  data: ProductTypes[];
};

// تمرير الأنواع الثلاثة بوضوح للتايب سكريبت
const actGetProductByCatPrefix = createAsyncThunk<
  ProductTypes[], // 1. نوع بيانات النجاح
  void, // 2. نوع المدخلات (لا يوجد)
  { rejectValue: string } // 3. نوع بيانات الخطأ
>("products/actGetProductByCatPrefix", async (prefix, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  //
  try {
    const res = await apiClient.get<ResponseDataType["data"]>(
      `products?cat_prefix="${prefix}`,
    );
    return res.data;
  } catch (error) {
    if (isAxiosError(error))
      return rejectWithValue(error.response?.data?.message || error.message);
    return rejectWithValue(
      "unexpected error in fetching Products By (Cat_Prefix)",
    );
  }
});

export default actGetProductByCatPrefix;
