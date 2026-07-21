import { apiClient } from "@/services/Api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

const actLikeToogle = createAsyncThunk<
  { type: "add" | "remove"; id: number },
  number,
  { rejectValue: string }
>("wishList/actLikeToogle", async (id: number, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    const isRecordExist = await apiClient.get(`wishList?userId=2&itemId=${id}`);
    if (isRecordExist.data.lenght > 0) {
      await apiClient.delete(`wishList/${isRecordExist.data[0].id}`);
      return { type: "remove", id };
    } else {
      await apiClient.post(`wishList `, { userId: "1", itemId: id });
      return { type: "add", id };
    }
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
    return rejectWithValue("Unexpected error while fetching wishList  details");
  }
});

export { actLikeToogle };
