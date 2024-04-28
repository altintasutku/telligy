import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";

export const uploadBookStateValidator = z.object({
  infos: z.object({
    id: z.number().optional(),
    title: z.string().max(256, "Title must be less than 256 characters."),
    description: z
      .string()
      .max(1024, "Description must be less than 1024 characters."),
    price: z.number(),
    banner: z.string(),
    discount: z.number().min(0).max(100),
    pdf: z.string(),
    cover: z.string(),
    currency: z.string().max(3, "Currency must be less than 3 characters."),
    pageCount: z.number(),
  }),
  categories: z
    .array(z.object({ name: z.string() }))
    .max(5, "You can add up to 5 categories."),
});

export type UploadBookState = z.infer<typeof uploadBookStateValidator>;
export type InfosState = UploadBookState["infos"];

const initialState: UploadBookState = {
  infos: {
    title: "",
    description: "",
    price: 0,
    banner: "",
    discount: 0,
    pdf: "",
    cover: "",
    currency: "TRY",
    pageCount: 0,
  },
  categories: [],
};

export const uploadBookSlice = createSlice({
  name: "uploadBook",
  initialState,
  reducers: {
    setProperty: (
      state,
      action: PayloadAction<{
        key: keyof InfosState;
        value: InfosState[keyof InfosState];
      }>
    ) => {
      state.infos = { ...state.infos, [action.payload.key]: action.payload.value };
    },
    addTag: (state, action: PayloadAction<string>) => {
      state.categories.push({ name: action.payload });
    },
    removeTag: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter((category) => category.name !== action.payload);
    },
    reset: () => initialState,
  },
});

export const { removeTag, setProperty, addTag, reset } =
  uploadBookSlice.actions;

export const isValid = (state: UploadBookState) => {
  try {
    uploadBookStateValidator.parse(state);
    return true;
  } catch {
    return false;
  }
};

export default uploadBookSlice.reducer;
