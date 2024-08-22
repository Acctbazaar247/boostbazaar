import { CategorizedService, IService } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type TIState = {
  services: IService[];
  categorizedService: CategorizedService[];
  category: string;
};

const initialState: TIState = {
  services: [],
  categorizedService: [],
  category: "",
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setService: (state, action) => {
      state.services = action.payload;
    },
    setCategorizedService: (state, action) => {
      state.categorizedService = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { setService, setCategorizedService, setCategory } =
  serviceSlice.actions;

export default serviceSlice.reducer;
