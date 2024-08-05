import { createSlice } from '@reduxjs/toolkit';

type intialStateType = {
  clevertap: any;
};

const initialState: intialStateType = {
  clevertap: {},
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setCleverTap: (state, action) => {
      return { ...state, clevertap: action.payload };
    },
  },
});

export const { setCleverTap } = globalSlice.actions;

export default globalSlice.reducer;
