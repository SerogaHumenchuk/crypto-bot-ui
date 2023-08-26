import { createSlice } from "@reduxjs/toolkit";

export const coinsPricesActions = {};

export interface InitialState {
  prices: {};
}
const initialState: InitialState = {
  prices: {},
};

export const coinsPricesReducer = createSlice({
  name: "documents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
