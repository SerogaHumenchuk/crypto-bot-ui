import { createSlice } from "@reduxjs/toolkit";
import { createRoutine } from "redux-saga-routines";

export const coinPricesActions = {
  getCoinPrices: createRoutine("get-coin-prices"),
  getAvailableExchangers: createRoutine("get-available-exchangers"),
};

const initialState = {
  exchangers: {},
  prices: {},
};
export const coinPricesReducer = createSlice({
  name: "coinsPrices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        coinPricesActions.getAvailableExchangers.SUCCESS,
        (state, { payload }) => ({
          ...state,
          exchangers: payload,
        }),
      )
      .addCase(
        coinPricesActions.getCoinPrices.SUCCESS,
        (state, { payload }) => ({
          ...state,
          prices: payload,
        }),
      );
  },
});
