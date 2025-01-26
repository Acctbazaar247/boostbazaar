 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState { 
}

// Define the initial state using that type
const initialState: IInitialState = {
 
};

export const smsPoolSlice = createSlice({
  name: "smsPool",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setSmsPool: (state, action: PayloadAction<any>) => { 

    },
   
  },
});

export const { setSmsPool } = smsPoolSlice.actions;

export default smsPoolSlice.reducer;
