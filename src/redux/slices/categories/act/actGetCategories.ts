import { apiClient } from "@/services/Api";
import type { CategoriesType } from "@/types/categoriesTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

type ResponseDataType = {
  data: CategoriesType[];
};

// تمرير الأنواع الثلاثة بوضوح للتايب سكريبت
const actGetCategories = createAsyncThunk<
  CategoriesType[], // 1. نوع بيانات النجاح
  void, // 2. نوع المدخلات (لا يوجد)
  { rejectValue: string } // 3. نوع بيانات الخطأ
>("categories/actGetCategories", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  //
  try {
    const res = await apiClient.get<ResponseDataType["data"]>("categories");
    return res.data;
  } catch (error) {
    if (isAxiosError(error))
      return rejectWithValue(error.response?.data?.message || error.message);
    return rejectWithValue("unexpected error in fetching categories");
  }
});

export default actGetCategories;
