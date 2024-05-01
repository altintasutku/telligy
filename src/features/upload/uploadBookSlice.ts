import { bookValidator } from "@/lib/validators/book";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";

export type UploadBookState = {
  value: z.infer<typeof bookValidator>;
};

const initialState: UploadBookState = {
  value: {
    title: "",
    description: "",
    price: 0,
    banner: "",
    discount: 0,
    pdf: "",
    cover: "",
    currency: "TRY",
    pageCount: 0,
    categories: [],
  },
};

export const uploadBookSlice = createSlice({
  name: "uploadBook",
  initialState,
  reducers: {
    setProperty: (
      state,
      action: PayloadAction<{
        key: keyof UploadBookState["value"];
        value: UploadBookState["value"][keyof UploadBookState["value"]];
      }>
    ) => {
      state.value = {
        ...state.value,
        [action.payload.key]: action.payload.value,
      };
    },
    addTag: (state, action: PayloadAction<string>) => {
      state.value.categories.push({ name: action.payload });
    },
    removeTag: (state, action: PayloadAction<string>) => {
      state.value.categories = state.value.categories.filter(
        (category) => category.name !== action.payload
      );
    },
    reset: () => initialState,
  },
});

export const { removeTag, setProperty, addTag, reset } =
  uploadBookSlice.actions;

export default uploadBookSlice.reducer;
